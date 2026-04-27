import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Target, CheckCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ConseilRHService() {
  return (
    <>
      <SEO 
        title="Conseil RH & Audit Social | HR Talents Partners"
        description="Transformez votre fonction RH en levier stratégique avec nos services de conseil, audit social et GEPP."
      />
      
      <Navigation />
      
      <main>
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
          <div className="absolute inset-0">
            <Image
              src="/21178.jpg"
              alt="Conseil RH"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="container relative text-white space-y-6">
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
              Conseil RH · Audit Social · GEPP
            </h1>
            <p className="text-xl text-white/90 max-w-2xl italic">
              Transformer votre fonction RH en levier stratégique de croissance
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                Le rôle de la fonction RH a profondément évolué. Elle n'est plus simplement administrative, elle est le moteur stratégique de votre organisation. Nos consultants experts vous accompagnent dans la structuration, l'audit et l'optimisation de vos pratiques RH.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Audit RH & Social</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>État des lieux complet de vos pratiques RH</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Analyse du climat social et RPS</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Vérification de la conformité réglementaire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Recommandations et plan d'action priorisé</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Stratégie & GEPP</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Cartographie des emplois et compétences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Anticipation des besoins futurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Création de parcours d'évolution</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Mise en place de politiques RH adaptées</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-8 rounded-xl border border-border mt-12 text-center">
                <h3 className="font-serif text-2xl font-bold mb-4">Besoin d'un accompagnement personnalisé ?</h3>
                <p className="mb-8">Contactez nos experts pour discuter de vos enjeux RH actuels.</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Demander un audit <ArrowRight className="ml-2" size={20} /></Link>
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