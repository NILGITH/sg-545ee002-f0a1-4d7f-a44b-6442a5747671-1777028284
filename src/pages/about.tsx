import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Target, Award, Users, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <>
      <SEO
        title="À propos - HR Talents Partners"
        description="Découvrez l'histoire et les valeurs de HR Talents Partners, premier cabinet de recrutement et conseil RH en Côte d'Ivoire." />
      
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
              alt="À propos"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Qui sommes-nous ?
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Ambassadeur de <span className="text-accent">Talents</span> et d'<span className="text-accent">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Nous incarnons une vision ambitieuse et une quête incessante d'excellence, visant à vous accompagner dans l'élaboration et la mise en œuvre de stratégies avancées en gestion des ressources humaines
            </p>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Qui sommes-nous ?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    HR TALENTS PARTNERS est né d'une ambition partagée : celle de transformer les Ressources Humaines en un levier stratégique de performance et d'innovation au sein des organisations.
                  </p>
                  <p className="text-lg">
                    Fondé par des experts en gestion des talents, en développement organisationnel et en stratégie RH, notre cabinet s'est rapidement imposé comme un acteur incontournable dans l'accompagnement des entreprises, des PME aux grands groupes, dans leur gestion des ressources humaines.
                  </p>
                  <p className="text-lg">
                    À travers une approche humaine et innovante, nous avons su accompagner nos clients dans leur évolution en intégrant les dernières tendances RH et en développant une expertise reconnue dans le recrutement, la formation et le conseil.
                  </p>
                  <p className="text-lg">
                    Aujourd'hui, notre équipe d'experts s'engage à aider les organisations à naviguer avec agilité dans un environnement en constante transformation, tout en plaçant le talent et l'excellence au cœur de chaque stratégie RH.
                  </p>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="/2147664377.jpg"
                  alt="Notre équipe à Abidjan"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos Valeurs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les valeurs qui guident notre projet
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Award className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Excellence</h3>
                  <p className="text-muted-foreground">
                    Nous plaçons la qualité au cœur de nos actions, en proposant des services rigoureusement pensés et exécutés pour répondre aux exigences les plus élevées
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <TrendingUp className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    Nous intégrons des outils de pointe et des approches modernes pour anticiper les mutations du marché et offrir des solutions avant-gardistes
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Users className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Proximité</h3>
                  <p className="text-muted-foreground">
                    Nous cultivons des relations authentiques et durables avec nos clients et partenaires, en étant à leur écoute pour co-construire des solutions adaptées
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Target className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Intégrité</h3>
                  <p className="text-muted-foreground">
                    Nos engagements sont guidés par l'éthique, la transparence et le respect de nos parties prenantes, créant un environnement fondé sur la confiance
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Award className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Impact</h3>
                  <p className="text-muted-foreground">
                    Nous visons à créer des transformations positives et mesurables pour nos clients, leurs équipes et leurs organisations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Notre Impact en Côte d'Ivoire</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des chiffres qui témoignent de notre engagement et de votre confiance
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">50 000+</div>
                <p className="text-muted-foreground">Talents dans notre réseau ivoirien</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">250+</div>
                <p className="text-muted-foreground">Entreprises accompagnées à Abidjan</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">15</div>
                <p className="text-muted-foreground">Experts en capital humain</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">8</div>
                <p className="text-muted-foreground">Années d'excellence en Côte d'Ivoire</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
          <div className="container relative text-center space-y-8 text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à rejoindre l'aventure ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Que vous soyez entreprise ou candidat en Côte d'Ivoire, nous avons une solution pour vous
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/contact">
                  Contactez-nous <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
                <Link href="/jobs">Voir les offres</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>);

}