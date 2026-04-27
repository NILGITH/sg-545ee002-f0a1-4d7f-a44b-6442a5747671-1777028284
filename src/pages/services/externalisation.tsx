import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function ExternalisationService() {
  return (
    <>
      <SEO 
        title="Externalisation RH (RPO/BPO) | HR Talents Partners"
        description="Concentrez-vous sur votre cœur de métier en nous confiant tout ou partie de votre gestion RH (Paie, Recrutement RPO, Administration)."
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
              Externalisation RH (RPO/BPO)
            </h1>
            <p className="text-xl text-white/90 max-w-2xl italic">
              Concentrez-vous sur votre cœur de métier, nous gérons vos RH
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container max-w-5xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                L'externalisation de la fonction RH (Business Process Outsourcing) et du recrutement (Recruitment Process Outsourcing) vous permet de gagner en flexibilité, de réduire vos coûts fixes et de bénéficier d'une expertise pointue sans alourdir votre masse salariale.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Briefcase className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Externalisation Recrutement (RPO)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Prise en charge intégrale ou partielle de vos recrutements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Équipe dédiée implantée chez vous ou à distance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Optimisation de la marque employeur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Gestion des viviers et campagnes volumiques</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent/20">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Briefcase className="text-accent" size={24} />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-4">Administration & Gestion (BPO)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Gestion externalisée de la paie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Administration du personnel de l'entrée à la sortie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Reporting RH et tableaux de bord</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-1" size={18} />
                        <span>Assistance juridique et conformité sociale</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-8 rounded-xl border border-border mt-12 text-center">
                <h3 className="font-serif text-2xl font-bold mb-4">Simplifiez votre gestion RH</h3>
                <p className="mb-8">Découvrez comment nos solutions d'externalisation peuvent s'adapter à votre structure.</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Demander une proposition <ArrowRight className="ml-2" size={20} /></Link>
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