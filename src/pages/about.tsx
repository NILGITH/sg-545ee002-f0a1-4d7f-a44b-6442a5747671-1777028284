import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Target, Award, Users, TrendingUp, Lightbulb, Shield } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <>
      <SEO
        title="À propos - HR Talents Partners"
        description="Découvrez HR Talents Partners : Faire de votre capital humain le moteur de votre performance en Côte d'Ivoire." />
      
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
              alt="À propos"
              fill
              className="object-cover" />
            
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Qui sommes-nous ?
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Ambassadeur de <span className="text-accent">Talents</span> et d'<span className="text-accent">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
              « Nous ne gérons pas des ressources humaines. Nous développons des potentiels humains. »
            </p>
          </div>
        </section>

        {/* Notre Identité */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold">
                  Faire de votre capital humain le moteur de votre performance.
                </h2>
                <div className="h-1 w-20 bg-accent"></div>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    HR TALENTS PARTNERS est né d'une conviction fondamentale : les organisations qui performent durablement sont celles qui placent le capital humain au cœur de leur stratégie ; pas comme une contrainte à gérer, mais comme un levier à cultiver avec méthode et ambition.
                  </p>
                  <p className="text-lg">
                    Fondé par des experts reconnus en gestion des talents, développement organisationnel et stratégie RH; notre cabinet accompagne les entreprises; des PME ambitieuses aux grands groupes; avec rigueur méthodologique, intelligence humaine et innovation continue.
                  </p>
                  <p className="text-lg">
                    Ce qui nous distingue ? Nous ne livrons pas des rapports. Nous livrons des transformations. Nous vous accompagnons jusqu'aux résultats; et souvent bien au-delà.
                  </p>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="/2147664377.jpg"
                  alt="Notre équipe à Abidjan"
                  fill
                  className="object-cover rounded-lg" />
                
              </div>
            </div>
          </div>
        </section>

        {/* Ce qui nous distingue */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Ce qui nous distingue</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Notre engagement total envers votre transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Un engagement total</h3>
                  <p className="text-muted-foreground">
                    L'implication personnelle de nos experts. Pas d'équipe junior supervisée de loin.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Du sur-mesure absolu</h3>
                  <p className="text-muted-foreground">
                    Aucune solution pré-packagée. Chaque intervention pensée pour votre réalité.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Une confidentialité irréprochable</h3>
                  <p className="text-muted-foreground">
                    Vos informations protégées avec le plus haut niveau de discrétion professionnelle.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Des résultats mesurables</h3>
                  <p className="text-muted-foreground">
                    Indicateurs définis dès le départ; tenus sans compromis.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos Valeurs</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Les principes qui nous guident
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Award className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">Excellence</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Nous ne livrons pas du "suffisant". Nous visons l'excellence à chaque étape, avec une exigence constante dans l'exécution. Chaque mission est menée comme si votre organisation était la nôtre.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Lightbulb className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">Innovation</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Nous combinons standards internationaux et intelligence locale pour concevoir des solutions pertinentes, ancrées dans la réalité de vos enjeux. Parce que vos défis méritent des réponses sur mesure.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Shield className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">Intégrité</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    L'intégrité structure chacune de nos interventions : Confidentialité absolue, transparence totale, honnêteté même quand c'est inconfortable.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                    <Target className="text-accent" size={32} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-center">Impact</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Nos interventions produisent un impact tangible : elles structurent les organisations, renforcent les équipes et soutiennent durablement la performance économique. Nous agissons en partenaire stratégique.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Notre Vision */}
        <section className="py-20 md:py-32 bg-primary text-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
                <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                  Notre Vision
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold">
                Devenir le partenaire de référence des organisations africaines
              </h2>
              <p className="text-lg md:text-xl text-white/90">
                Devenir le partenaire de référence des organisations africaines dans la structuration et la transformation de leur capital humain, afin de renforcer durablement leur performance.
              </p>
              <p className="text-base text-white/80">
                Nous travaillons chaque jour à construire cet avenir : en faisant progresser notre expertise, en développant nos équipes et en élevant continuellement nos standards d'exécution.
              </p>
            </div>
          </div>
        </section>

        {/* L'Équipe */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">L'Équipe</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Une équipe d'experts d'exception, à votre service chaque jour.
              </p>
              <p className="text-base text-muted-foreground max-w-3xl mx-auto">
                Chez HR Talents Partners, chaque expert est sélectionné selon les plus hauts standards : maîtrise technique reconnue et expertise opérationnelle de haut niveau, sens aigu des dynamiques humaines et engagement sans compromis envers la qualité et la satisfaction client.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Talent Acquisition & Executive Search</h3>
                  <p className="text-sm text-accent">Recrutement 360°</p>
                  <p className="text-sm text-muted-foreground">
                    Chasseurs de têtes et recruteurs seniors spécialisés, réseaux étendus, expertise sur profils stratégiques et Top Management.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Award className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Learning & Development</h3>
                  <p className="text-sm text-accent">Formation Professionnelle</p>
                  <p className="text-sm text-muted-foreground">
                    Formateurs certifiés et ingénieurs pédagogiques reconnus pour concevoir des parcours transformatifs et mesurables.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">HR Strategy & Audit Social</h3>
                  <p className="text-sm text-accent">Conseil RH · Audit Social · GEPP</p>
                  <p className="text-sm text-muted-foreground">
                    Consultants seniors en stratégie RH, audit social et GEPP avec des références dans des groupes nationaux et internationaux.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Team Performance & Coaching</h3>
                  <p className="text-sm text-accent">Teambuilding · Coaching</p>
                  <p className="text-sm text-muted-foreground">
                    Coachs exécutifs certifiés et experts en dynamiques collectives spécialisés en leadership et cohésion des équipes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">HR Operations & Outsourcing</h3>
                  <p className="text-sm text-accent">Externalisation RH (RPO/BPO)</p>
                  <p className="text-sm text-muted-foreground">
                    Experts en gestion externalisée RH : administration, paie, recrutement externalisé, relations sociales.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Transformation & Restructuration</h3>
                  <p className="text-sm text-accent">Réorganisation & Structuration</p>
                  <p className="text-sm text-muted-foreground">
                    Consultants en transformation organisationnelle et restructuration sociale, reconnus pour leur méthode et sens de l'humain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
          <div className="container relative text-center space-y-8">
            

            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto italic">
              « Les premières conversations ne coûtent rien. La décision de ne pas agir, si. »
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/contact">
                  Contactez-nous <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-primary hover:bg-primary hover:text-white">
                <Link href="/jobs">Voir les offres</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>);

}