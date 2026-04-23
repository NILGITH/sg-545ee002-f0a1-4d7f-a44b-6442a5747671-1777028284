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
        description="Découvrez l'histoire et les valeurs de HR Talents Partners, cabinet de recrutement et conseil RH en Afrique de l'Ouest."
      />
      
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
              Ambassadeurs de <span className="text-accent">Talents</span> et d'<span className="text-accent">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Plus qu'un cabinet de recrutement, nous sommes vos partenaires stratégiques pour bâtir l'avenir de vos organisations
            </p>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Notre Histoire</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    Dans un marché africain en pleine croissance, HR Talents Partners crée des connexions privilégiées entre les entreprises visionnaires et les talents qui transforment leurs ambitions en réalité.
                  </p>
                  <p className="text-lg">
                    Depuis plus de 10 ans, nous avons accompagné plus de 500 entreprises et connecté plus de 50 000 talents à travers l'Afrique de l'Ouest. Notre expertise s'étend du recrutement stratégique au conseil RH, en passant par l'analyse salariale et le développement des compétences.
                  </p>
                  <p className="text-lg">
                    Basés à Abidjan, nous sommes reconnus comme le premier cabinet à avoir publié un Guide des Salaires en Côte d'Ivoire, au Sénégal et au Bénin, offrant ainsi une vision 360° des tendances du marché RH africain.
                  </p>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
                  alt="Notre équipe"
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
                Les principes qui guident chacune de nos actions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Target className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Excellence</h3>
                  <p className="text-muted-foreground">
                    Nous visons l'excellence dans chaque mission, chaque recrutement, chaque conseil
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Users className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Humanité</h3>
                  <p className="text-muted-foreground">
                    Au cœur de notre métier : les personnes, leurs aspirations, leur potentiel unique
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Award className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Intégrité</h3>
                  <p className="text-muted-foreground">
                    Transparence et honnêteté dans toutes nos relations, avec candidats et entreprises
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
                    Pionners de l'analyse RH en Afrique, nous innovons constamment pour vous servir mieux
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
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Notre Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des chiffres qui témoignent de notre engagement et de votre confiance
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">50 000+</div>
                <p className="text-muted-foreground">Talents dans notre réseau</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">500+</div>
                <p className="text-muted-foreground">Entreprises accompagnées</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">8</div>
                <p className="text-muted-foreground">Success stories majeures</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">10+</div>
                <p className="text-muted-foreground">Années d'expérience</p>
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
              Que vous soyez entreprise ou candidat, nous avons une solution pour vous
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
    </>
  );
}