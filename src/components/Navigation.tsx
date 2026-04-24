import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_hr_sans_fond.png"
              alt="HR Talents Partners"
              width={240}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-accent transition-colors">
              Offres d'emploi
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
              À propos
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
              Contact
            </Link>
            <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/candidate/login">Espace Candidat</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu">
            
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen &&
        <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
              <Link href="/services" className="text-sm font-medium hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/jobs" className="text-sm font-medium hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
                Offres d'emploi
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
                À propos
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                <Link href="/candidate/login" onClick={() => setIsOpen(false)}>Espace Candidat</Link>
              </Button>
            </div>
          </div>
        }
      </div>
    </nav>);

}