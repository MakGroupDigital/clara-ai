
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
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
            <CardTitle className="font-headline text-3xl text-primary">Politique de Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-invert prose-p:text-muted-foreground prose-h2:text-foreground prose-h2:font-headline prose-h3:text-foreground prose-h3:font-headline prose-strong:text-foreground">
            <p>Dernière mise à jour : 24 juillet 2024</p>
            
            <p>
              Cette politique de cookies explique ce que sont les cookies et comment nous les utilisons sur <span className="text-accent">Clara</span><span className="text-primary">.ai</span>.
            </p>

            <h2>Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte placé sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Il permet au site de se souvenir de vos actions et préférences (telles que la connexion, la langue, la taille de la police et d'autres préférences d'affichage) sur une période donnée.
            </p>

            <h2>Comment utilisons-nous les cookies ?</h2>
            <p>
              Nous utilisons des cookies pour plusieurs raisons :
            </p>
            <ul>
                <li>
                    <strong>Cookies Strictement Nécessaires :</strong> Ces cookies sont essentiels au fonctionnement de notre site. Ils incluent, par exemple, les cookies qui vous permettent de vous connecter à des zones sécurisées de notre site (votre compte utilisateur). Sans ces cookies, les services que vous avez demandés ne peuvent pas être fournis.
                </li>
                 <li>
                    <strong>Cookies de Fonctionnalité :</strong> Ces cookies sont utilisés pour vous reconnaître lorsque vous revenez sur notre site. Cela nous permet de personnaliser notre contenu pour vous, comme mémoriser votre langue préférée. Par exemple, nous utilisons un cookie (`localStorage`) pour conserver votre choix de langue.
                </li>
                 <li>
                    <strong>Cookies de Performance/Analyse :</strong> Ces cookies nous permettent de reconnaître et de compter le nombre de visiteurs et de voir comment les visiteurs se déplacent sur notre site lorsqu'ils l'utilisent. Cela nous aide à améliorer le fonctionnement de notre site, par exemple, en veillant à ce que les utilisateurs trouvent facilement ce qu'ils recherchent. Nous utilisons les services d'analyse de Firebase à cette fin.
                </li>
            </ul>

            <h2>Vos choix concernant les cookies</h2>
            <p>
              La plupart des navigateurs web vous permettent de contrôler les cookies via leurs paramètres. Vous pouvez configurer votre navigateur pour qu'il refuse tous les cookies ou pour qu'il vous avertisse lorsqu'un cookie est envoyé.
            </p>
            <p>
                Veuillez noter que si vous choisissez de bloquer les cookies strictement nécessaires, certaines parties de notre site pourraient ne pas fonctionner correctement, notamment la connexion à votre espace personnel.
            </p>
            
            <h2>Contact</h2>
             <p>
              Pour toute question concernant notre utilisation des cookies, veuillez nous contacter à : contact@ybs-innovate.com.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
