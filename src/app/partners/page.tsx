
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Handshake } from 'lucide-react';
import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>
        <Card className="bg-card/80 border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary flex items-center gap-4">
              <Handshake className="h-8 w-8" />
              Nos Partenaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>
              <span className="text-accent">Clara</span><span className="text-primary">.ai</span> s'entoure des meilleurs pour vous offrir un service d'excellence. Nous collaborons avec des acteurs majeurs de la technologie et des ressources humaines pour enrichir constamment notre plateforme.
            </p>
            <div className="text-center py-8">
                <p className="font-semibold text-foreground">
                    La liste de nos partenaires technologiques et institutionnels sera bientôt dévoilée.
                </p>
                <p className="mt-2">
                    Cette section est en cours de construction. Revenez bientôt !
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
