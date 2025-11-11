
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
            <CardTitle className="font-headline text-3xl text-primary">Politique d'Utilisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground prose-h2:font-headline prose-h3:text-foreground prose-h3:font-headline prose-strong:text-foreground">
            <p>Dernière mise à jour : 24 juillet 2024</p>
            
            <p>
              Bienvenue sur <span className="text-accent">Clara</span><span className="text-primary">.ai</span>. En utilisant notre site web et nos services, vous acceptez de vous conformer aux présentes conditions d'utilisation. Veuillez les lire attentivement.
            </p>

            <h2>1. Définitions</h2>
            <p>
              <strong>"Service"</strong> : désigne la plateforme <span className="text-accent">Clara</span><span className="text-primary">.ai</span>, incluant le site web, les applications et l'ensemble des fonctionnalités fournies par YBS-Innovate SAS.
              <br/>
              <strong>"Utilisateur"</strong> : toute personne, physique ou morale, qui accède au Service, qu'il s'agisse d'un "Recruteur" ou d'un "Candidat".
            </p>

            <h2>2. Utilisation du Service</h2>
            <p>
              Vous vous engagez à utiliser le Service conformément à sa destination et dans le respect des lois en vigueur. Toute utilisation abusive, frauduleuse ou visant à nuire au Service ou à ses utilisateurs est strictement interdite.
            </p>
            <p>
              Il vous est interdit de :
            </p>
            <ul>
                <li>Téléverser du contenu illégal, diffamatoire, haineux ou discriminatoire.</li>
                <li>Tenter d'accéder sans autorisation aux systèmes informatiques de <span className="text-accent">Clara</span><span className="text-primary">.ai</span>.</li>
                <li>Utiliser le Service à des fins autres que le recrutement ou la recherche d'emploi.</li>
            </ul>

            <h2>3. Propriété Intellectuelle</h2>
            <p>
              L'ensemble du contenu du Service, y compris mais sans s'y limiter, les textes, graphismes, logos, et le logiciel, est la propriété exclusive de YBS-Innovate SAS et est protégé par les lois sur la propriété intellectuelle. Aucune reproduction, même partielle, n'est autorisée sans notre consentement écrit préalable.
            </p>

            <h2>4. Responsabilité</h2>
            <p>
              <span className="text-accent">Clara</span><span className="text-primary">.ai</span> est un outil d'aide à la décision. Nous nous efforçons de fournir des analyses fiables, mais nous ne pouvons garantir l'exactitude absolue des évaluations de l'IA. La décision finale de recrutement appartient exclusivement à l'Utilisateur Recruteur. La responsabilité de YBS-Innovate SAS ne saurait être engagée pour toute décision prise sur la base des informations fournies par le Service.
            </p>

             <h2>5. Modification des Conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page pour vous tenir informé des éventuelles mises à jour.
            </p>

            <h2>6. Contact</h2>
            <p>
              Pour toute question relative à ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante : contact@ybs-innovate.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
