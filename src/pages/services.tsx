import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, GraduationCap, Handshake, CheckCircle, Building2, UserCheck, X } from "lucide-react";
import Image from "next/image";

type ServiceModal = "recrutement" | "analyse" | "teambuilding" | "formation" | null;

export default function Services() {
  const [openModal, setOpenModal] = useState<ServiceModal>(null);

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
              src="/2149603484.jpg"
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
                      src="/2148190653.jpg"
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
                    <Button 
                      onClick={() => setOpenModal("recrutement")}
                      className="bg-accent hover:bg-accent/90 w-full"
                    >
                      En savoir plus <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Analyse Salariale */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/15685.jpg"
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
                    <Button 
                      onClick={() => setOpenModal("analyse")}
                      className="bg-accent hover:bg-accent/90 w-full"
                    >
                      En savoir plus <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Team Building */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/21178.jpg"
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
                    <Button 
                      onClick={() => setOpenModal("teambuilding")}
                      className="bg-accent hover:bg-accent/90 w-full"
                    >
                      En savoir plus <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formation */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/2149300718.jpg"
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
                    <Button 
                      onClick={() => setOpenModal("formation")}
                      className="bg-accent hover:bg-accent/90 w-full"
                    >
                      En savoir plus <ArrowRight className="ml-2" size={20} />
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

      {/* Modals pour chaque service */}
      {/* Modal Recrutement */}
      <Dialog open={openModal === "recrutement"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl mb-4">Recrutement Stratégique</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              <div className="space-y-6">
                <p className="text-lg">
                  Notre méthode en 3 temps garantit des recrutements précis, durables et parfaitement alignés avec votre culture d'entreprise.
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Étape 1 : Définition du Besoin</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Analyse approfondie de votre organisation et culture d'entreprise</li>
                    <li>Identification précise des compétences techniques et soft skills requis</li>
                    <li>Définition du profil idéal en collaboration avec vos équipes</li>
                    <li>Établissement des critères de sélection et grille d'évaluation</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Étape 2 : Recherche Active</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Chasse de têtes ciblée dans notre réseau de 50 000+ talents ivoiriens</li>
                    <li>Sourcing multi-canal : LinkedIn, plateformes professionnelles, réseau direct</li>
                    <li>Approche discrète et personnalisée des candidats potentiels</li>
                    <li>Pré-qualification rigoureuse selon vos critères</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Étape 3 : Sélection & Intégration</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Entretiens structurés avec évaluation des compétences techniques</li>
                    <li>Tests de personnalité et assessment centers si nécessaire</li>
                    <li>Présentation d'une short-list de 3-5 candidats qualifiés</li>
                    <li>Accompagnement lors des entretiens finaux</li>
                    <li>Support à l'intégration pendant la période d'essai</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-lg mb-2">🎯 Garantie de Fidélisation</h3>
                  <p>
                    Nous offrons une garantie exclusive de remplacement gratuit si le candidat ne donne pas satisfaction pendant la période d'essai. Votre succès est notre priorité.
                  </p>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/contact">Discuter de vos besoins en recrutement</Link>
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Modal Analyse Salariale */}
      <Dialog open={openModal === "analyse"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl mb-4">Analyse Salariale & Benchmarking</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              <div className="space-y-6">
                <p className="text-lg">
                  Pionniers de l'intelligence RH en Côte d'Ivoire, nous avons publié le premier Guide des Salaires du pays, offrant une vision 360° des tendances salariales du marché ivoirien.
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Notre Méthodologie</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong>Collecte de données confidentielles</strong> via des entretiens directs avec plus de 5 000 professionnels clés</li>
                    <li><strong>Analyse sectorielle pointue</strong> adaptée aux réalités du marché ivoirien</li>
                    <li><strong>Benchmarking complet</strong> des politiques salariales et avantages compétitifs</li>
                    <li><strong>Mise à jour annuelle</strong> pour refléter l'évolution du marché</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Ce que Contient Notre Guide</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>20+ index salariaux par secteur d'activité et niveau d'expérience</li>
                    <li>Grilles salariales détaillées pour 150+ postes clés</li>
                    <li>Analyse des avantages sociaux et packages compétitifs</li>
                    <li>Tendances d'évolution salariale et prévisions</li>
                    <li>Comparaisons régionales Abidjan vs autres villes de CI</li>
                    <li>Insights sur les pratiques de rémunération variable</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Services Personnalisés</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Audit de votre grille salariale actuelle</li>
                    <li>Recommandations stratégiques pour attirer et retenir les talents</li>
                    <li>Étude comparative avec vos concurrents directs</li>
                    <li>Conseil sur la structuration de packages de rémunération globale</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-lg mb-2">📊 Chiffres Clés</h3>
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div>
                      <div className="text-2xl font-bold text-accent">5000+</div>
                      <div className="text-sm">Répondants</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">20</div>
                      <div className="text-sm">Index publiés</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">CI</div>
                      <div className="text-sm">Marché couvert</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/contact">Obtenir le Guide des Salaires</Link>
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Modal Team Building */}
      <Dialog open={openModal === "teambuilding"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl mb-4">Team Building Sur Mesure</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              <div className="space-y-6">
                <p className="text-lg">
                  Créez des expériences mémorables qui renforcent la cohésion, stimulent la collaboration et alignent vos équipes sur vos objectifs stratégiques.
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Notre Approche Personnalisée</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong>Diagnostic initial</strong> : Analyse de votre culture d'entreprise et dynamiques d'équipe</li>
                    <li><strong>Co-création</strong> : Design d'activités adaptées à vos objectifs spécifiques</li>
                    <li><strong>Animation professionnelle</strong> : Facilitateurs expérimentés et engageants</li>
                    <li><strong>Débriefing structuré</strong> : Capitalisation sur les apprentissages</li>
                    <li><strong>Suivi post-événement</strong> : Mesure de l'impact avec KPIs concrets</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Types d'Activités</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">🎯 Challenges Collaboratifs</h4>
                      <p className="text-sm">Escape games, défis stratégiques, rallyes urbains à Abidjan</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">🏆 Compétitions Sportives</h4>
                      <p className="text-sm">Tournois, courses d'orientation, activités nautiques</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">🎨 Ateliers Créatifs</h4>
                      <p className="text-sm">Team cooking, création artistique, improvisation théâtrale</p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">💡 Séminaires Stratégiques</h4>
                      <p className="text-sm">Innovation workshops, planification collaborative</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Objectifs Mesurables</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>Renforcement de la communication inter-équipes</li>
                    <li>Développement de la confiance et de l'entraide</li>
                    <li>Stimulation de la créativité et de l'innovation</li>
                    <li>Amélioration du leadership et de la prise d'initiative</li>
                    <li>Alignement sur la vision et les valeurs de l'entreprise</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-lg mb-2">✨ Lieux d'Exception</h3>
                  <p>
                    Nous organisons vos événements dans les plus beaux sites de Côte d'Ivoire : resorts balnéaires de Grand-Bassam, espaces nature d'Assinie, hôtels premium d'Abidjan ou sites culturels uniques.
                  </p>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/services/team-building">Organiser mon Team Building</Link>
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Modal Formation */}
      <Dialog open={openModal === "formation"} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl mb-4">Formation Professionnelle</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              <div className="space-y-6">
                <p className="text-lg">
                  Développez les compétences stratégiques de vos talents avec nos formations pratiques, adaptées au contexte ivoirien et animées par des experts reconnus.
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Nos Modules de Formation</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-lg mb-2">👔 Leadership & Management</h4>
                      <ul className="text-sm space-y-1 ml-4 list-disc">
                        <li>Leadership inspirant et gestion d'équipe</li>
                        <li>Management situationnel et coaching</li>
                        <li>Gestion des conflits et médiation</li>
                        <li>Conduite du changement organisationnel</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-lg mb-2">🎤 Communication & Influence</h4>
                      <ul className="text-sm space-y-1 ml-4 list-disc">
                        <li>Prise de parole en public et storytelling</li>
                        <li>Communication interpersonnelle efficace</li>
                        <li>Techniques de négociation et persuasion</li>
                        <li>Présentation impactante et pitch</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-lg mb-2">🤖 Intelligence Artificielle & Digital</h4>
                      <ul className="text-sm space-y-1 ml-4 list-disc">
                        <li>IA appliquée aux RH et au business</li>
                        <li>Automatisation des processus métier</li>
                        <li>Data analytics pour la prise de décision</li>
                        <li>Transformation digitale de l'entreprise</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-lg mb-2">📊 Gestion de Projet</h4>
                      <ul className="text-sm space-y-1 ml-4 list-disc">
                        <li>Méthodologies Agile et Scrum</li>
                        <li>Planification et suivi de projet</li>
                        <li>Gestion des risques et des parties prenantes</li>
                        <li>Outils de pilotage de projet</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-lg mb-2">💼 Développement Personnel</h4>
                      <ul className="text-sm space-y-1 ml-4 list-disc">
                        <li>Gestion du temps et des priorités</li>
                        <li>Intelligence émotionnelle</li>
                        <li>Créativité et résolution de problèmes</li>
                        <li>Gestion du stress et résilience</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-accent">Notre Pédagogie</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li><strong>Formation-Action</strong> : 70% pratique, 30% théorie</li>
                    <li><strong>Études de cas locales</strong> : Situations réelles du marché ivoirien</li>
                    <li><strong>Jeux de rôle et simulations</strong> : Mise en pratique immédiate</li>
                    <li><strong>Coaching individuel</strong> : Accompagnement personnalisé</li>
                    <li><strong>Supports digitaux</strong> : Accès plateforme e-learning</li>
                  </ul>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-lg mb-2">🎓 Certification</h3>
                  <p>
                    À l'issue de chaque formation, les participants reçoivent un certificat reconnu attestant de leurs nouvelles compétences. Possibilité de formations diplômantes en partenariat avec des institutions accréditées.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Formats Disponibles</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="border border-accent/20 rounded p-3">
                      <div className="font-bold">Intra-entreprise</div>
                      <div className="text-sm text-muted-foreground">Dans vos locaux</div>
                    </div>
                    <div className="border border-accent/20 rounded p-3">
                      <div className="font-bold">Inter-entreprises</div>
                      <div className="text-sm text-muted-foreground">Sessions ouvertes</div>
                    </div>
                    <div className="border border-accent/20 rounded p-3">
                      <div className="font-bold">E-learning</div>
                      <div className="text-sm text-muted-foreground">100% en ligne</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full">
                    <Link href="/services/formation">Demander un catalogue de formations</Link>
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}