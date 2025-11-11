
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { CandidateDetails } from "@/lib/types";
import { Wand2, Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { analyzeCandidateVideoInterview, AnalyzeCandidateVideoInterviewOutput } from '@/ai/flows/analyze-candidate-video-interview';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

type Props = {
    candidate: CandidateDetails;
}

export function CandidateScoreCard({ candidate }: Props) {
    const [analysis, setAnalysis] = useState<AnalyzeCandidateVideoInterviewOutput | null>(candidate.aiAnalysis);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { t } = useTranslation();

    const handleAnalysis = async () => {
        setIsLoading(true);
        try {
            // In a real application, you would get the video transcript from a service.
            // For now, we simulate a transcript.
            const simulatedTranscript = `Interviewer: "Can you tell me about a time you had to lead a team project?"
      Candidate: "Certainly. In my previous role at TechCorp, I was tasked with leading a cross-functional team to launch a new feature. I started by clearly defining our goals and each person's role. We had some challenges with deadlines, but by facilitating open communication and daily stand-ups, we managed to stay on track. I made sure to listen to everyone's input, which fostered a great sense of teamwork. We successfully launched the feature 10% ahead of schedule."
      Interviewer: "How do you handle tight deadlines and pressure?"
      Candidate: "I thrive under pressure. I prioritize tasks using the Eisenhower Matrix, focusing on what's urgent and important. I also believe in proactive communication with stakeholders to manage expectations. For example, on a recent project, we were facing a potential delay. I immediately flagged the risk to my manager and proposed a revised timeline, which was approved. It's all about being transparent and solution-oriented."`;
            
            const result = await analyzeCandidateVideoInterview({
                interviewTranscript: simulatedTranscript,
                jobDescription: candidate.jobDescription,
            });
            
            setAnalysis(result);

        } catch (error) {
            console.error("Erreur lors de l'analyse de l'entretien:", error);
            toast({
                variant: "destructive",
                title: t('error_toast_title'),
                description: t('analysis_failed_toast_desc'),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="bg-card/80 border-accent/20 shadow-[0_0_20px_hsl(var(--accent)/0.1)]">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-accent">{t('ai_analysis_report')}</CardTitle>
                {!analysis && (
                    <Button onClick={handleAnalysis} disabled={isLoading} className="shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow bg-accent hover:bg-accent/90">
                        {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                        {isLoading ? t('analyzing') : t('analyze_interview')}
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className='flex flex-col items-center justify-center min-h-[200px] text-center'>
                        <Loader className="h-8 w-8 animate-spin text-accent mb-4"/>
                        <p className='text-lg font-semibold'>{t('analyzing_video')}</p>
                        <p className='text-muted-foreground text-sm'>{t('analysis_may_take_a_moment')}</p>
                    </div>
                ) : analysis ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">{t('overall_match_score')}</span>
                            <span className="text-3xl font-bold font-headline text-primary">{analysis.matchingScore}%</span>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h4 className="font-semibold">{t('soft_skills_assessment')}</h4>
                            {analysis.softSkillsAssessment && Object.entries(analysis.softSkillsAssessment).map(([skill, score]) => (
                                <div key={skill} className="grid grid-cols-5 items-center gap-4">
                                    <span className="col-span-2 text-sm text-muted-foreground capitalize">{skill.replace(/_/g, ' ')}</span>
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Progress value={score} className="h-3 bg-secondary [&>div]:bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.7)]"/>
                                        <span className="text-sm font-bold w-10 text-right">{score}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold mb-2">{t('ai_summary')}</h4>
                            <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                        </div>
                    </div>
                ) : (
                    <Alert className="border-accent/30 bg-accent/10">
                        <Wand2 className="h-4 w-4 !text-accent" />
                        <AlertTitle>{t('ready_for_ai_analysis')}</AlertTitle>
                        <AlertDescription>
                            {t('click_analyze_to_generate_report')}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
