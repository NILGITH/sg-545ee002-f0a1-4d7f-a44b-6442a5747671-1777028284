import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEO } from "@/components/SEO";
import { Send, Building2, Mail, Phone, MapPin, Briefcase } from "lucide-react";
import Image from "next/image";
import { jobSubmissionService } from "@/services/jobSubmissionService";

export default function SubmitJob() {
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    job_title: "",
    job_description: "",
    job_requirements: "",
    job_responsibilities: "",
    contract_type: "",
    location: "",
    sector: "",
    salary_range: "",
    experience_level: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await jobSubmissionService.submitJob(formData);
      alert("Votre offre a été soumise avec succès ! Notre équipe la validera sous 24-48h.");
      setFormData({
        company_name: "",
        company_email: "",
        company_phone: "",
        job_title: "",
        job_description: "",
        job_requirements: "",
        job_responsibilities: "",
        contract_type: "",
        location: "",
        sector: "",
        salary_range: "",
        experience_level: "",
      });
    } catch (error) {
      console.error("Job submission error:", error);
      alert("Erreur lors de la soumission. Veuillez réessayer.");
    }

    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Soumettre une offre - HR Talents Partners"
        description="Publiez votre offre d'emploi avec HR Talents Partners et trouvez les meilleurs talents en Côte d'Ivoire."
      />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80"
              alt="Soumettre une offre"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="container relative text-center space-y-6 text-white">
            <div className="inline-block border-2 border-accent px-4 py-2 mb-4">
              <span className="font-serif text-sm font-semibold uppercase tracking-wider">
                Recrutement
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold max-w-4xl mx-auto">
              Publiez votre <span className="text-accent">Offre d'Emploi</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Confiez-nous votre recrutement et accédez aux meilleurs talents de Côte d'Ivoire
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container max-w-4xl">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">Détails de l'offre</CardTitle>
                <p className="text-muted-foreground">
                  Remplissez ce formulaire. Nous validerons votre offre sous 24-48h avant publication.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Informations Entreprise */}
                  <div className="space-y-6">
                    <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                      <Building2 className="text-accent" size={24} />
                      Informations Entreprise
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Nom de l'entreprise *</Label>
                        <Input
                          id="company_name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                          placeholder="Votre entreprise"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sector">Secteur d'activité</Label>
                        <Select
                          value={formData.sector}
                          onValueChange={(value) => setFormData({ ...formData, sector: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informatique">Informatique / IT</SelectItem>
                            <SelectItem value="banque">Banque / Finance</SelectItem>
                            <SelectItem value="commerce">Commerce / Distribution</SelectItem>
                            <SelectItem value="industrie">Industrie</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="telecom">Télécommunications</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_email">Email de contact *</Label>
                        <Input
                          id="company_email"
                          name="company_email"
                          type="email"
                          value={formData.company_email}
                          onChange={handleChange}
                          required
                          placeholder="contact@entreprise.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_phone">Téléphone</Label>
                        <Input
                          id="company_phone"
                          name="company_phone"
                          type="tel"
                          value={formData.company_phone}
                          onChange={handleChange}
                          placeholder="+225 27 XX XX XX XX"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Détails du Poste */}
                  <div className="space-y-6 pt-8 border-t">
                    <h3 className="font-serif text-xl font-semibold flex items-center gap-2">
                      <Briefcase className="text-accent" size={24} />
                      Détails du Poste
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="job_title">Titre du poste *</Label>
                      <Input
                        id="job_title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Responsable Marketing Digital"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contract_type">Type de contrat *</Label>
                        <Select
                          value={formData.contract_type}
                          onValueChange={(value) => setFormData({ ...formData, contract_type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CDI">CDI</SelectItem>
                            <SelectItem value="CDD">CDD</SelectItem>
                            <SelectItem value="Stage">Stage</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation *</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          placeholder="Abidjan, Plateau"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience_level">Niveau d'expérience</Label>
                        <Select
                          value={formData.experience_level}
                          onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="junior">Junior (0-2 ans)</SelectItem>
                            <SelectItem value="intermediaire">Intermédiaire (2-5 ans)</SelectItem>
                            <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                            <SelectItem value="expert">Expert (10+ ans)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="salary_range">Fourchette salariale</Label>
                        <Input
                          id="salary_range"
                          name="salary_range"
                          value={formData.salary_range}
                          onChange={handleChange}
                          placeholder="Ex: 800 000 - 1 200 000 FCFA"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_description">Description du poste *</Label>
                      <Textarea
                        id="job_description"
                        name="job_description"
                        value={formData.job_description}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Décrivez le poste, le contexte, l'équipe..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_responsibilities">Responsabilités principales</Label>
                      <Textarea
                        id="job_responsibilities"
                        name="job_responsibilities"
                        value={formData.job_responsibilities}
                        onChange={handleChange}
                        rows={5}
                        placeholder="- Gérer les campagnes marketing&#10;- Analyser les performances&#10;- ..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_requirements">Compétences requises</Label>
                      <Textarea
                        id="job_requirements"
                        name="job_requirements"
                        value={formData.job_requirements}
                        onChange={handleChange}
                        rows={5}
                        placeholder="- Diplôme Bac+5 Marketing&#10;- Maîtrise Google Ads&#10;- ..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={submitting}
                    >
                      {submitting ? "Envoi en cours..." : "Soumettre l'offre"}
                      <Send className="ml-2" size={20} />
                    </Button>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Notre équipe validera votre offre sous 24-48h avant publication
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}