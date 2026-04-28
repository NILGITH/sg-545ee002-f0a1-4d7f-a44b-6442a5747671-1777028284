import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function EntreprisesPage() {
  const services = [
    {
      icon: Users,
      title: "Recrutement 360° - De A à Z",
      description: "De l'élaboration du besoin à l'intégration réussie",
      points: [
        "Analyse stratégique du poste et culture fit",
        "Sourcing multicanal + vivier de 1 000+ candidats pré-qualifiés",
        "Suivi post-intégration à 30, 60 et 90 jours"
      ]
    },
    {
      icon: Target,
      title: "Formation Professionnelle",
      description: "Des parcours transformatifs, pas de simples formations",
      points: [
        "Ingénierie pédagogique 100% sur mesure",
        "Leadership, intelligence émotionnelle, soft skills",
        "Évaluation d'impact et mesure du ROI"
      ]
    },
    {
      icon: Briefcase,
      title: "Conseil RH · Audit Social · GEPP",
      description: "Transformer votre fonction RH en levier stratégique",
      points: [
        "Audit RH global et plan d'action priorisé",
        "Audit social : climat, bien-être, RPS",
        "GEPP : cartographie et anticipation des besoins"
      ]
    },
    {
      icon: Users,
      title: "Teambuilding & Cohésion d'Équipe",
      description: "Libérer le potentiel collectif de vos équipes",
      points: [
        "Diagnostic des dynamiques d'équipe",
        "Séminaires de cohésion et leadership collectif",
        "Programmes immersifs sur mesure"
      ]
    },
    {
      icon: Target,
      title: "Coaching Professionnel",
      description: "Accompagnement pour situations complexes",
      points: [
        "Coaching exécutif & dirigeant",
        "Développement du leadership authentique",
        "Gestion de la pression et des situations de crise"
      ]
    },
    {
      icon: Briefcase,
      title: "Externalisation RH (RPO/BPO)",
      description: "Concentrez-vous sur votre cœur de métier",
      points: [
        "Administration du personnel - Gestion de la paie",
        "Recrutement externalisé (RPO) intégral ou partiel",
        "Reporting RH et tableaux de bord"
      ]
    },
    {
      icon: Users,
      title: "Réorganisation & Structuration",
      description: "Anticiper, structurer et transformer",
      points: [
        "Diagnostic organisationnel complet",
        "Refonte des processus et procédures",
        "Accompagnement au changement"
      ]
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Analyser",
      description: "Immersion dans votre réalité : entretiens approfondis, analyse documentaire, cartographie des enjeux RH"
    },
    {
      step: "02",
      title: "Concevoir",
      description: "Solutions 100% sur mesure, co-construites et validées avec vous. Jamais standardisé. Toujours pertinent"
    },
    {
      step: "03",
      title: "Exécuter",
      description: "Déploiement rigoureux avec KPIs définis en amont, jalons précis et communication transparente"
    },
    {
      step: "04",
      title: "Pérenniser",
      description: "Mesure d'impact, ajustements continus et transfert de compétences pour ancrer la transformation"
    }
  ];

  return (
    <>
      <SEO 
        title="Services aux Entreprises - HR Talents Partners"
        description="Recrutement, Formation, Conseil RH, Coaching et Externalisation pour transformer votre capital humain"
      />
      
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/2149603484.jpg"
              alt="Services Entreprises"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-black/70"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Badge className="mb-6 bg-accent text-accent-foreground text-base px-6 py-2">
                Services aux Entreprises
              </Badge>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Votre capital humain est votre premier levier de croissance
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Nous ne gérons pas des ressources humaines. Nous développons des potentiels humains.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg"
                >
                  <Link href="/contact">Discutons de vos besoins</Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg"
                >
                  <Link href="/submit-job">Publier une offre</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nos 7 Services */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
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
                  className="border-2 hover:border-accent transition-all group hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <service.icon className="text-accent" size={32} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={18} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Notre Méthodologie en 4 Étapes
              </h2>
              <p className="text-xl text-muted-foreground">
                Un processus structuré pour des résultats mesurables
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {methodology.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent text-accent-foreground font-bold text-3xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Nos Valeurs
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 text-center p-8">
                <h3 className="font-serif text-2xl font-bold mb-4 text-accent">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous visons l'excellence à chaque étape, avec une exigence constante dans l'exécution
                </p>
              </Card>

              <Card className="border-2 text-center p-8">
                <h3 className="font-serif text-2xl font-bold mb-4 text-accent">Innovation</h3>
                <p className="text-muted-foreground">
                  Standards internationaux et intelligence locale pour des solutions pertinentes
                </p>
              </Card>

              <Card className="border-2 text-center p-8">
                <h3 className="font-serif text-2xl font-bold mb-4 text-accent">Intégrité</h3>
                <p className="text-muted-foreground">
                  Confidentialité absolue, transparence totale, honnêteté même quand c'est inconfortable
                </p>
              </Card>

              <Card className="border-2 text-center p-8">
                <h3 className="font-serif text-2xl font-bold mb-4 text-accent">Impact</h3>
                <p className="text-muted-foreground">
                  Interventions qui structurent les organisations et renforcent durablement la performance
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Prêt à transformer votre capital humain ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Discutons de vos enjeux RH et construisons ensemble des solutions sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg"
                >
                  <Link href="/contact">
                    Contactez-nous
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold text-lg"
                >
                  <Link href="/submit-job">Publier une offre d'emploi</Link>
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