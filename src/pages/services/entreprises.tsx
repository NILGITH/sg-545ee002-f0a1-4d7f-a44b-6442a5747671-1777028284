import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Users as TeamIcon,
  Handshake,
  Briefcase,
  Building,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function ServicesEntreprisesPage() {
  const services = [
    {
      icon: Users,
      title: "Recrutement 360° - De A à Z",
      description: "De l'élaboration du besoin à l'intégration réussie",
      features: [
        "Analyse stratégique du poste et culture fit",
        "Sourcing multicanal + vivier de 1 000+ candidats pré-qualifiés",
        "Suivi post-intégration à 30, 60 et 90 jours"
      ],
      color: "from-accent/20 to-accent/5"
    },
    {
      icon: GraduationCap,
      title: "Formation Professionnelle",
      description: "Des parcours transformatifs, pas de simples formations",
      features: [
        "Ingénierie pédagogique 100% sur mesure",
        "Leadership, intelligence émotionnelle, soft skills",
        "Évaluation d'impact et mesure du ROI"
      ],
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: TrendingUp,
      title: "Conseil RH · Audit Social · GEPP",
      description: "Transformer votre fonction RH en levier stratégique",
      features: [
        "Audit RH global et plan d'action priorisé",
        "Audit social : climat, bien-être, RPS",
        "GEPP : cartographie et anticipation des besoins"
      ],
      color: "from-green-500/20 to-green-500/5"
    },
    {
      icon: TeamIcon,
      title: "Teambuilding & Cohésion d'Équipe",
      description: "Libérer le potentiel collectif de vos équipes",
      features: [
        "Diagnostic des dynamiques d'équipe",
        "Séminaires de cohésion et leadership collectif",
        "Programmes immersifs sur mesure"
      ],
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: Handshake,
      title: "Coaching Professionnel",
      description: "Accompagnement pour situations complexes",
      features: [
        "Coaching exécutif & dirigeant",
        "Développement du leadership authentique",
        "Gestion de la pression et situations de crise"
      ],
      color: "from-orange-500/20 to-orange-500/5"
    },
    {
      icon: Briefcase,
      title: "Externalisation RH (RPO/BPO)",
      description: "Concentrez-vous sur votre cœur de métier",
      features: [
        "Administration du personnel · Gestion de la paie",
        "Recrutement externalisé (RPO) intégral ou partiel",
        "Reporting RH et tableaux de bord"
      ],
      color: "from-red-500/20 to-red-500/5"
    },
    {
      icon: Building,
      title: "Réorganisation & Structuration",
      description: "Anticiper, structurer et transformer",
      features: [
        "Refonte organisationnelle et définition des rôles",
        "Accompagnement au changement",
        "Optimisation des processus RH"
      ],
      color: "from-indigo-500/20 to-indigo-500/5"
    }
  ];

  return (
    <>
      <SEO 
        title="Services pour Entreprises - HR Talents Partners"
        description="Solutions RH complètes pour entreprises : Recrutement, Formation, Conseil, Teambuilding, Coaching, Externalisation et Réorganisation"
      />
      
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-secondary/20"></div>
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent text-accent-foreground text-base px-6 py-2">
                Solutions RH pour Entreprises
              </Badge>
              
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Votre Partenaire RH
                <span className="block text-accent mt-2">De Confiance</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Des solutions complètes pour structurer, développer et transformer votre capital humain
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
                >
                  <Link href="/submit-job">
                    Publier une offre
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="text-lg"
                >
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Nos 7 Domaines d'Expertise
              </h2>
              <p className="text-xl text-muted-foreground">
                Sept pôles d'excellence · Des solutions sur mesure pour chaque enjeu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="group border-2 hover:border-accent transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <service.icon className="text-accent" size={32} />
                    </div>
                    
                    <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie Section */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Notre Méthodologie
              </h2>
              <p className="text-xl text-muted-foreground">
                Un processus structuré en 4 étapes pour garantir des résultats durables
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: "01",
                  title: "Analyser",
                  description: "Immersion dans votre réalité : entretiens approfondis, analyse documentaire, cartographie des enjeux RH"
                },
                {
                  number: "02",
                  title: "Concevoir",
                  description: "Solutions 100% sur mesure, co-construites et validées avec vous. Jamais standardisé. Toujours pertinent"
                },
                {
                  number: "03",
                  title: "Exécuter",
                  description: "Déploiement rigoureux avec KPIs définis en amont, jalons précis et communication transparente"
                },
                {
                  number: "04",
                  title: "Pérenniser",
                  description: "Mesure d'impact, ajustements continus et transfert de compétences pour ancrer la transformation"
                }
              ].map((step, index) => (
                <Card key={index} className="border-2 hover:border-accent transition-all">
                  <CardContent className="p-8">
                    <div className="text-6xl font-serif font-bold text-accent/20 mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/10">
              <CardContent className="p-12 md:p-16 text-center">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                  Prêt à Transformer Votre Capital Humain ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Discutons de vos besoins et construisons ensemble la solution RH qui propulsera votre organisation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
                  >
                    <Link href="/contact">
                      Planifier un rendez-vous
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg"
                    variant="outline"
                    className="text-lg"
                  >
                    <Link href="/submit-job">Publier une offre</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}