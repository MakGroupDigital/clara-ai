
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, PlusCircle, Trash2, Bot, User, Smile, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Interview, Job } from '@/lib/types';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { addDoc, collection, query } from 'firebase/firestore';

const interviewSchema = z.object({
    jobOfferId: z.string().min(1, "La sélection d'une offre d'emploi est requise."),
    avatar: z.string().min(1, "La sélection d'un avatar est requise."),
    questions: z.array(z.object({
        value: z.string().min(1, "La question ne peut pas être vide."),
    })).min(1, "Vous devez ajouter au moins une question."),
});

type InterviewFormValues = z.infer<typeof interviewSchema>;

const avatars = [
    { id: 'clara', name: 'Clara', icon: Bot, image: 'https://picsum.photos/seed/avatar-clara/200/200', hint: 'robot face' },
    { id: 'thomas', name: 'Thomas', icon: User, image: 'https://picsum.photos/seed/avatar-thomas/200/200', hint: 'man face' },
    { id: 'sophie', name: 'Sophie', icon: Smile, image: 'https://picsum.photos/seed/avatar-sophie/200/200', hint: 'woman face' },
];

export default function CreateInterviewPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { t } = useTranslation();
    const firestore = useFirestore();
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const companyId = user ? "placeholder-company-id" : null;

    const jobOffersQuery = useMemoFirebase(() => {
        if (!firestore || !companyId) return null;
        return query(collection(firestore, `companies/${companyId}/job_offers`));
    }, [firestore, companyId]);

    const { data: jobs, isLoading: isLoadingJobs } = useCollection<Job>(jobOffersQuery);

    const form = useForm<InterviewFormValues>({
        resolver: zodResolver(interviewSchema),
        defaultValues: {
            jobOfferId: "",
            avatar: "clara",
            questions: [{ value: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    const onSubmit = async (data: InterviewFormValues) => {
        if (!firestore || !companyId || !user) {
            toast({ variant: "destructive", title: "Erreur", description: "Vous devez être connecté."});
            return;
        }

        const selectedJob = jobs?.find(j => j.id === data.jobOfferId);
        if (!selectedJob) {
            toast({ variant: "destructive", title: "Erreur", description: "Offre d'emploi non trouvée."});
            return;
        }

        setIsSubmitting(true);
        
        try {
            const interviewsRef = collection(firestore, `companies/${companyId}/interviews`);
            await addDoc(interviewsRef, {
                companyId,
                recruiterId: user.uid,
                jobOfferId: data.jobOfferId,
                jobTitle: selectedJob.title,
                avatar: data.avatar,
                questions: data.questions.map(q => q.value),
                participantCount: 0
            });
            
            toast({
                title: t('interview_created_toast_title'),
                description: t('interview_created_toast_desc'),
            });
            router.push("/interviews");

        } catch (error) {
            console.error("Error creating interview:", error);
            toast({ variant: "destructive", title: "Erreur", description: "La création de l'entretien a échoué."});
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const selectedAvatar = form.watch('avatar');

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight mt-2">{t('create_video_interview')}</h1>
                <p className="text-muted-foreground">{t('create_video_interview_desc')}</p>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                        <CardHeader>
                            <CardTitle>{t('interview_config')}</CardTitle>
                            <CardDescription>{t('interview_config_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('choose_avatar')}</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-wrap gap-4 pt-2">
                                                {avatars.map(avatar => (
                                                    <div key={avatar.id} onClick={() => form.setValue('avatar', avatar.id)} className={cn("cursor-pointer flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 w-24", selectedAvatar === avatar.id ? "border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.5)]" : "border-transparent hover:bg-muted")}>
                                                        <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                                                             <AvatarImage src={avatar.image} alt={avatar.name} data-ai-hint={avatar.hint} />
                                                            <AvatarFallback><avatar.icon/></AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium text-sm sm:text-base">{avatar.name}</span>
                                                    </div>
                                                ))}
                                                 <div className={cn("cursor-pointer flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-muted-foreground/50 text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-muted hover:text-foreground w-24 h-[116px] sm:h-[132px]")}>
                                                    <PlusCircle className="h-8 w-8" />
                                                    <span className="text-sm font-medium text-center">Créer Avatar</span>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobOfferId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('select_job_offer')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger disabled={isLoadingJobs}>
                                                    <SelectValue placeholder={isLoadingJobs ? "Chargement..." : t('select_job_offer_placeholder')} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {jobs?.filter(j => j.status === 'Actif').map(job => (
                                                    <SelectItem key={job.id} value={job.id}>{job.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <Label>{t('interview_questions')}</Label>
                                <div className="space-y-4 pt-2">
                                    {fields.map((field, index) => (
                                        <FormField
                                            key={field.id}
                                            control={form.control}
                                            name={`questions.${index}.value`}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input placeholder={`${t('question')} ${index + 1}`} {...field} />
                                                    </FormControl>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ value: "" })} className="mt-4">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    {t('add_question')}
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                             <Button type="submit" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t('save_interview')}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    );
}

    
