
'use client';

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Cpu, Gauge, Share2, FileSearch, BotMessageSquare, BrainCircuit, BarChart3, ShieldCheck, TrendingUp, Users, Languages } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { AnimatedOnScroll } from "@/components/ui/animated-on-scroll";
import { TypingTitle } from "@/components/ui/typing-title";
import { WorkflowDiagram } from "@/components/landing/workflow-diagram";

export default function LandingPage() {

  const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-primary" />,
      title: "Analyse et tri intelligent des CV",
      description: "Traitement jusqu'à 1 million de CV en 3 secondes, filtrage contextuel et détection d'incohérences."
    },
    {
      icon: <BotMessageSquare className="h-10 w-10 text-primary" />,
      title: "Entretien automatisé et interactif",
      description: "Interviews vidéo avec questions dynamiques et apprentissage adaptatif."
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      title: "Analyse neurocognitive",
      description: "Étude des micro-expressions et signaux comportementaux pour un profil psychométrique complet."
    },
    {
      icon: <Gauge className="h-10 w-10 text-primary" />,
      title: "Scoring cognitif et émotionnel",
      description: "Notation intelligente (0–100) basée sur la cohérence, la confiance et l'adéquation au poste."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Matching prédictif avancé",
      description: "Algorithmes prédictifs pour détecter la compatibilité culturelle et professionnelle."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Tableau de bord RH intelligent",
      description: "Vue centralisée en temps réel des statistiques avec exportations de rapports."
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" />,
      title: "Apprentissage continu (LLM)",
      description: "Clara.ai apprend de chaque recrutement et intègre un moteur LLM multilingue."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Sécurité et Éthique",
      description: "Chiffrement complet, conformité RGPD, et la décision finale reste humaine."
    },
  ];

  const steps = [
    {
        step: "01",
        title: "Créez et Optimisez Votre Offre",
        description: "Définissez le poste et laissez notre IA optimiser la description pour attirer les profils les plus pertinents."
    },
    {
        step: "02",
        title: "Diffusez l'Offre Massivement",
        description: "Partagez votre offre en un clic sur les réseaux sociaux, votre site carrière, ou publiez-la sur notre portail d'offres pour une visibilité maximale."
    },
    {
        step: "03",
        title: "Présélection Instantanée des CV",
        description: "À chaque nouvelle candidature, Clara.ai analyse et retient automatiquement les CV qui correspondent à vos compétences et mots-clés."
    },
    {
        step: "04",
        title: "Configurez l'Entretien Vidéo Personnalisé",
        description: "Créez un entretien pour les candidats présélectionnés. Définissez vos questions ou laissez Clara les générer pour vous, en s'adaptant aux réponses pour approfondir l'analyse."
    },
    {
        step: "05",
        title: "Invitez les Candidats à leur Rythme",
        description: "Partagez le lien de l'entretien par e-mail ou QR code. Le candidat le passe où et quand il veut, depuis vos locaux ou de chez lui."
    },
    {
        step: "06",
        title: "Recevez une Analyse Multi-Dimensionnelle",
        description: "Clara.ai décode le langage et les micro-expressions pour produire un rapport complet avec scoring cognitif, analyse neuro-intuitive et matching prédictif."
    },
    {
        step: "07",
        title: "Prenez la Décision Finale Éclairée",
        description: "Grâce à des données objectives, identifiez les meilleurs talents et invitez-les pour l'entretien final. Vous décidez, avec les meilleures informations en main."
    }
  ]

  const testimonials = [
      {
          name: "Sophie Dubois",
          role: "DRH @ TechInnov",
          avatar: "https://picsum.photos/seed/sophie/100/100",
          comment: "Clara.ai a divisé notre temps de présélection par trois. L'analyse IA est bluffante de précision et nous permet de nous concentrer sur l'humain lors des entretiens finaux."
      },
      {
          name: "Marc-Antoine Lemoine",
          role: "CEO @ StartupBoost",
          avatar: "https://picsum.photos/seed/marc/100/100",
          comment: "En tant que startup, chaque recrutement est critique. Clara.ai nous a aidés à identifier des candidats qui sont non seulement compétents, mais qui correspondent vraiment à notre culture d'entreprise."
      }
  ]

  const faqs = [
      {
          question: "Comment l'IA garantit-elle l'objectivité ?",
          answer: "Notre IA est entraînée sur des milliers de points de données et est conçue pour ignorer les biais inconscients liés au genre, à l'origine ou à l'apparence. Elle se concentre uniquement sur les compétences linguistiques, sémantiques et comportementales mesurables."
      },
      {
          question: "Les données de mon entreprise sont-elles en sécurité ?",
          answer: "Absolument. La sécurité est notre priorité. Toutes les données sont chiffrées de bout en bout et hébergées sur des serveurs sécurisés conformes aux normes les plus strictes (RGPD). Vous gardez le contrôle total de vos informations."
      },
      {
          question: "Clara.ai remplace-t-elle les recruteurs ?",
          answer: "Non, Clara.ai est un outil d'aide à la décision. Elle est conçue pour augmenter les capacités des recruteurs, pas pour les remplacer. Elle automatise les tâches répétitives pour que vous puissiez vous concentrer sur ce qui compte le plus : l'interaction humaine avec les meilleurs talents."
      }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/try">
                <Button className="animate-pulse-scale">Essayer</Button>
            </Link>
        </div>
      </header>
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center text-center relative overflow-hidden bg-grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
            <AnimatedOnScroll animation="fade-in" className="z-10 flex flex-col items-center gap-6 max-w-4xl px-4">
                <h1 className="text-4xl md:text-7xl font-headline font-bold">
                    Le Recrutement, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Réinventé par l'IA.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                    <span className="text-accent">Clara</span><span className="text-primary">.ai</span> transforme votre processus de recrutement avec des entretiens vidéo analysés par l'IA, un scoring intelligent et une présélection automatisée. Recrutez mieux, plus vite.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link href="/try">
                        <Button size="lg" className="text-lg">Commencer Gratuitement</Button>
                    </Link>
                    <Link href="/features">
                        <Button size="lg" variant="outline" className="text-lg">Découvrir</Button>
                    </Link>
                </div>
            </AnimatedOnScroll>
        </section>

        {/* Presentation Section */}
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center">
                    <TypingTitle 
                        titles={[
                            "Qu'est-ce que Clara.ai ?",
                            "What is Clara.ai?",
                            "Clara.ai ezali nini?",
                            "Clara.ai ni nini?",
                            "Clara.ai nshi?",
                            "Nki i Clara.ai?",
                            "Kí ni Clara.ai?",
                        ]}
                        className="text-4xl font-headline text-center mb-4 text-primary"
                    />
                    <p className="text-lg text-muted-foreground">
                        <span className="text-accent">Clara</span><span className="text-primary">.ai</span> n'est pas juste un outil, c'est votre nouvelle assistante RH virtuelle, dotée d'une intelligence artificielle de pointe. Elle a été conçue pour automatiser les tâches les plus chronophages du recrutement tout en fournissant des analyses profondes et objectives que l'œil humain ne peut déceler. En allant au-delà du CV, <span className="text-accent">Clara</span><span className="text-primary">.ai</span> vous permet de découvrir le véritable potentiel de chaque candidat, d'identifier les soft skills et d'assurer une parfaite adéquation culturelle. C'est la promesse d'un recrutement plus juste, plus rapide et infiniment plus intelligent.
                    </p>
                </AnimatedOnScroll>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                <h2 className="text-4xl font-headline text-center mb-4">Pourquoi choisir <span className="text-accent">Clara</span><span className="text-primary">.ai</span> ?</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">Allez au-delà du CV. Découvrez le vrai potentiel de chaque candidat avant même le premier appel.</p>
            </AnimatedOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedOnScroll key={index} animation="fade-in" delay={index * 100}>
                  <Card className="text-center p-6 border-primary/20 bg-card/80 shadow-glow-primary-sm hover:border-primary/50 hover:shadow-glow-primary hover:-translate-y-2 transition-all duration-300 h-full">
                    <CardHeader className="flex items-center justify-center">
                      {feature.icon}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedOnScroll>
              ))}
            </div>
             <AnimatedOnScroll animation="fade-in" className="text-center mt-12">
                <Link href="/features">
                    <Button variant="outline" size="lg">Voir toutes les fonctionnalités</Button>
                </Link>
            </AnimatedOnScroll>
          </div>
        </section>

        {/* Workflow Diagram Section */}
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-16">
                    <h2 className="text-4xl font-headline text-center mb-4">Notre Processus en Action</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">Visualisez comment <span className="text-accent">Clara</span><span className="text-primary">.ai</span> transforme chaque étape de votre recrutement.</p>
                </AnimatedOnScroll>
                <WorkflowDiagram />
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                    <h2 className="text-4xl font-headline text-center mb-4">Simple comme 1, 2, 3, 4, 5, 6, 7</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">Un processus fluide pour une efficacité maximale.</p>
                </AnimatedOnScroll>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                    {steps.map((item, index) => (
                        <AnimatedOnScroll key={item.step} animation={index % 2 === 0 ? "slide-in-from-left" : "slide-in-from-right"} delay={index * 100}>
                            <div className="flex gap-6 items-start">
                                <div className="font-headline text-6xl text-primary/30 font-bold -mt-2">{item.step}</div>
                                <div>
                                    <h3 className="font-headline text-xl mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        </AnimatedOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-background">
            <div className="max-w-4xl mx-auto">
                <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                    <h2 className="text-4xl font-headline text-center mb-4 text-primary">Ils nous font confiance</h2>
                </AnimatedOnScroll>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <AnimatedOnScroll key={testimonial.name} animation="fade-in" delay={index * 200}>
                            <Card className="p-6 bg-card/80 border-accent/20 shadow-glow-accent-sm">
                                <CardContent className="p-0">
                                    <p className="mb-6 text-muted-foreground italic">"{testimonial.comment}"</p>
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={testimonial.avatar} data-ai-hint="person face" />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-accent">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedOnScroll>
                    ))}
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <AnimatedOnScroll animation="slide-in-from-bottom" className="text-center mb-12">
                    <h2 className="text-4xl font-headline text-center mb-4 text-primary">Questions Fréquentes</h2>
                </AnimatedOnScroll>
                <AnimatedOnScroll animation="fade-in">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg font-semibold hover:text-primary text-left">{faq.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </AnimatedOnScroll>
            </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 text-center">
            <AnimatedOnScroll animation="fade-in" className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl font-headline mb-4">Prêt à transformer votre recrutement ?</h2>
                <p className="text-muted-foreground mb-8">Rejoignez les entreprises qui recrutent plus intelligemment.</p>
                 <Link href="/try">
                    <Button size="lg" className="text-lg">Créez votre compte gratuitement</Button>
                </Link>
            </AnimatedOnScroll>
        </section>
      </main>

       <footer className="p-8 border-t border-primary/20 bg-background/50">
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
  )
}
