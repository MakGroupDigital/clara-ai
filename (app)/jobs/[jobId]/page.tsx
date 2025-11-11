
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidates as allCandidates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Filter, Share2, QrCode, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import type { Job, Candidate, CandidateStatus } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import QRCode from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

type StatusFilter = CandidateStatus | 'all';

export default function JobDetailsPage({ params }: { params: { jobId: string } }) {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [jobUrl, setJobUrl] = useState('');
    const qrCodeRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const { t } = useTranslation();
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const firestore = useFirestore();

    // This is a placeholder. In a real app, companyId would come from user's profile.
    const companyId = "placeholder-company-id";

    const jobDocRef = useMemoFirebase(() => {
        if (!firestore || !companyId) return null;
        return doc(firestore, `companies/${companyId}/job_offers/${params.jobId}`);
    }, [firestore, companyId, params.jobId]);

    const { data: job, isLoading } = useDoc<Job>(jobDocRef);

    useEffect(() => {
        if (job) {
            // TODO: In a real app, candidates should be fetched from Firestore based on the job.
            // For now, we continue to filter the static data.
            const jobCandidates = allCandidates.filter(c => c.jobTitle === job.title);
            setCandidates(jobCandidates);
        }
        
        if (typeof window !== 'undefined') {
            // Construct the public URL for the job offer, not the dashboard URL
            setJobUrl(`${window.location.origin}/apply/${params.jobId}`);
        }
    }, [job, params.jobId]);

    const filteredCandidates = useMemo(() => {
        if (statusFilter === 'all') {
            return candidates;
        }
        return candidates.filter(candidate => candidate.status === statusFilter);
    }, [statusFilter, candidates]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: job?.title,
                    text: t('share_job_text', { title: job?.title }),
                    url: jobUrl,
                });
            } catch (error) {
                console.error("Erreur lors du partage", error);
                toast({
                    variant: "destructive",
                    title: t('error_toast_title'),
                    description: t('share_failed_toast_desc'),
                });
            }
        } else {
            navigator.clipboard.writeText(jobUrl);
            toast({
                title: t('link_copied_toast_title'),
                description: t('link_copied_toast_desc'),
            });
        }
    };

    const handleDownloadQRCode = () => {
        const qrCodeSvg = qrCodeRef.current?.querySelector('svg');
        if (qrCodeSvg) {
            const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
            const canvas = document.createElement("canvas");
            const svgSize = qrCodeSvg.getBoundingClientRect();
            canvas.width = svgSize.width;
            canvas.height = svgSize.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    const link = document.createElement("a");
                    link.download = `qrcode-${job?.title.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                };
                img.src = "data:image/svg+xml;base64," + btoa(svgData);
            }
        }
    };

    const getTranslatedStatus = (status: CandidateStatus) => {
        if (status === 'Présélectionné') return t('shortlisted');
        if (status === 'En attente') return t('pending');
        if (status === 'Rejeté') return t('rejected');
        return status;
    }
    
    const statusOptions: {value: StatusFilter, label: string}[] = [
        { value: 'all', label: 'Tous' },
        { value: 'Présélectionné', label: t('shortlisted') },
        { value: 'En attente', label: t('pending') },
        { value: 'Rejeté', label: t('rejected') },
    ]

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!job) {
        return <div>{t('offer_not_found')}</div>
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <Link href="/jobs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        {t('back_to_offers')}
                    </Link>
                    <h1 className="text-3xl font-bold font-headline tracking-tight mt-2">{job.title}</h1>
                    <p className="text-muted-foreground">{job.department}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleShare} className="flex-1">
                        <Share2 className="mr-2 h-4 w-4"/>
                        {t('share')}
                    </Button>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                                <QrCode className="mr-2 h-4 w-4"/>
                                {t('qr_code')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{t('share_job_offer')}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center p-4 gap-4" ref={qrCodeRef}>
                                <QRCode value={jobUrl} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                                <p className="text-sm text-muted-foreground text-center">{t('scan_qr_code_prompt')}</p>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleDownloadQRCode} className="w-full">
                                    <Download className="mr-2 h-4 w-4"/>
                                    {t('download_qr_code')}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            
            <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>{t('candidates')}</CardTitle>
                        <CardDescription>
                            {candidates.length > 0 
                                ? t('candidate_list_description', { count: candidates.length })
                                : t('no_candidates_yet')
                            }
                        </CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto"><Filter className="mr-2 h-4 w-4"/> {t('filter')}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{t('status')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                                {statusOptions.map(option => (
                                    <DropdownMenuRadioItem key={option.value} value={option.value}>{option.label}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('candidate')}</TableHead>
                                <TableHead className="hidden sm:table-cell">{t('status')}</TableHead>
                                <TableHead className="text-right">{t('match_score')}</TableHead>
                                <TableHead className="text-right hidden sm:table-cell">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCandidates.length > 0 ? (
                                filteredCandidates.map(candidate => (
                                    <TableRow key={candidate.id} className="cursor-pointer" onClick={() => window.location.href = `/candidates/${candidate.id}`}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={candidate.avatarUrl} />
                                                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col sm:hidden">
                                                    <span className="font-medium">{candidate.name}</span>
                                                    <Badge variant={
                                                        candidate.status === 'Présélectionné' ? 'default' : 
                                                        candidate.status === 'Rejeté' ? 'destructive' : 'secondary'
                                                    }
                                                    className={cn(
                                                        'text-xs w-fit mt-1',
                                                        candidate.status === 'Présélectionné' && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                                        candidate.status === 'Rejeté' && 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                                        candidate.status === 'En attente' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                                    )}
                                                    >{getTranslatedStatus(candidate.status)}</Badge>
                                                </div>
                                                <span className="font-medium hidden sm:inline">{candidate.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <Badge variant={
                                                candidate.status === 'Présélectionné' ? 'default' : 
                                                candidate.status === 'Rejeté' ? 'destructive' : 'secondary'
                                            }
                                            className={cn(
                                                candidate.status === 'Présélectionné' && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                                candidate.status === 'Rejeté' && 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                                candidate.status === 'En attente' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                            )}
                                            >{getTranslatedStatus(candidate.status)}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right text-primary font-bold">{candidate.matchScore}%</TableCell>
                                        <TableCell className="text-right hidden sm:table-cell">
                                            <Link href={`/candidates/${candidate.id}`} onClick={(e) => e.stopPropagation()}>
                                                <Button variant="ghost" size="sm">{t('view_profile')}</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        {t('be_the_first_to_share')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

    