
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BarChart3, BotMessageSquare, BrainCircuit, FileSearch, Gauge, Languages, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { AnimatedOnScroll } from "@/components/ui/animated-on-scroll";

const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Analyse et tri intelligent des CV",
      description: "Notre système traite des volumes massifs de CV en quelques secondes. Grâce au Traitement Naturel du Langage (NLP), Clara.ai ne se contente pas de chercher des mots-clés ; elle comprend le contexte des expériences, évalue la cohérence du parcours du candidat, et détecte automatiquement les anomalies comme les incohérences de dates, le plagiat, ou les informations cruciales manquantes. Vous obtenez un tri pertinent qui va au-delà de la simple correspondance de mots."
    },
    {
      icon: <BotMessageSquare className="h-10 w-10 text-primary" />,
      title: "Entretien automatisé et interactif",
      description: "Offrez aux candidats une expérience d'entretien flexible, disponible 24/7, en direct ou en différé. Clara.ai agit comme un recruteur virtuel, posant des questions générées dynamiquement en fonction des exigences du poste et des propres réponses du candidat. Le moteur d'apprentissage adaptatif ajuste la difficulté et l'orientation des questions en temps réel pour sonder en profondeur la logique et les compétences du candidat, sans aucune intervention humaine."
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: "Analyse neurocognitive et comportementale",
      description: "C'est ici que Clara.ai se distingue. Inspirée par les neurosciences, notre IA analyse des centaines de points de données par seconde : les micro-expressions faciales pour déceler les émotions réelles, les mouvements oculaires pour évaluer l'attention, et les variations du rythme vocal pour mesurer le niveau de stress ou de confiance. Ce profil psychométrique automatique révèle des soft skills clés comme l'empathie, la créativité ou le leadership."
    },
     {
      icon: <Gauge className="h-10 w-10 text-primary" />,
      title: "Scoring cognitif et émotionnel",
      description: "Chaque entretien génère un rapport de performance détaillé. Le score global (0-100) est une synthèse intelligente de multiples facteurs : la cohérence des réponses, le niveau de confiance projeté, et l'adéquation globale avec le profil recherché. Grâce à l'apprentissage par renforcement, ce scoring devient de plus en plus précis à chaque nouvel entretien, vous offrant une mesure fiable et comparable entre les candidats."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Matching prédictif avancé",
      description: "Ne recrutez pas seulement pour les compétences, recrutez pour la culture. Nos algorithmes d'IA prédictive ne se contentent pas de croiser les données du CV et de l'entretien. Ils les comparent avec les profils de vos meilleurs employés et les valeurs de votre entreprise pour calculer un taux de compatibilité culturelle et professionnelle. Recevez des recommandations automatiques de talents qui sont non seulement qualifiés, mais faits pour s'épanouir chez vous."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Tableau de bord RH intelligent",
      description: "Prenez des décisions basées sur des données, pas sur des intuitions. Votre tableau de bord centralise toutes les informations : statistiques de recrutement en temps réel, suivi des performances par offre, historique complet des entretiens, et analyse des tendances comportementales de votre bassin de candidats. Exportez facilement des rapports riches en PDF, Excel ou intégrez-les à vos systèmes RH existants via notre API."
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "Apprentissage continu (LLM)",
      description: "Clara.ai est une intelligence qui grandit avec vous. Elle apprend de chaque décision de recrutement que vous prenez pour affiner son propre jugement. Son cœur est un Large Language Model (LLM) spécifiquement entraîné pour le contexte africain, capable de comprendre et d'interagir dans plusieurs langues comme le Français, l'Anglais, le Lingala et le Swahili. Cela garantit une évaluation juste et pertinente, quel que soit le profil du candidat."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Sécurité et Éthique",
      description: "La confiance est notre fondement. Nous garantissons la sécurité de vos données avec un chiffrement de bout en bout (SSL/TLS) et une conformité totale au RGPD. Pour renforcer la souveraineté des données, nous privilégions un stockage sur des serveurs cloud africains et internationaux sécurisés. Et nous n'oublions jamais notre principe fondamental : l'IA est un outil d'aide à la décision. La décision finale de recruter vous appartiendra toujours."
    },
  ];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
       <header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/try">
            <Button>Essayer</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">Se connecter</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
            <AnimatedOnScroll animation="fade-in" className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Retour à l'accueil
            </Link>
            </AnimatedOnScroll>
            <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-headline text-center mb-4">Les Fonctionnalités de <span className="text-accent">Clara</span><span className="text-primary">.ai</span></h1>
                <p className="text-muted-foreground max-w-3xl mx-auto text-lg">Allez au-delà du CV. Découvrez en détail le vrai potentiel de chaque candidat avant même le premier appel.</p>
            </AnimatedOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <AnimatedOnScroll key={index} animation="fade-in" delay={index * 100}>
                  <Card className="text-center p-6 border-primary/20 bg-card/80 shadow-glow-primary-sm hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                    <CardHeader className="flex items-center justify-center">
                        {feature.icon}
                    </CardHeader>
                    <CardContent className="space-y-2 flex-1 flex flex-col justify-start text-left">
                        <CardTitle className="font-headline text-xl text-center">{feature.title}</CardTitle>
                        <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedOnScroll>
            ))}
            </div>
        </div>
      </main>

      <footer className="p-8 border-t border-primary/20 bg-background/50 mt-20">
           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <Logo />
                    <p className="text-muted-foreground mt-4 text-sm">L'assistante RH moderne pour un recrutement plus juste et efficace.</p>
                </div>
                <div>
                     <h3 className="font-headline text-lg text-primary mb-4">Navigation</h3>
                     <ul className="space-y-2">
                         <li><Link href="/features" className="text-muted-foreground hover:text-primary">Fonctionnalités</Link></li>
                         <li><Link href="/try" className="text-muted-foreground hover:text-primary">Tarifs</Link></li>
                         <li><Link href="/login" className="text-muted-foreground hover:text-primary">Se connecter</Link></li>
                         <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Politique d'utilisation</Link></li>
                         <li><Link href="/legal-notice" className="text-muted-foreground hover:text-primary">Mentions légales</Link></li>
                         <li><Link href="/cookies" className="text-muted-foreground hover:text-primary">Cookies</Link></li>
                         <li><Link href="/partners" className="text-muted-foreground hover:text-primary">Partenaires</Link></li>
                         <li><Link href="/developers" className="text-muted-foreground hover:text-primary">Pour les développeurs (nos api)</Link></li>
                     </ul>
                </div>
                 <div>
                    <h3 className="font-headline text-lg text-primary mb-4">Suivez-nous</h3>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <Link href="#"><Twitter className="text-muted-foreground hover:text-primary"/></Link>
                        <Link href="#"><Linkedin className="text-muted-foreground hover:text-primary"/></Link>
                        <Link href="#"><Facebook className="text-muted-foreground hover:text-primary"/></Link>
                    </div>
                </div>
           </div>
           <div className="mt-8 pt-8 border-t border-primary/10 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} <span className="text-accent">Clara</span><span className="text-primary">.ai</span> - Tous droits réservés.</p>
                <p>Une innovation de <a href="http://www.ybs-innovate.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ybs-innovate</a></p>
           </div>
      </footer>
    </div>
  );
}
