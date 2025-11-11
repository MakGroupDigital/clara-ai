
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import type { Job, JobStatus } from "@/lib/types";
import { useTranslation } from "@/hooks/use-translation";
import { Loader2, Plus } from "lucide-react";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export default function JobsPage() {
    const { t } = useTranslation();
    const firestore = useFirestore();
    const { user } = useUser();
    
    // In a real app, this would come from the user's profile
    const companyId = user ? "placeholder-company-id" : null; 

    const jobOffersQuery = useMemoFirebase(() => {
        if (!firestore || !companyId) return null;
        return query(collection(firestore, `companies/${companyId}/job_offers`));
    }, [firestore, companyId]);

    const { data: jobs, isLoading } = useCollection<Job>(jobOffersQuery);

    const getTranslatedStatus = (status: JobStatus) => {
        if (status === 'Actif') return t('job_status_active');
        if (status === 'En pause') return t('job_status_paused');
        if (status === 'Fermé') return t('job_status_closed');
        return status;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold font-headline tracking-tight">{t('job_offers')}</h1>
                <Link href="/jobs/create">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        {t('create_new_offer')}
                    </Button>
                </Link>
            </div>

            {isLoading && (
                <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {!isLoading && jobs && jobs.length === 0 && (
                <Card className="border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                            <h3 className="text-xl font-semibold">Aucune offre d'emploi pour le moment</h3>
                            <p className="text-muted-foreground max-w-sm">Commencez par créer votre première offre pour attirer des talents.</p>
                             <Link href="/jobs/create" className="mt-4">
                                <Button>
                                    {t('create_new_offer')}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}
            
            {!isLoading && jobs && jobs.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <Card key={job.id} className="border-primary/20 hover:border-primary/50 transition-colors flex flex-col bg-card/80 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                            <CardHeader>
                                <CardTitle className="font-headline text-primary">{job.title}</CardTitle>
                                <CardDescription>{job.department}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-bold text-foreground">{job.candidateCount}</span> {t('candidates')}
                                </div>
                                <Badge variant={job.status === 'Actif' ? 'default' : job.status === 'En pause' ? 'secondary' : 'outline'}
                                    className={cn(
                                        job.status === 'Actif' && 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                        job.status === 'En pause' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                        job.status === 'Fermé' && 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
                                    )}
                                >{getTranslatedStatus(job.status)}</Badge>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/jobs/${job.id}`} className="w-full">
                                    <Button variant="outline" className="w-full">{t('view_candidates')}</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
