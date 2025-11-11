
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidates } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/use-translation";
import type { CandidateStatus } from "@/lib/types";
import { useState, useMemo } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

type StatusFilter = CandidateStatus | 'all';

export default function CandidatesPage() {
    const { t } = useTranslation();
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    const getTranslatedStatus = (status: CandidateStatus) => {
        if (status === 'Présélectionné') return t('shortlisted');
        if (status === 'En attente') return t('pending');
        if (status === 'Rejeté') return t('rejected');
        return status;
    }

    const filteredCandidates = useMemo(() => {
        if (statusFilter === 'all') {
            return candidates;
        }
        return candidates.filter(candidate => candidate.status === statusFilter);
    }, [statusFilter]);

    const statusOptions: {value: StatusFilter, label: string}[] = [
        { value: 'all', label: 'Tous' },
        { value: 'Présélectionné', label: t('shortlisted') },
        { value: 'En attente', label: t('pending') },
        { value: 'Rejeté', label: t('rejected') },
    ]

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">{t('all_candidates')}</h1>
            
            <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>{t('candidate_pool')}</CardTitle>
                        <CardDescription>{t('candidate_pool_description')}</CardDescription>
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
                                <TableHead className="hidden sm:table-cell">{t('job_position')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('match_score')}</TableHead>
                                <TableHead className="hidden sm:table-cell text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCandidates.map(candidate => (
                                <TableRow key={candidate.id} className="cursor-pointer" onClick={() => window.location.href = `/candidates/${candidate.id}`}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={candidate.avatarUrl} />
                                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{candidate.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{candidate.jobTitle}</TableCell>
                                    <TableCell>
                                    <Badge variant={
                                        candidate.status === 'Présélectionné' ? 'default' : 
                                        candidate.status === 'Rejeté' ? 'destructive' : 'secondary'
                                    }
                                    className={cn(
                                        'text-xs',
                                        candidate.status === 'Présélectionné' && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                        candidate.status === 'Rejeté' && 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                        candidate.status === 'En attente' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                    )}
                                    >{getTranslatedStatus(candidate.status)}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-primary font-bold">{candidate.matchScore}%</TableCell>
                                    <TableCell className="hidden sm:table-cell text-right">
                                        <Link href={`/candidates/${candidate.id}`} onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="sm">{t('view_profile')}</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
