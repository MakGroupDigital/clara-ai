
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { jobs as initialJobs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { Job, JobStatus, Candidate } from "@/lib/types";
import { useTranslation } from "@/hooks/use-translation";
import { useToast } from "@/hooks/use-toast";
import { useUser, useFirestore, errorEmitter, FirestorePermissionError } from "@/firebase";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export default function CandidateDashboardPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const { t } = useTranslation();
    const { toast } = useToast();
    const { user, profile } = useUser();
    const firestore = useFirestore();
    const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        // This is a temporary solution to get some job data.
        // In a real app, jobs would be fetched from Firestore.
        const activeJobs = initialJobs.filter((j: Job) => j.status === 'Actif');
        setJobs(activeJobs);

        const fetchApplications = async () => {
            if (user && firestore) {
                try {
                    // This path needs to be correct based on your Firestore structure
                    // Example: find applications across all companies/jobs for the current user
                    const applicationsCollectionGroup = collection(firestore, 'applications');
                    const q = query(applicationsCollectionGroup, where('candidateId', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    const jobIds = new Set(querySnapshot.docs.map(doc => doc.data().jobOfferId));
                    setAppliedJobIds(jobIds);
                } catch (e) {
                    // In a real app, handle query errors, maybe from permissions
                    console.error("Failed to fetch user applications:", e);
                }
            }
        };

        fetchApplications();
    }, [user, firestore]);

    const getTranslatedStatus = (status: JobStatus) => {
        if (status === 'Actif') return t('job_status_active');
        if (status === 'En pause') return t('job_status_paused');
        if (status === 'Fermé') return t('job_status_closed');
        return status;
    }

    const handleApply = async (job: Job) => {
      if (!user || !profile || !firestore) {
          toast({
              variant: "destructive",
              title: "Erreur",
              description: "Vous devez être connecté pour postuler.",
          });
          return;
      }
      
      const applicationId = uuidv4();
      // Assuming a placeholder company for now, as multi-company logic isn't fully implemented
      const companyId = "placeholder-company-id";
      const applicationRef = doc(firestore, `companies/${companyId}/job_offers/${job.id}/applications`, applicationId);
      
      const applicationData = {
          id: applicationId,
          candidateId: user.uid,
          jobOfferId: job.id,
          status: 'En attente',
          cvUrl: '', // Placeholder
          videoInterviewUrl: '', // Placeholder
          iaScore: 0,
          createdAt: serverTimestamp(),
          candidateName: `${profile.firstName} ${profile.lastName}`,
          candidateEmail: user.email,
      };

      // Optimistic UI update
      setAppliedJobIds(prev => new Set(prev).add(job.id));
      toast({
          title: "Candidature envoyée !",
          description: `Vous avez postulé à l'offre "${job.title}".`,
      });

      // Perform the Firestore operation and catch potential permission errors
      setDoc(applicationRef, applicationData)
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: applicationRef.path,
                operation: 'create',
                requestResourceData: applicationData,
            });
            errorEmitter.emit('permission-error', permissionError);

            // Revert the optimistic UI update on failure
            setAppliedJobIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(job.id);
                return newSet;
            });
            // The global error listener will now throw the error, so we don't need a toast here.
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-headline tracking-tight">Offres d'emploi disponibles</h1>
            </div>
            {jobs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job) => (
                        <Card key={job.id} className="border-primary/20 hover:border-primary/50 transition-colors flex flex-col bg-card/80 shadow-glow-primary-sm">
                            <CardHeader>
                                <CardTitle className="font-headline text-primary">{job.title}</CardTitle>
                                <CardDescription>{job.department}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-center justify-between">
                                <Badge variant={job.status === 'Actif' ? 'default' : job.status === 'En pause' ? 'secondary' : 'outline'}
                                    className={cn(
                                        'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    )}
                                >{getTranslatedStatus(job.status)}</Badge>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleApply(job)} disabled={appliedJobIds.has(job.id)}>
                                    {appliedJobIds.has(job.id) ? "Déjà postulé" : "Postuler"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <Card className="border-primary/20 shadow-glow-primary-sm">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                            <h3 className="text-xl font-semibold">Aucune offre d'emploi pour le moment</h3>
                            <p className="text-muted-foreground max-w-sm">Revenez plus tard pour voir les nouvelles opportunités.</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
