
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";

export default function FinancePage() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center text-center h-full">
            <Card className="max-w-2xl bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)] p-8">
                <CardContent className="flex flex-col items-center gap-4">
                    <PiggyBank className="h-20 w-20 text-primary animate-pulse" />
                    <h1 className="text-3xl font-bold font-headline tracking-tight text-primary">
                        Finance & Comptabilité
                    </h1>
                    <p className="text-muted-foreground">
                        Cette fonctionnalité est en cours de développement. Bientôt, vous pourrez gérer les aspects financiers et comptables de votre entreprise directement depuis Clara.ai.
                    </p>
                    <p className="font-semibold text-foreground mt-4">
                        Vous serez notifié dès que cette section sera disponible !
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
