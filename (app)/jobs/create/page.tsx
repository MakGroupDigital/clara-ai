
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/use-translation";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const jobSchema = z.object({
    title: z.string().min(1, "Le titre est requis."),
    department: z.string().min(1, "Le département est requis."),
    description: z.string().min(1, "La description est requise."),
    hardSkills: z.string().optional(),
    softSkills: z.string().optional(),
    keywords: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function CreateJobPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { t } = useTranslation();
    const firestore = useFirestore();
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            department: "",
            description: "",
            hardSkills: "",
            softSkills: "",
            keywords: "",
        },
    });

    const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
        if (!firestore || !user) {
            toast({ variant: "destructive", title: "Erreur", description: "Vous devez être connecté."});
            return;
        }

        setIsSubmitting(true);

        try {
            const companyId = "placeholder-company-id"; // In a real app, this would come from the user's profile
            const jobOffersRef = collection(firestore, `companies/${companyId}/job_offers`);
            
            await addDoc(jobOffersRef, {
                recruiterId: user.uid,
                title: data.title,
                description: data.description,
                department: data.department,
                hardSkills: data.hardSkills?.split(',').map(s => s.trim()).filter(s => s),
                softSkills: data.softSkills?.split(',').map(s => s.trim()).filter(s => s),
                keywords: data.keywords?.split(',').map(s => s.trim()).filter(s => s),
                status: "Actif",
                candidateCount: 0,
                createdAt: serverTimestamp(),
            });

            toast({
                title: t('job_offer_created_toast_title'),
                description: t('job_offer_created_toast_desc', { title: data.title }),
            });
            router.push("/jobs");
        } catch (error) {
            console.error("Error creating job offer:", error);
            toast({ variant: "destructive", title: "Erreur", description: "La création de l'offre a échoué."});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <div>
                <Link href="/jobs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {t('back_to_offers')}
                </Link>
                <h1 className="text-3xl font-bold font-headline tracking-tight mt-2">{t('create_new_offer')}</h1>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                        <CardHeader>
                            <CardTitle>{t('offer_details')}</CardTitle>
                            <CardDescription>{t('fill_offer_details')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('job_title')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('job_title_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('department')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('department_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('job_description')}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={t('job_description_placeholder')} rows={6} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hardSkills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('hard_skills')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="React, TypeScript, Node.js..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {t('hard_skills_desc')}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="softSkills"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('soft_skills')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Communication, Teamwork, Leadership..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {t('soft_skills_desc')}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="keywords"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('preselection_keywords')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Figma, Agile, B2B..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {t('preselection_keywords_desc')}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('publish_offer')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
