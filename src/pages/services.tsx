import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, GraduationCap, Handshake, CheckCircle, Building2, UserCheck } from "lucide-react";
import Image from "next/image";

export default function Services() {
  return (
    <>
      <SEO 
        title="Nos Services - HR Talents Partners"
        description="Découvrez nos services RH en Côte d'Ivoire : Recrutement, Analyse salariale, Team building et Formation professionnelle."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
              alt="Services RH"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Nos Services
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Votre Partenaire RH de <span className="text-accent">Confiance</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Accompagnement personnalisé pour entreprises et professionnels ivoiriens
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos Expertises RH</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des solutions complètes pour transformer vos ambitions en réalités
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Recrutement */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                      alt="Recrutement"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Users className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Recrutement</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Notre méthode signature en 3 temps garantit des recrutements précis et durables en Côte d'Ivoire.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Méthode en 3 temps : définition, recherche, sélection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Accompagnement personnalisé jusqu'à l'intégration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Garantie de fidélisation exclusive</span>
                      </li>
                    </ul>
                    <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                      <Link href="/services/entreprises">
                        En savoir plus <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Analyse Salariale */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                      alt="Analyse salariale"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Target className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Analyse Salariale</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Premier cabinet à publier un Guide des Salaires en Côte d'Ivoire avec vision 360° du marché.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Collecte de données via entretiens directs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Analyse sectorielle pointue du marché ivoirien</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Benchmarking complet des politiques salariales</span>
                      </li>
                    </ul>
                    <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                      <Link href="/services/entreprises">
                        En savoir plus <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Team Building */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                      alt="Team building"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Handshake className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Team Building</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Expériences sur mesure adaptées à votre culture et objectifs pour renforcer vos équipes.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Activités personnalisées selon votre culture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Animation professionnelle et engageante</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Performance mesurable avec KPIs concrets</span>
                      </li>
                    </ul>
                    <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                      <Link href="/services/entreprises">
                        En savoir plus <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formation */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                      alt="Formation"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <GraduationCap className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Formation</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Développez les compétences de vos talents avec nos formations taillées pour le terrain ivoirien.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Leadership, prise de parole, IA, gestion de projet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Formations pratiques adaptées au contexte local</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Certification en fin de parcours</span>
                      </li>
                    </ul>
                    <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                      <Link href="/services/entreprises">
                        En savoir plus <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services par Cible */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Services par Profil</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des solutions adaptées à vos besoins spécifiques
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Pour les Entreprises */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Building2 className="text-accent" size={40} />
                  </div>
                  <h3 className="font-serif text-3xl font-semibold">Pour les Entreprises</h3>
                  <p className="text-muted-foreground">
                    Trouvez les talents qui transformeront votre vision en succès
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Recrutement de cadres et profils spécialisés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Conseil en gestion RH et politiques salariales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Développement des compétences de vos équipes</span>
                    </li>
                  </ul>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/services/entreprises">
                      Découvrir nos solutions <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pour les Candidats */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <UserCheck className="text-accent" size={40} />
                  </div>
                  <h3 className="font-serif text-3xl font-semibold">Pour les Candidats</h3>
                  <p className="text-muted-foreground">
                    Trouvez le poste qui correspond à vos aspirations et talents
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Accès aux meilleures opportunités en Côte d'Ivoire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Accompagnement personnalisé dans votre recherche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Formations pour booster votre employabilité</span>
                    </li>
                  </ul>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/services/candidats">
                      Trouver mon opportunité <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
          <div className="container relative text-center space-y-8 text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à transformer vos ambitions en réalités ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins RH en Côte d'Ivoire
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/contact">
                  Nous contacter <ArrowRight className="ml-2" size={20} />
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