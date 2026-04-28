import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import Link from "next/link";
import { ArrowRight, Users, Target, Award, TrendingUp, CheckCircle, Briefcase, GraduationCap, Handshake, MessageSquare, ChevronLeft, ChevronRight, Building2, MapPin, BadgeCheck, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/integrations/supabase/client";

type Partnership = {
  id: string;
  company_name: string;
  logo_url: string | null;
  website_url: string | null;
  category: string;
  display_order: number;
};

type Testimonial = {
  id: string;
  author_name: string;
  author_position: string;
  author_company: string;
  author_photo_url: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
};

const heroSlides = [
{
  title: "Votre Capital Humain, Votre Premier Levier de Croissance",
  subtitle: "Expert en recrutement, conseil RH et développement des talents en Côte d'Ivoire",
  cta: "Découvrir nos services",
  ctaLink: "/services",
  image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
},
{
  title: "Nous Développons des Potentiels Humains",
  subtitle: "L'assurance d'un cabinet qui s'engage personnellement sur chaque mission",
  cta: "Nos services",
  ctaLink: "/services",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
},
{
  title: "Excellence et Innovation RH",
  subtitle: "Avec la rigueur d'un partenaire stratégique et la proximité d'une équipe dédiée à votre succès",
  cta: "À propos de nous",
  ctaLink: "/about",
  image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
}];


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadPartnerships();
    loadTestimonials();
  }, []);

  const loadPartnerships = async () => {
    const { data } = await supabase.
    from("partnerships").
    select("id, company_name, logo_url, website_url, category, display_order").
    eq("is_active", true).
    order("display_order", { ascending: true });

    if (data) {
      setPartnerships(data);
    }
  };

  const loadTestimonials = async () => {
    const { data } = await supabase.
    from("testimonials").
    select("id, author_name, author_position, author_company, author_photo_url, content, rating, is_featured, display_order").
    eq("is_active", true).
    order("display_order", { ascending: true }).
    limit(6);

    if (data) {
      setTestimonials(data);
    }
  };

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
        description="Premier cabinet de recrutement et conseil RH en Côte d'Ivoire. +50 000 talents, +250 entreprises accompagnées à Abidjan." />
      
      
      <Navigation />
      
      <main>
        {/* Hero Slider Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[600px] md:h-[700px]">
            {heroSlides.map((slide, index) =>
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"}`
              }>
              
                <div className="absolute inset-0">
                  <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0} />
                
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
                      {slide.title.split(" ").map((word, i) =>
                    <span key={i}>
                          {word === "Opportunités" || word === "Confiance" || word === "Innovation" ?
                      <span className="text-accent">{word}</span> :

                      word
                      }{" "}
                        </span>
                    )}
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
            )}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border-2 border-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center z-10"
              aria-label="Previous slide">
              
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border-2 border-accent hover:bg-accent hover:text-white transition-all flex items-center justify-center z-10"
              aria-label="Next slide">
              
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {heroSlides.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all ${
                index === currentSlide ?
                "bg-accent w-8" :
                "bg-white/50 hover:bg-white/70 w-3"}`
                }
                aria-label={`Go to slide ${index + 1}`} />

              )}
            </div>
          </div>
        </section>

        {/* Stats Section - VRAIES STATISTIQUES DU PDF */}
        <section className="relative py-16 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>
          <div className="container relative">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Notre Force</h2>
              <p className="text-white/80">Des chiffres qui témoignent de notre engagement</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.1s" }}>
                <div className="flex justify-center mb-2">
                  <Award className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">7</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Domaines d'expertise</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-center mb-2">
                  <Target className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">100+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Missions réalisées</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-center mb-2">
                  <BadgeCheck className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">98%</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Satisfaction client</p>
              </div>
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.4s" }}>
                <div className="flex justify-center mb-2">
                  <Building2 className="text-accent" size={40} />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-serif text-accent">10+</div>
                <p className="text-sm md:text-base text-primary-foreground/80">Secteurs d'activité</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Candidat/Entreprise - Design basé sur les services */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Carte CANDIDAT */}
              <div className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden group shadow-2xl">
                <Image
                  src="/2149300718.jpg"
                  alt="Candidat - Je cherche un emploi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
                
                <div className="relative h-full flex flex-col justify-between p-8 md:p-12 text-white">
                  <div>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                      CANDIDAT
                    </h2>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">1. Rejoignez la Grey Team Entreprises</h3>
                        <p className="text-white/90 leading-relaxed">
                          Inscrivez-vous gratuitement et entrez dans le cercle privilégié des talents d'excellence en Afrique.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">2. Brillez par votre Singularité</h3>
                        <p className="text-white/90 leading-relaxed">
                          Dans votre espace privé, construisez votre profil qui dévoile tous vos atouts. CV, expériences, ambitions… Laissez votre talent s'exprimer !
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">3. Place au Match Parfait</h3>
                        <p className="text-white/90 leading-relaxed">
                          Nos experts analysent votre profil et activent leur réseau pour dénicher les opportunités qui vous correspondent vraiment. Plus besoin de chercher – les meilleures opportunités viennent à vous.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg py-6 w-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/jobs">Je cherche un job</Link>
                  </Button>
                </div>
              </div>

              {/* Carte ENTREPRISE */}
              <div className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden group shadow-2xl">
                <Image
                  src="/2149603484.jpg"
                  alt="Entreprise - Je cherche un talent"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
                
                <div className="relative h-full flex flex-col justify-between p-8 md:p-12 text-white">
                  <div>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                      ENTREPRISE
                    </h2>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">1. Rejoignez la Grey Team Entreprises</h3>
                        <p className="text-white/90 leading-relaxed">
                          Inscrivez-vous gratuitement et accédez à notre réseau exclusif des talents parmi les plus prometteurs d'Afrique.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">2. Définissez Vos Besoins Précisément</h3>
                        <p className="text-white/90 leading-relaxed">
                          Dans votre espace dédié, partagez votre vision, vos valeurs et vos exigences. Plus vos critères seront précis, plus notre matching sera pertinent.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-accent font-bold text-lg mb-3">3. Découvrez Vos Talents Idéaux</h3>
                        <p className="text-white/90 leading-relaxed">
                          Nos experts analysent vos besoins et mobilisent leur réseau pour vous présenter uniquement des profils parfaitement adaptés à votre culture et vos ambitions. Fini les recrutements hasardeux – seuls les meilleurs talents vous sont proposés.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg py-6 w-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link href="/submit-job">Je cherche un talent</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section - LOGOS DÉFILANTS AVEC DESIGN ÉLÉGANT */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
                <span className="font-serif text-sm font-semibold uppercase tracking-wider text-accent">
                  Nos Partenaires
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Ils nous font confiance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des leaders ivoiriens et internationaux qui transforment leurs ambitions en réalités avec HR Talents Partners
              </p>
            </div>
            
            {/* Scrolling logos container with elegant cards */}
            <div className="relative py-8">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
              
              {/* Scrolling track with cards */}
              <div className="flex gap-8 animate-scroll">
                {/* First set of logos from database */}
                <div className="flex gap-8 min-w-max">
                  {partnerships.map((partner) =>
                  <div key={partner.id} className="group bg-card border-2 border-border hover:border-accent transition-all duration-300 rounded-lg px-8 py-6 min-w-[240px] flex items-center justify-center shadow-sm hover:shadow-md">
                      {partner.logo_url ?
                    <img
                      src={partner.logo_url}
                      alt={partner.company_name}
                      className="h-12 w-auto object-contain group-hover:scale-110 transition-transform" /> :


                    <span className="text-xl font-bold text-foreground/60 group-hover:text-accent transition-colors whitespace-nowrap">
                          {partner.company_name}
                        </span>
                    }
                    </div>
                  )}
                </div>
                {/* Duplicate set for seamless infinite loop */}
                <div className="flex gap-8 min-w-max">
                  {partnerships.map((partner) =>
                  <div key={`dup-${partner.id}`} className="group bg-card border-2 border-border hover:border-accent transition-all duration-300 rounded-lg px-8 py-6 min-w-[240px] flex items-center justify-center shadow-sm hover:shadow-md">
                      {partner.logo_url ?
                    <img
                      src={partner.logo_url}
                      alt={partner.company_name}
                      className="h-12 w-auto object-contain group-hover:scale-110 transition-transform" /> :


                    <span className="text-xl font-bold text-foreground/60 group-hover:text-accent transition-colors whitespace-nowrap">
                          {partner.company_name}
                        </span>
                    }
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional trust indicators */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-sm">
                <span className="font-semibold text-accent">+250 entreprises</span> nous font confiance en Côte d'Ivoire
              </p>
            </div>
          </div>
        </section>

        {/* Guide des Salaires Section - IMAGE LOCALE */}
        


































































        

        {/* Notre Méthodologie - 4 ÉTAPES DU PDF */}
        


























































        

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
              {testimonials.length > 0 ?
              testimonials.map((testimonial) =>
              <Card key={testimonial.id} className="border-2 hover:border-accent transition-all duration-300">
                    <CardContent className="pt-8 space-y-4">
                      <div className="flex gap-4 items-center mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                          {testimonial.author_photo_url ?
                      <Image
                        src={testimonial.author_photo_url}
                        alt={testimonial.author_name}
                        fill
                        className="object-cover" /> :


                      <div className="w-full h-full flex items-center justify-center bg-accent/10 text-accent font-bold text-xl">
                              {testimonial.author_name.charAt(0)}
                            </div>
                      }
                        </div>
                        <MessageSquare className="text-accent" size={32} />
                      </div>
                      
                      {/* Rating stars */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) =>
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "fill-accent text-accent" : "text-muted"} />

                    )}
                      </div>

                      <p className="text-muted-foreground italic">
                        "{testimonial.content}"
                      </p>
                      <div className="pt-4 border-t">
                        <p className="font-semibold">{testimonial.author_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.author_position}, {testimonial.author_company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
              ) :

              <div className="col-span-3 text-center text-muted-foreground py-12">
                  Aucun témoignage pour le moment
                </div>
              }
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
              className="object-cover" />
            
            <div className="absolute inset-0 bg-primary/90"></div>
          </div>
          <div className="container relative text-center space-y-8 text-white">
            <h2 className="font-serif text-3xl md:text-5xl font-bold max-w-3xl mx-auto">Prêt à nous rejoindre ?

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
    </>);

}