import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, GraduationCap, Handshake, CheckCircle, Building2, UserCheck, Briefcase, TrendingUp, Brain, FileText } from "lucide-react";
import Image from "next/image";

export default function Services() {
  return (
    <>
      <SEO 
        title="Nos Services - HR Talents Partners"
        description="Découvrez nos 7 domaines d'expertise RH en Côte d'Ivoire : Recrutement 360°, Formation, Conseil RH, Team building, Coaching, Externalisation et Réorganisation."
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
                Nos Domaines d'Expertise
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Sept pôles d'<span className="text-accent">excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Des solutions sur mesure pour chaque enjeu
            </p>
          </div>
        </section>

        {/* Services Overview - Les 7 domaines */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos 7 Domaines d'Expertise</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des interventions qui structurent, renforcent et transforment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* 1. Recrutement 360° */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/2148190653.jpg"
                      alt="Recrutement 360°"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Users className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Recrutement 360° — De A à Z</h3>
                    </div>
                    <p className="text-muted-foreground italic">
                      De l'élaboration du besoin à l'intégration réussie
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Analyse stratégique du poste : enjeux, missions, profil cible et culture fit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Sourcing multicanal : chasse directe + vivier de 1 000+ candidats pré-qualifiés</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Évaluation approfondie : compétences, soft skills, potentiel leadership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Shortlists d'exception argumentées · Accompagnement décisionnel complet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Suivi post-intégration à 30, 60 et 90 jours pour sécuriser la prise de poste</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Formation Professionnelle */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/2149300718.jpg"
                      alt="Formation Professionnelle"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <GraduationCap className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Formation Professionnelle</h3>
                    </div>
                    <p className="text-muted-foreground italic">
                      Des parcours transformatifs, pas de simples formations
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Ingénierie pédagogique 100% sur mesure après analyse fine des besoins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Leadership & management avancé · Intelligence émotionnelle & soft skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Gestion du changement · Communication de dirigeant · Certifications métiers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Formats : présentiel, e-learning, blended learning, coaching intégré</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Évaluation d'impact et mesure du ROI à l'issue de chaque programme</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Conseil RH · Audit Social · GEPP */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/21178.jpg"
                      alt="Conseil RH"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Target className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Conseil RH · Audit Social · GEPP</h3>
                    </div>
                    <p className="text-muted-foreground italic">
                      Transformer votre fonction RH en levier stratégique
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Audit RH global : pratiques, forces, risques et plan d'action priorisé</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Audit social : climat, bien-être, risques psychosociaux (RPS), conformité réglementaire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>GEPP : cartographie des compétences, plans de développement, anticipation des besoins futurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Politiques RH stratégiques · Déploiement SIRH · Mise en conformité juridique</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 4. Teambuilding & Cohésion */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-6">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src="/89675.jpg"
                      alt="Teambuilding"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Handshake className="text-accent" size={28} />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold">Teambuilding & Cohésion d'Équipe</h3>
                    </div>
                    <p className="text-muted-foreground italic">
                      Libérer le potentiel collectif de vos équipes
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Diagnostic des dynamiques d'équipe et du climat organisationnel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Séminaires de cohésion · Ateliers de leadership collectif</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Gestion des conflits et médiation professionnelle</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                        <span>Co-construction de la culture d'entreprise · Programmes immersifs sur mesure</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Les 3 autres services en grille de 3 */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* 5. Coaching Professionnel */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Brain className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Coaching Professionnel</h3>
                  <p className="text-muted-foreground text-sm italic">
                    Vous confronté à des situations complexes ?
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Coaching exécutif & dirigeant : vision, décision, posture leader</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Coaching de prise de poste et transition managériale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Développement du leadership authentique et situationnel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Gestion de la pression, du stress, des situations de crise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Coaching d'équipe · Bilan de compétences</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 6. Externalisation RH */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Briefcase className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Externalisation RH (RPO/BPO)</h3>
                  <p className="text-muted-foreground text-sm italic">
                    Concentrez-vous sur votre cœur de métier
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Administration du personnel · Gestion de la paie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Recrutement externalisé (RPO) : intégral ou partiel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Relations sociales et gestion des IRP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Gestion des carrières et plans de succession</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Reporting RH et tableaux de bord décisionnels</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 7. Réorganisation & Structuration */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Réorganisation & Structuration</h3>
                  <p className="text-muted-foreground text-sm italic">
                    Anticiper, structurer et transformer
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Diagnostic organisationnel et analyse de performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Refonte des organigrammes · Redéfinition des rôles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Conduite du changement : communication et adhésion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={14} />
                      <span>Plans de sauvegarde de l'emploi · Restructuration sociale</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Notre Méthodologie */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Notre Méthodologie</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto italic">
                « La précision du diagnostic détermine la qualité de la solution. L'engagement jusqu'à la fin détermine la réalité du résultat. »
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto font-serif text-2xl font-bold">
                    01
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">ANALYSER</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Immersion dans votre réalité : entretiens approfondis, analyse documentaire, cartographie des enjeux RH.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto font-serif text-2xl font-bold">
                    02
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">CONCEVOIR</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Solutions 100% sur mesure, co-construites et validées avec vous. Jamais standardisé. Toujours pertinent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto font-serif text-2xl font-bold">
                    03
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">EXÉCUTER</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Déploiement rigoureux avec KPIs définis en amont, jalons précis et communication transparente.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mx-auto font-serif text-2xl font-bold">
                    04
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">PÉRENNISER</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Mesure d'impact, ajustements continus et transfert de compétences pour ancrer la transformation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary">
          <div className="container relative text-center space-y-8 text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à transformer votre capital humain ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
              « Les premières conversations ne coûtent rien. La décision de ne pas agir, si. »
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