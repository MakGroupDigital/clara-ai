
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export default function SubscriptionPage() {
    const { t } = useTranslation();

    const plans = [
        {
            name: t('plan_basic_name'),
            price: t('plan_basic_price'),
            period: t('plan_basic_period'),
            description: t('plan_basic_desc'),
            features: [t('feature_3_months_trial')],
            isCurrent: false,
            isPopular: false,
        },
        {
            name: t('plan_quarterly_name'),
            price: '$10',
            period: ` / ${t('quarter')}`,
            description: t('plan_quarterly_desc'),
            features: [t('feature_all_basic'), t('feature_email_support')],
            isCurrent: false,
            isPopular: true,
        },
        {
            name: t('plan_semiannual_name'),
            price: '$25',
            period: ` / ${t('semester')}`,
            description: t('plan_semiannual_desc'),
            features: [t('feature_all_quarterly'), t('feature_priority_support'), t('feature_customization')],
            isCurrent: true,
            isPopular: false,
        },
        {
            name: t('plan_annual_name'),
            price: '$44',
            period: ` / ${t('year')}`,
            description: t('plan_annual_desc'),
            features: [t('feature_all_semiannual'), t('feature_api_access')],
            isCurrent: false,
            isPopular: false,
        },
        {
            name: t('plan_lifetime_name'),
            price: '$100',
            period: t('plan_lifetime_period'),
            description: t('plan_lifetime_desc'),
            features: [t('feature_all_annual'), t('feature_lifetime_updates')],
            isCurrent: false,
            isPopular: false,
        },
    ]

    return (
        <div className="flex flex-col gap-8">
            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle>{t('your_subscription')}</CardTitle>
                    <CardDescription>{t('subscription_description_new')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan, index) => (
                            <Card key={index} className={cn(
                                "flex flex-col",
                                plan.isCurrent ? "border-primary shadow-glow-primary-sm" : "border-border",
                                plan.isPopular ? "border-accent shadow-glow-accent-sm" : ""
                            )}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="font-headline">{plan.name}</CardTitle>
                                        {plan.isPopular && <Star className="text-accent fill-accent" />}
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <ul className="space-y-3 mb-6">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-center gap-3">
                                                <Check className="h-5 w-5 text-emerald-500"/>
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className={cn(
                                        "w-full",
                                        plan.isCurrent ? "" : ""
                                    )} disabled={plan.isCurrent} variant={plan.isCurrent ? "outline" : "default"}>
                                        {plan.isCurrent ? t('current_plan') : t('choose_plan')}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
