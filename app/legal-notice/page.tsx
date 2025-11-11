
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LegalNoticePage() {
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
            <CardTitle className="font-headline text-3xl text-primary">Mentions Légales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground prose-h2:font-headline prose-strong:text-foreground">
            <p>Conformément aux dispositions de la loi pour la confiance dans l'économie numérique, il est porté à la connaissance des utilisateurs du site <span className="text-accent">Clara</span><span className="text-primary">.ai</span> les présentes mentions légales.</p>

            <h2>1. Éditeur du Site</h2>
            <p>
              <strong>Nom de la société :</strong> YBS-Innovate SAS
              <br />
              <strong>Siège social :</strong> 01 wagenia - Gombe Kinshasa rdc
              <br />
              <strong>Capital social :</strong> 5.000.000 CDF
              <br />
              <strong>Numéro d'immatriculation :</strong> CD/KNG/RCCM/25-A-02946
              <br />
              <strong>Adresse e-mail :</strong> contact@ybs-innovate.com
              <br />
              <strong>Directeur de la publication :</strong> YBS-INNOVATE SAS
            </p>

            <h2>2. Hébergement</h2>
            <p>
              Le site <span className="text-accent">Clara</span><span className="text-primary">.ai</span> est hébergé par Firebase, un service de Google.
              <br />
              <strong>Google LLC</strong>
              <br />
              Adresse : 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            </p>
            
            <h2>3. Accès au site</h2>
            <p>
              Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découler d’une nécessité de maintenance.
            </p>

            <h2>4. Propriété intellectuelle</h2>
            <p>
              Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site <span className="text-accent">Clara</span><span className="text-primary">.ai</span>, sans autorisation de l’Éditeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
            </p>
            
            <h2>5. Données personnelles</h2>
            <p>
              Les informations recueillies sur le site <span className="text-accent">Clara</span><span className="text-primary">.ai</span> se font dans le cadre des besoins liés à l'utilisation de notre plateforme, tels que la création de compte ou l'analyse des entretiens. YBS-Innovate SAS s'engage à ne céder en aucun cas les informations concernant les utilisateurs du site Internet, de quelque façon qu'il soit (vente, échange, prêt, location, don).
              <br/>
              Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée, l’utilisateur bénéficie d’un droit d’accès et de rectification aux informations qui le concernent, droit qu'il peut exercer à tout moment en adressant un mail à l'adresse contact@ybs-innovate.com.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
