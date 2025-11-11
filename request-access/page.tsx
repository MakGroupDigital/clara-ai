
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function RequestAccessPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const fileInput = event.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
        const legalDoc = fileInput?.files?.[0];

        if (legalDoc) {
            formData.append('legalDoc', legalDoc);
        }

        try {
            const response = await fetch('/api/submit-request', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Une erreur est survenue.');
            }

            toast({
                title: "Demande envoyée !",
                description: "Votre demande d'accès a été envoyée avec succès. Nous vous contacterons bientôt.",
            });
            (event.target as HTMLFormElement).reset();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: error.message || "Impossible d'envoyer la demande. Veuillez réessayer.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 flex flex-col items-center justify-center bg-grid-pattern">
            <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <ArrowLeft className="h-4 w-4" />
                    Retour à l'accueil
                </Link>
            </div>

            <Card className="w-full max-w-2xl bg-card/80 border-primary/20 shadow-glow-primary-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Demander un accès à <span className="text-accent">Clara</span><span className="text-primary">.ai</span></CardTitle>
                    <CardDescription>
                        Remplissez ce formulaire pour commencer votre essai de 60 jours. Notre équipe examinera votre demande et vous donnera accès à la plateforme.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Nom de l'entreprise</Label>
                            <Input id="companyName" name="companyName" required placeholder="Votre Société SARL" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactName">Nom du contact</Label>
                            <Input id="contactName" name="contactName" required placeholder="Jean Dupont" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse e-mail professionnelle</Label>
                            <Input id="email" name="email" type="email" required placeholder="contact@votre-societe.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyCategory">Catégorie d'entreprise</Label>
                            <Select name="companyCategory" required>
                                <SelectTrigger id="companyCategory">
                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grande_entreprise">Grande Entreprise</SelectItem>
                                    <SelectItem value="pme">PME</SelectItem>
                                    <SelectItem value="startup">Startup</SelectItem>
                                    <SelectItem value="cabinet_recrutement">Cabinet de recrutement</SelectItem>
                                    <SelectItem value="autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="nationalId">Identification Nationale (Ex: NIF, RCCM)</Label>
                            <Input id="nationalId" name="nationalId" required placeholder="Numéro d'identification légale" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="legalDoc">Document Légal (Statut, RCCM, etc. - PDF)</Label>
                            <Input id="legalDoc" name="legalDoc" type="file" accept=".pdf" />
                             <p className="text-xs text-muted-foreground">Ce document nous aide à vérifier votre entreprise plus rapidement.</p>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
