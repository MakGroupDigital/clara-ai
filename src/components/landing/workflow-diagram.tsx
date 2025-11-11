
'use client';

import React from "react";
import { AnimatedOnScroll } from "@/components/ui/animated-on-scroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileText, BotMessageSquare, BrainCircuit, BarChart, UserCheck, Share2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

const steps = [
    {
        icon: Share2,
        title: "1. Création & Diffusion",
        description: "Postez votre offre et diffusez-la en un clic.",
    },
    {
        icon: FileText,
        title: "2. Tri IA des CV",
        description: "L'IA analyse et présélectionne les CV pertinents.",
    },
    {
        icon: BotMessageSquare,
        title: "3. Entretien Vidéo IA",
        description: "Les candidats passent un entretien vidéo personnalisé.",
    },
    {
        icon: BrainCircuit,
        title: "4. Analyse & Scoring",
        description: "L'IA évalue les compétences et génère un score de matching.",
    },
    {
        icon: UserCheck,
        title: "5. Décision Finale",
        description: "Prenez votre décision sur la base de données objectives.",
    },
];

const Connector = ({ isVisible }: { isVisible: boolean }) => (
    <div className="relative flex-1 hidden md:flex items-center justify-center">
        <div className="w-full h-1 bg-border" />
        <div
            className={cn(
                "absolute top-0 left-0 h-1 bg-gradient-to-r from-accent to-primary",
                isVisible ? "w-full" : "w-0"
            )}
            style={{ transition: 'width 1s ease-out' }}
        />
    </div>
);

export function WorkflowDiagram() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <AnimatedOnScroll animation="fade-in" delay={index * 200}>
                        <Card className="w-full md:w-48 h-48 flex flex-col items-center justify-center text-center p-4 border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-glow-primary-sm bg-card/80">
                            <step.icon className="h-10 w-10 text-primary mb-2" />
                            <h3 className="font-headline text-md">{step.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                        </Card>
                    </AnimatedOnScroll>
                    {index < steps.length - 1 && <Connector isVisible={inView} />}
                </React.Fragment>
            ))}
        </div>
    );
}
