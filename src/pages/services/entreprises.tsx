import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, Handshake, GraduationCap, CheckCircle, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function ServicesEntreprises() {
  return (
    <>
      <SEO 
        title="Services pour Entreprises - HR Talents Partners"
        description="Recrutement, conseil RH, analyse salariale et team building pour entreprises en Côte d'Ivoire."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
              alt="Services Entreprises"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Solutions RH Entreprises
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Transformez vos <span className="text-accent">ambitions</span> en succès durables
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Des solutions sur mesure pour attirer, développer et fidéliser les meilleurs talents en Côte d'Ivoire
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
              <Link href="/contact">
                Discuter de vos besoins <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </section>

        {/* Services Détaillés */}
        <section className="py-20 md:py-32">
          <div className="container space-y-24">
            {/* 1. Recrutement */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="text-accent" size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Recrutement</h2>
                <p className="text-lg text-muted-foreground">
                  Nous transformons vos besoins en success stories. Notre méthode signature en 3 temps garantit des recrutements précis et durables en Côte d'Ivoire.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Méthode en 3 temps</h3>
                      <p className="text-muted-foreground">Un rendez-vous initial pour cerner vos enjeux, une investigation approfondie du marché ivoirien, puis une sélection rigoureuse</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Accompagnement personnalisé</h3>
                      <p className="text-muted-foreground">Suivi jusqu'à l'intégration complète du candidat dans vos équipes</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Garantie de fidélisation</h3>
                      <p className="text-muted-foreground">Notre approche exclusive assure des recrutements durables</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/services-info.png"
                  alt="Recrutement"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 2. Analyse Salariale */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] order-2 lg:order-1">
                <Image
                  src="/salary-guide.png"
                  alt="Analyse Salariale"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Target className="text-accent" size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Analyse Salariale</h2>
                <p className="text-lg text-muted-foreground">
                  Premier cabinet à publier un Guide des Salaires en Côte d'Ivoire, offrant une vision 360° des tendances salariales du marché ivoirien.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Collecte de données rigoureuse</h3>
                      <p className="text-muted-foreground">Via des entretiens directs avec des professionnels clés à Abidjan</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Analyse sectorielle pointue</h3>
                      <p className="text-muted-foreground">Adaptée aux réalités du marché ivoirien et international</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Benchmarking complet</h3>
                      <p className="text-muted-foreground">Politiques salariales et avantages compétitifs en Côte d'Ivoire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Team Building */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Handshake className="text-accent" size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Team Building</h2>
                <p className="text-lg text-muted-foreground">
                  Nous ne nous contentons pas d'organiser des activités. Nous concevons des expériences sur mesure adaptées à votre culture d'entreprise et vos objectifs en Côte d'Ivoire.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Approche sur mesure</h3>
                      <p className="text-muted-foreground">Expériences adaptées à votre culture et vos enjeux spécifiques</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Performance mesurable</h3>
                      <p className="text-muted-foreground">Levier de performance à long terme avec KPIs concrets</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Résultats durables</h3>
                      <p className="text-muted-foreground">Impact mesurable sur la cohésion et l'engagement des équipes</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/team-info.png"
                  alt="Team Building"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* 4. Formation */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="Formation"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="text-accent" size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Formation</h2>
                <p className="text-lg text-muted-foreground">
                  Boostez vos compétences ! Nous ne recrutons pas les meilleurs talents : on les façonne pour l'avenir de la Côte d'Ivoire !
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Modules variés</h3>
                      <p className="text-muted-foreground">Leadership, prise de parole, IA, gestion de projet, insight discovery</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Formations terrain</h3>
                      <p className="text-muted-foreground">Taillées pour le terrain, animées par des experts locaux et internationaux</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Certification</h3>
                      <p className="text-muted-foreground">En fin de parcours pour booster votre CV et celui de vos équipes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
          <div className="container text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à transformer votre organisation ?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discutons de vos besoins et trouvons ensemble la solution adaptée à votre entreprise en Côte d'Ivoire
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/contact">
                  Demander un devis <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2">
                <Link href="/jobs">Publier une offre</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}