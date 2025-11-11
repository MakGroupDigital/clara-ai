
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "@/hooks/use-translation";
import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-headline tracking-tight text-center">{t('about_clara_title')}</h1>
            
            <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">{t('about_origin_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        {t('about_origin_p1_1')} <span className="font-semibold text-foreground"><span className="text-accent">Clara</span><span className="text-primary">.ai</span></span> {t('about_origin_p1_2')} <span className="italic">"clarus"</span>, {t('about_origin_p1_3')}
                    </p>
                    <p>
                        {t('about_origin_p2')}
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">{t('about_mission_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span> {t('about_mission_p1_part2')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li><span className="font-semibold text-foreground">{t('about_feature_1_title')}</span> {t('about_feature_1_desc')}</li>
                        <li><span className="font-semibold text-foreground">{t('about_feature_2_title')}</span> {t('about_feature_2_desc')}</li>
                        <li><span className="font-semibold text-foreground">{t('about_feature_3_title')}</span> {t('about_feature_3_desc')}</li>
                        <li><span className="font-semibold text-foreground">{t('about_feature_4_title')}</span> {t('about_feature_4_desc')}</li>
                    </ul>
                </CardContent>
            </Card>

             <Card className="bg-card/80 border-accent/20 shadow-[0_0_20px_hsl(var(--accent)/0.1)]">
                <CardHeader>
                    <CardTitle className="font-headline text-accent">{t('about_developer_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4 border-4 border-accent/50">
                        <AvatarImage src="https://picsum.photos/seed/charmant/200/200" alt="Charmant Nyungu" data-ai-hint="man portrait"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-xl font-semibold text-foreground">M. Charmant Nyungu K.</p>
                    <p className="text-muted-foreground">
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span> {t('about_developer_desc_part2')}
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">{t('privacy_policy_title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>{t('privacy_policy_p1')}</p>
                    <h3 className="font-semibold text-foreground pt-4">{t('privacy_policy_h1')}</h3>
                    <p>{t('privacy_policy_p2')}</p>
                    <h3 className="font-semibold text-foreground pt-4">{t('privacy_policy_h2')}</h3>
                    <p>{t('privacy_policy_p3')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
