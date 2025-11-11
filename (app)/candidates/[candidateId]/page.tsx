
'use client';

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { candidateDetails as initialCandidateDetails } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Download, Eye, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { CandidateScoreCard } from "@/components/candidates/candidate-score-card";
import { useToast } from "@/hooks/use-toast";
import type { CandidateStatus } from "@/lib/types";
import { useTranslation } from "@/hooks/use-translation";


export default function CandidateDetailsPage({ params }: any) {
    const [candidate, setCandidate] = useState(initialCandidateDetails);
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleStatusChange = (newStatus: CandidateStatus) => {
        setCandidate({ ...candidate, status: newStatus });
        toast({
            title: t('status_updated'),
            description: t('candidate_status_is_now', { status: getTranslatedStatus(newStatus) }),
        });
    };
    
    const handleViewCV = () => {
        window.open(candidate.cvUrl, '_blank');
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = candidate.cvUrl;
        link.download = `CV-${candidate.name.replace(' ', '-')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getTranslatedStatus = (status: CandidateStatus) => {
        if (status === 'Présélectionné') return t('shortlisted');
        if (status === 'En attente') return t('pending');
        if (status === 'Rejeté') return t('rejected');
        return status;
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Link href="/jobs/1" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {t('back_to_candidates')}
                </Link>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4 border-4 border-primary/50">
                                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                                <AvatarFallback className="text-3xl">{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold font-headline">{candidate.name}</h2>
                            <p className="text-muted-foreground">{candidate.jobTitle}</p>
                            <Badge variant={
                                candidate.status === 'Présélectionné' ? 'default' : 
                                candidate.status === 'Rejeté' ? 'destructive' : 'secondary'
                            }
                            className={cn(
                                'mt-2',
                                candidate.status === 'Présélectionné' && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                candidate.status === 'Rejeté' && 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                candidate.status === 'En attente' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                            )}
                            >{getTranslatedStatus(candidate.status)}</Badge>

                            <Separator className="my-6" />

                            <div className="flex flex-col gap-3 text-left w-full">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground"/>
                                    <span>{candidate.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground"/>
                                    <span>{candidate.phone}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 w-full mt-6">
                                <Button className="flex-1" variant="outline" onClick={handleViewCV}><Eye className="mr-2 h-4 w-4"/> {t('view_cv')}</Button>
                                <Button className="flex-1" variant="outline" onClick={handleDownloadCV}><Download className="mr-2 h-4 w-4"/> {t('download_cv')}</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex gap-2">
                        <Button onClick={() => handleStatusChange('Présélectionné')} className="flex-1 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow bg-emerald-500 hover:bg-emerald-600 text-white">{t('shortlist')}</Button>
                        <Button onClick={() => handleStatusChange('Rejeté')} className="flex-1 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow bg-rose-500 hover:bg-rose-600 text-white">{t('reject')}</Button>
                    </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                        <CardHeader>
                            <CardTitle className="font-headline">{t('video_interview')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video w-full rounded-lg overflow-hidden border">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    poster={candidate.videoThumbnail}
                                    src={candidate.videoUrl}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <CandidateScoreCard candidate={candidate} />
                </div>
            </div>
        </div>
    );
}
