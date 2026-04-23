import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, Award, TrendingUp, CheckCircle, Briefcase, GraduationCap, Handshake, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <>
      <SEO 
        title="HR Talents Partners - Ambassadeur de Talents et d'Excellence"
        description="Agence de recrutement et conseil RH de référence. Nous accompagnons les entreprises et candidats vers l'excellence."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-muted py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in duration-1000">
              <div className="inline-block border-2 border-primary px-6 py-3 mb-4">
                <span className="font-serif text-sm md:text-base font-semibold uppercase tracking-wider">
                  Ambassadeur de Talents et d'Excellence
                </span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Connecter les Talents aux{" "}
                <span className="text-accent">Opportunités</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                HR Talents Partners accompagne les entreprises et les professionnels dans leur quête d'excellence. 
                Expert en recrutement, conseil RH et développement des talents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  <Link href="/jobs">
                    Découvrir les offres <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.1s" }}>
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">500+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Entreprises accompagnées</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">2000+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Candidats placés</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.3s" }}>
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">95%</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Taux de satisfaction</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.4s" }}>
                <div className="text-4xl md:text-5xl font-bold font-serif text-accent">10+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Années d'expérience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des solutions RH complètes pour accompagner votre réussite
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Recrutement</h3>
                  <p className="text-muted-foreground">
                    Identification et sélection des meilleurs talents pour vos postes clés. 
                    Processus rigoureux et personnalisé.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Conseil RH</h3>
                  <p className="text-muted-foreground">
                    Stratégie RH, optimisation des processus, gestion des talents. 
                    Expertise adaptée à vos enjeux.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Formation</h3>
                  <p className="text-muted-foreground">
                    Programmes de formation sur mesure pour développer les compétences de vos équipes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Handshake className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Accompagnement</h3>
                  <p className="text-muted-foreground">
                    Coaching carrière, bilan de compétences, transition professionnelle. 
                    Accompagnement personnalisé.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold">
                  Pourquoi choisir HR Talents Partners ?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Notre expertise et notre engagement font la différence dans chaque mission.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Expertise sectorielle approfondie</h4>
                      <p className="text-muted-foreground">
                        Connaissance pointue des métiers et enjeux de chaque secteur d'activité.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Approche personnalisée</h4>
                      <p className="text-muted-foreground">
                        Chaque client bénéficie d'un accompagnement sur mesure adapté à ses besoins.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Réseau étendu de talents</h4>
                      <p className="text-muted-foreground">
                        Accès à un vivier de candidats qualifiés et pré-sélectionnés.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Processus rigoureux et transparent</h4>
                      <p className="text-muted-foreground">
                        Méthodologie éprouvée garantissant qualité et efficacité à chaque étape.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Pour les entreprises</h4>
                        <p className="text-muted-foreground">
                          Trouvez les talents qui feront grandir votre organisation. 
                          Recrutement, conseil et formation.
                        </p>
                        <Button asChild variant="link" className="text-accent px-0 mt-2">
                          <Link href="/services/entreprises">
                            En savoir plus <ArrowRight className="ml-1" size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Award className="text-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Pour les candidats</h4>
                        <p className="text-muted-foreground">
                          Donnez un nouvel élan à votre carrière. Accompagnement personnalisé 
                          et accès aux meilleures opportunités.
                        </p>
                        <Button asChild variant="link" className="text-accent px-0 mt-2">
                          <Link href="/services/candidats">
                            En savoir plus <ArrowRight className="ml-1" size={16} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Ils nous font confiance</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez les témoignages de nos clients satisfaits
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardContent className="pt-8 space-y-4">
                  <MessageSquare className="text-accent" size={32} />
                  <p className="text-muted-foreground italic">
                    "HR Talents Partners a su identifier le profil parfait pour notre poste de directeur commercial. 
                    Leur professionnalisme et leur réactivité sont remarquables."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Marie Dupont</p>
                    <p className="text-sm text-muted-foreground">DRH, Entreprise Tech Solutions</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-8 space-y-4">
                  <MessageSquare className="text-accent" size={32} />
                  <p className="text-muted-foreground italic">
                    "Grâce à leur accompagnement, j'ai trouvé un poste qui correspond parfaitement à mes aspirations. 
                    Un service de qualité et une écoute attentive."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Jean Kabamba</p>
                    <p className="text-sm text-muted-foreground">Manager Marketing</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="pt-8 space-y-4">
                  <MessageSquare className="text-accent" size={32} />
                  <p className="text-muted-foreground italic">
                    "Leur expertise en conseil RH nous a permis d'optimiser nos processus de recrutement. 
                    Un partenaire de confiance pour notre développement."
                  </p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold">Sophie Mukendi</p>
                    <p className="text-sm text-muted-foreground">CEO, Innovation Group</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground">
          <div className="container text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à franchir une nouvelle étape ?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez nos offres d'emploi ou contactez-nous pour discuter de vos besoins en recrutement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/jobs">
                  Voir les offres <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/contact">Contactez-nous</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}