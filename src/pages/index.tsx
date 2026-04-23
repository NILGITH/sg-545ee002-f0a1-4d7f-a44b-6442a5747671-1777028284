import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, Award, TrendingUp, CheckCircle, Briefcase, GraduationCap, Handshake, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const heroSlides = [
  {
    title: "Connecter les Talents aux Opportunités",
    subtitle: "Expert en recrutement, conseil RH et développement des talents",
    cta: "Découvrir les offres",
    ctaLink: "/jobs",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80",
  },
  {
    title: "Votre Partenaire RH de Confiance",
    subtitle: "Accompagnement personnalisé pour entreprises et professionnels",
    cta: "Nos services",
    ctaLink: "/services/entreprises",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
  },
  {
    title: "Excellence et Innovation RH",
    subtitle: "Plus de 10 ans d'expertise au service de votre réussite",
    cta: "À propos de nous",
    ctaLink: "/about",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <>
      <SEO 
        title="HR Talents Partners - Ambassadeur de Talents et d'Excellence"
        description="Agence de recrutement et conseil RH de référence. Nous accompagnons les entreprises et candidats vers l'excellence."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Slider Section */}
        <section className="relative overflow-hidden">
          {/* Slider Container */}
          <div className="relative h-[600px] md:h-[700px]">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
                </div>

                {/* Content */}
                <div className="relative container h-full flex items-center">
                  <div className="max-w-4xl text-white space-y-8">
                    <div className="inline-block border-2 border-accent px-6 py-3 mb-4">
                      <span className="font-serif text-sm md:text-base font-semibold uppercase tracking-wider">
                        Ambassadeur de Talents et d'Excellence
                      </span>
                    </div>
                    
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                      {slide.title.split(" ").map((word, i) => (
                        <span key={i}>
                          {word === "Opportunités" || word === "Confiance" || word === "Innovation" ? (
                            <span className="text-accent">{word}</span>
                          ) : (
                            word
                          )}{" "}
                        </span>
                      ))}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
                      {slide.subtitle}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.4s" }}>
                      <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                        <Link href={slide.ctaLink}>
                          {slide.cta} <ArrowRight className="ml-2" size={20} />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
                        <Link href="/contact">Nous contacter</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border-2 border-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border-2 border-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-accent w-8"
                      : "bg-white/50 hover:bg-white/70 w-3"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container relative">
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
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Recrutement</h3>
                  <p className="text-muted-foreground">
                    Identification et sélection des meilleurs talents pour vos postes clés. 
                    Processus rigoureux et personnalisé.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Target className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Conseil RH</h3>
                  <p className="text-muted-foreground">
                    Stratégie RH, optimisation des processus, gestion des talents. 
                    Expertise adaptée à vos enjeux.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <GraduationCap className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Formation</h3>
                  <p className="text-muted-foreground">
                    Programmes de formation sur mesure pour développer les compétences de vos équipes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
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
        <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container relative">
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
                          <Link href="/candidate/login">
                            Créer mon profil <ArrowRight className="ml-1" size={16} />
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
              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
                        alt="Marie Dupont"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <MessageSquare className="text-accent" size={32} />
                  </div>
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

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                        alt="Jean Kabamba"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <MessageSquare className="text-accent" size={32} />
                  </div>
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

              <Card className="border-2 hover:border-accent transition-all duration-300">
                <CardContent className="pt-8 space-y-4">
                  <div className="flex gap-4 items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
                        alt="Sophie Mukendi"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <MessageSquare className="text-accent" size={32} />
                  </div>
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
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/90"></div>
          </div>
          <div className="container relative text-center space-y-8 text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">
              Prêt à franchir une nouvelle étape ?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Découvrez nos offres d'emploi ou contactez-nous pour discuter de vos besoins en recrutement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/jobs">
                  Voir les offres <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-primary">
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