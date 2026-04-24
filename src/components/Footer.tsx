import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="border-2 border-primary-foreground px-3 py-2 inline-block" style={{ backgroundImage: "url(\"/logo_hr_sans_fond.png\")", backgroundColor: "transparent" }}>
              <span className="font-serif text-lg font-bold">HR Talents Partners</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Ambassadeur de Talents et d'Excellence
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link href="/services/entreprises" className="hover:text-accent transition-colors">Pour les entreprises</Link></li>
              <li><Link href="/services/candidats" className="hover:text-accent transition-colors">Pour les candidats</Link></li>
              <li><Link href="/jobs" className="hover:text-accent transition-colors">Offres d'emploi</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Recrutement</li>
              <li>Conseil RH</li>
              <li>Formation</li>
              <li>Accompagnement carrière</li>
              <li>Évaluation talents</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+225 27 XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>contact@hrtalentspartners.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Abidjan, Côte d'Ivoire<br />Plateau - Zone 4</span>
              </li>
            </ul>
            
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} HR Talents Partners. Tous droits réservés.</p>
        </div>
      </div>
    </footer>);

}