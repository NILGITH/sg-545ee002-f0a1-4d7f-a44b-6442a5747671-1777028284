import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, Award, TrendingUp, CheckCircle, Briefcase, GraduationCap, Handshake, MessageSquare, ChevronLeft, ChevronRight, Building2, MapPin, BadgeCheck } from "lucide-react";
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
        description="Premier cabinet de recrutement et conseil RH en Afrique de l'Ouest. +50 000 talents, +500 entreprises accompagnées."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Slider Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[600px] md:h-[700px]">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
                </div>

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

        {/* Stats Section - VRAIES STATISTIQUES */}
        <section className="relative py-16 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container relative">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Notre Force</h2>
              <p className="text-white/80">Des connexions privilégiées qui transforment les ambitions en réalité</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.1s" }}>
                <div className="flex justify-center mb-2">
                  <Award className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">15</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Experts en capital humain</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-center mb-2">
                  <Users className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">50 000+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Talents dans notre réseau africain</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-center mb-2">
                  <Building2 className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">250+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Entreprises accompagnées en conseil</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.4s" }}>
                <div className="flex justify-center mb-2">
                  <MapPin className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">Abidjan</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Un hub stratégique</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.5s" }}>
                <div className="flex justify-center mb-2">
                  <BadgeCheck className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">8</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Années d'excellence sur le continent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - VRAIS SERVICES */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Nos Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous transformons vos besoins en success stories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 1. Recrutement */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Users className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Recrutement</h3>
                  <p className="text-muted-foreground">
                    Notre méthode signature en 3 temps garantit des recrutements précis et durables : 
                    un rendez-vous initial pour cerner vos enjeux, une investigation approfondie...
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
                </CardContent>
              </Card>

              {/* 2. Analyse salariale */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Target className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Analyse Salariale</h3>
                  <p className="text-muted-foreground">
                    Premier cabinet à publier un Guide des Salaires en Côte d'Ivoire, Sénégal et Bénin. 
                    Vision 360° des tendances salariales en Afrique de l'Ouest.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Collecte de données via entretiens directs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Analyse sectorielle pointue et internationale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Benchmarking complet des politiques salariales</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 3. Team Building */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Handshake className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Team Building</h3>
                  <p className="text-muted-foreground">
                    Nous ne nous contentons pas d'organiser des activités pour vos équipes. 
                    Nous concevons des expériences sur mesure adaptées à votre culture et objectifs.
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
                      <span>Performance mesurable avec KPIs concrets</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 4. Formation */}
              <Card className="border-2 hover:border-accent transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="pt-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <GraduationCap className="text-accent" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">Formation</h3>
                  <p className="text-muted-foreground">
                    Boostez vos compétences ! Nous ne recrutons pas les meilleurs talents : 
                    on les façonne pour l'avenir ! Leadership, IA, gestion de projet...
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Leadership, prise de parole, IA, gestion de projet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Formations taillées pour le terrain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={16} />
                      <span>Certification en fin de parcours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Clients Section - VRAIS CLIENTS */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ils nous font confiance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ces entreprises africaines nous ont fait confiance et profitent de notre expertise
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">Auchan Retail</div>
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">Unilever</div>
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">NHL</div>
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">Studio</div>
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">Leadway Assurance</div>
              <div className="text-2xl font-bold text-muted-foreground/60 hover:text-accent transition-colors">Oryx Energies</div>
            </div>
          </div>
        </section>

        {/* Guide des Salaires Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/salary-guide.png"
                  alt="Guide des Salaires GSA"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-block border-2 border-accent px-4 py-2">
                  <span className="font-serif text-sm font-semibold uppercase tracking-wider text-accent">
                    Premier Observatoire RH
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold">
                  Guide des Salaires en Afrique de l'Ouest
                </h2>
                <p className="text-lg text-muted-foreground">
                  Pionnier de l'intelligence RH en Afrique de l'Ouest, nous avons été le premier cabinet 
                  à publier un Guide des Salaires en Côte d'Ivoire, au Sénégal et au Bénin, offrant une 
                  vision 360° des tendances salariales.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-accent mb-1">5000+</div>
                    <p className="text-sm text-muted-foreground">Répondants au sondage</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-accent mb-1">20</div>
                    <p className="text-sm text-muted-foreground">Index publiés référencés</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-accent mb-1">3</div>
                    <p className="text-sm text-muted-foreground">Pays couverts</p>
                  </div>
                </div>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <Link href="/contact">
                    Télécharger le Guide GSA <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-serif text-3xl md:text-5xl font-bold">Témoignages</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez ce que nos clients disent de notre travail
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
                    <p className="text-sm text-muted-foreground">DRH, Auchan Retail</p>
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
                    <p className="text-sm text-muted-foreground">CEO, Unilever Côte d'Ivoire</p>
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
              Prêt à rejoindre la Grey Team ?
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