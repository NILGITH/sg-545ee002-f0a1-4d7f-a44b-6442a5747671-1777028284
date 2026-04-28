import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo - 192x90 pixels */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative w-48 h-[90px]">
              <Image
                src="/WhatsApp_Image_2026-04-28_at_17.52.24.jpeg"
                alt="HR Talents Partners"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority />
              
            </div>
            

            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium">
              Accueil
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium">
              À propos
            </Link>
            
            {/* Dropdown Services */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium flex items-center gap-1">
                Services
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href="/services" className="block px-4 py-3 hover:bg-accent/10 transition-colors text-sm border-b border-border">
                  Tous nos services
                </Link>
                <Link href="/services/entreprises" className="block px-4 py-3 hover:bg-accent/10 transition-colors text-sm border-b border-border">
                  Services Entreprises
                </Link>
                <Link href="/services/candidats" className="block px-4 py-3 hover:bg-accent/10 transition-colors text-sm">
                  Services Candidats
                </Link>
              </div>
            </div>

            <Link href="/jobs" className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium">
              Offres d'emploi
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium">
              Contact
            </Link>
            <Link href="/candidate/login" className="ml-4 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium">
              Espace Candidat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            aria-label="Menu">
            
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen &&
        <div className="md:hidden py-4 space-y-2 border-t border-border">
            <Link
            href="/"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              Accueil
            </Link>
            <Link
            href="/about"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              À propos
            </Link>
            <Link
            href="/services"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              Tous nos services
            </Link>
            <Link
            href="/services/entreprises"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium pl-8"
            onClick={() => setIsOpen(false)}>
            
              → Services Entreprises
            </Link>
            <Link
            href="/services/candidats"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium pl-8"
            onClick={() => setIsOpen(false)}>
            
              → Services Candidats
            </Link>
            <Link
            href="/jobs"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              Offres d'emploi
            </Link>
            <Link
            href="/contact"
            className="block px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              Contact
            </Link>
            <Link
            href="/candidate/login"
            className="block px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
            onClick={() => setIsOpen(false)}>
            
              Espace Candidat
            </Link>
          </div>
        }
      </div>
    </nav>);

}