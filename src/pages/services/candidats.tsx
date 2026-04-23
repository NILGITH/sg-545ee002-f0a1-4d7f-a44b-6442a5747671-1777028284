import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Search, FileText, Target, TrendingUp, CheckCircle, Award } from "lucide-react";
import Image from "next/image";

export default function ServicesCandidats() {
  return (
    <>
      <SEO 
        title="Services pour Candidats - HR Talents Partners"
        description="Accompagnement personnalisé, conseil carrière et opportunités d'emploi en Afrique de l'Ouest."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
              alt="Services Candidats"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Solutions RH Candidats
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Faites briller vos <span className="text-accent">talents</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Accédez aux meilleures opportunités et construisez la carrière qui vous ressemble
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
              <Link href="/candidate/login">
                Créer mon profil <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </section>

        {/* Processus */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Notre accompagnement</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Un parcours structuré pour maximiser vos chances de succès
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <FileText className="text-accent" size={32} />
                  </div>
                  <div className="text-accent font-serif text-5xl font-bold mb-2">1</div>
                  <h3 className="font-serif text-2xl font-semibold">Construisez votre profil</h3>
                  <p className="text-muted-foreground">
                    Dans votre espace privé, construisez votre profil qui dévoile tous vos atouts, CV, expériences, ambitions.
                    Laissez votre talent s'exprimer !
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Target className="text-accent" size={32} />
                  </div>
                  <div className="text-accent font-serif text-5xl font-bold mb-2">2</div>
                  <h3 className="font-serif text-2xl font-semibold">Place au match parfait</h3>
                  <p className="text-muted-foreground">
                    Nos experts analysent votre profil et activent leur réseau pour dénicher les opportunités qui vous correspondent vraiment.
                    Plus besoin de chercher – les meilleures opportunités viennent à vous.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Award className="text-accent" size={32} />
                  </div>
                  <div className="text-accent font-serif text-5xl font-bold mb-2">3</div>
                  <h3 className="font-serif text-2xl font-semibold">Brillez !</h3>
                  <p className="text-muted-foreground">
                    On vous prépare, on vous coach, on vous propulse. Nos formations, masterclass et ateliers vous donnent tous les outils pour briller.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl md:text-5xl font-bold">Pourquoi nous rejoindre ?</h2>
                <p className="text-lg text-muted-foreground">
                  Inscrivez-vous gratuitement et entrez dans le cercle privilégié des talents d'excellence où chaque candidat est unique.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Réseau d'entreprises premium</h3>
                      <p className="text-muted-foreground">Accès exclusif aux plus grands noms d'Afrique : Unilever, Auchan, NHL, Studio et bien d'autres</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Accompagnement personnalisé</h3>
                      <p className="text-muted-foreground">Un consultant dédié qui analyse votre profil et active son réseau pour vous</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Formations et coaching</h3>
                      <p className="text-muted-foreground">Développez vos compétences avec nos masterclass et certifications</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold mb-1">Matching intelligent</h3>
                      <p className="text-muted-foreground">Profils parfaitement adaptés à votre culture et vos ambitions</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt="Candidat"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Offres Section */}
        <section className="py-20 md:py-32">
          <div className="container text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Découvrez nos opportunités</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Consultez nos offres d'emploi et postulez en quelques clics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/jobs">
                  Voir les offres <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2">
                <Link href="/candidate/login">Créer mon profil</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}