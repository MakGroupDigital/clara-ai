
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedOnScroll } from "@/components/ui/animated-on-scroll";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {

    const plans = [
        {
            name: "Essai Gratuit",
            price: "0",
            period: "/ 60 jours",
            description: "Découvrez la puissance de Clara.ai sans engagement.",
            features: [
                "Analyse jusqu'à 50 CV",
                "2 offres d'emploi actives",
                "Entretiens vidéo automatisés",
                "Support par email"
            ],
            isPopular: false,
            cta: "Commencer l'essai"
        },
        {
            name: "Trimestriel",
            price: "$29",
            period: "/ trimestre",
            description: "Idéal pour les besoins de recrutement ponctuels.",
            features: [
                "Toutes les fonctionnalités de l'essai",
                "Analyse de CV illimitée",
                "10 offres d'emploi actives",
                "Analyses neurocognitives"
            ],
            isPopular: true,
            cta: "Choisir ce plan"
        },
        {
            name: "Semestriel",
            price: "$56",
            period: "/ semestre",
            description: "Parfait pour un rythme de recrutement régulier.",
            features: [
                "Toutes les fonctionnalités trimestrielles",
                "Offres d'emploi illimitées",
                "Support prioritaire",
                "Accès aux nouvelles fonctionnalités en avant-première"
            ],
            isPopular: false,
            cta: "Choisir ce plan"
        },
        {
            name: "Annuel",
            price: "$77",
            period: "/ an",
            description: "La meilleure valeur pour une stratégie RH continue.",
            features: [
                "Toutes les fonctionnalités semestrielles",
                "Accès à l'API pour intégration",
                "Consultant dédié",
                "Personnalisation de l'interface"
            ],
            isPopular: false,
            cta: "Choisir ce plan"
        },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 flex flex-col items-center justify-center bg-grid-pattern">
             <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-4 w-4" />
                    Retour à l'accueil
                </Link>
            </div>
            <div className="max-w-7xl w-full flex flex-col items-center">
                 <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline text-center mb-4 text-primary">Une tarification simple et transparente</h1>
                    <p className="text-muted-foreground max-w-3xl mx-auto text-lg">Choisissez le plan qui évolue avec les ambitions de votre entreprise.</p>
                </AnimatedOnScroll>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, index) => (
                        <AnimatedOnScroll key={index} animation="fade-in" delay={index * 100}>
                            <Card key={index} className={cn(
                                "flex flex-col h-full bg-card/80",
                                plan.isPopular ? "border-accent shadow-glow-accent-sm" : "border-primary/20"
                            )}>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="font-headline">{plan.name}</CardTitle>
                                        {plan.isPopular && <Badge variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">Populaire</Badge>}
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">{plan.period}</span>
                                    </div>
                                    <CardDescription>Découvrez la puissance de <span className="text-accent">Clara</span><span className="text-primary">.ai</span> sans engagement.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-between">
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0"/>
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/request-access">
                                        <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </AnimatedOnScroll>
                    ))}
                </div>
                 <div className="mt-12 text-center text-muted-foreground">
                    <p>Vous avez des besoins spécifiques ? <Link href="#" className="text-primary underline">Contactez-nous pour une offre sur mesure.</Link></p>
                </div>
            </div>
        </div>
    );
}
