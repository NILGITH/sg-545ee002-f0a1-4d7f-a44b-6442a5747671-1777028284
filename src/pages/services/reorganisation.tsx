import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, TrendingUp, CheckCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ReorganisationService() {
  return (
    <>
      <SEO 
        title="Réorganisation & Structuration | HR Talents Partners"
        description="Anticipez, structurez et transformez votre organisation avec notre accompagnement en conduite du changement."
      />
      
      <Navigation />
      
      <main>
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-primary/90 z-10"></div>
          </div>
          <div className="container relative z-20 text-white space-y-6">
            <Button asChild variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 mb-6">
              <Link href="/services">
                <ArrowLeft size={18} className="mr-2" />
                Retour aux services
              </Link>
            </Button>
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Expertise
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl">
              Réorganisation & Structuration
            </h1>
            <p className="text-xl text-white/90 max-w-2xl italic">
              Anticiper, structurer et transformer votre organisation
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Les organisations sont vivantes et doivent constamment s'adapter à leur environnement. Que ce soit pour accompagner une forte croissance, intégrer une acquisition ou optimiser vos processus, nous vous accompagnons dans la structuration de votre capital humain.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <TrendingUp className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Design Organisationnel</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Diagnostic et analyse de performance organisationnelle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Refonte des organigrammes et structures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Redéfinition et clarification des rôles et responsabilités</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Optimisation des processus RH et opérationnels</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <TrendingUp className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Conduite du Changement</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Stratégie d'accompagnement et plan de communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Mobilisation de l'encadrement et gestion des résistances</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Accompagnement social (PSE, fusions, acquisitions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Ancrage des nouvelles pratiques et mesure des résultats</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-8 rounded-xl border border-border mt-12 text-center">
                <h3 className="font-serif text-2xl font-bold mb-4">Un projet de transformation ?</h3>
                <p className="mb-8">Nos experts vous accompagnent pour sécuriser vos transitions et garantir l'adhésion de vos équipes.</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Parler à un expert <ArrowRight className="ml-2" size={20} /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}