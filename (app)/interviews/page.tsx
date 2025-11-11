
'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { Bot, BotMessageSquare, Loader2, Plus, QrCode, Share2, Users } from "lucide-react";
import Link from "next/link";
import type { Interview } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";

const avatarImages: { [key: string]: string } = {
    clara: 'https://picsum.photos/seed/avatar-clara/200/200',
    thomas: 'https://picsum.photos/seed/avatar-thomas/200/200',
    sophie: 'https://picsum.photos/seed/avatar-sophie/200/200',
};

export default function InterviewsPage() {
    const { t } = useTranslation();
    const firestore = useFirestore();
    const { user } = useUser();
    
    // In a real app, this would come from the user's profile
    const companyId = user ? "placeholder-company-id" : null;

    const interviewsQuery = useMemoFirebase(() => {
        if (!firestore || !user || !companyId) return null;
        return query(collection(firestore, `companies/${companyId}/interviews`), where('recruiterId', '==', user.uid));
    }, [firestore, user, companyId]);

    const { data: interviews, isLoading } = useCollection<Interview>(interviewsQuery);


    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold font-headline tracking-tight">{t('interviews')}</h1>
                <Link href="/interviews/create">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        {t('create_video_interview')}
                    </Button>
                </Link>
            </div>

            {isLoading && (
                 <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}

            {!isLoading && interviews && interviews.length === 0 ? (
                <Card className="border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                            <BotMessageSquare className="h-16 w-16 text-muted-foreground" />
                            <h3 className="text-xl font-semibold">{t('no_interviews_yet')}</h3>
                            <p className="text-muted-foreground max-w-sm">{t('no_interviews_yet_desc')}</p>
                            <Link href="/interviews/create" className="mt-4">
                                <Button>
                                    {t('create_first_interview')}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {interviews?.map((interview) => (
                        <Card key={interview.id} className="border-primary/20 hover:border-primary/50 transition-colors flex flex-col bg-card/80 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className="font-headline text-primary">{interview.jobTitle}</CardTitle>
                                        <CardDescription>{interview.questions.length} questions</CardDescription>
                                    </div>
                                    <Avatar>
                                        <AvatarImage src={avatarImages[interview.avatar]} />
                                        <AvatarFallback><Bot/></AvatarFallback>
                                    </Avatar>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <Badge variant="outline">
                                    <Users className="mr-2 h-3 w-3" />
                                    {interview.participantCount} Participants
                                </Badge>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full">
                                    <Users className="mr-2 h-4 w-4" /> {t('view_candidates')}
                                </Button>
                                <div className="flex gap-2 w-full">
                                    <Button variant="outline" className="flex-1">
                                        <Share2 className="mr-2 h-4 w-4" /> {t('share')}
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <QrCode className="mr-2 h-4 w-4" /> {t('qr_code')}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

    