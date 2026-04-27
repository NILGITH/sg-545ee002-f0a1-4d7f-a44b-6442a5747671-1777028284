import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Loader2, Building2, User, Briefcase, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { jobSubmissionService } from "@/services/jobSubmissionService";
import type { Database } from "@/integrations/supabase/types";

type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_phone: "",
    submitter_name: "",
    submitter_position: "",
    job_title: "",
    job_description: "",
    job_requirements: "",
    job_responsibilities: "",
    contract_type: "",
    location: "",
    sector: "",
    salary_range: "",
    experience_level: "",
    is_active: true,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company_name || !formData.job_title || !formData.job_description || 
        !formData.contract_type || !formData.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires (*)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      let logoUrl = "";
      
      if (logoFile) {
        if (logoFile.size > 2 * 1024 * 1024) {
          throw new Error("Le logo doit faire moins de 2MB");
        }
        logoUrl = await jobSubmissionService.uploadCompanyLogo(logoFile);
      }

      const jobData: JobInsert = {
        title: formData.job_title,
        company_name: formData.company_name,
        location: formData.location,
        contract_type: formData.contract_type,
        sector: formData.sector || null,
        salary_range: formData.salary_range || null,
        experience_level: formData.experience_level || null,
        description: formData.job_description + (formData.job_responsibilities ? "\n\nResponsabilités principales:\n" + formData.job_responsibilities : ""),
        requirements: formData.job_requirements || null,
        is_active: formData.is_active,
        company_logo_url: logoUrl || null,
      };

      const { error } = await supabase
        .from("jobs")
        .insert([jobData]);

      if (error) throw error;

      toast({
        title: "✅ Offre créée avec succès",
        description: "L'offre a été enregistrée.",
      });

      router.push("/admin/jobs");
    } catch (error: any) {
      console.error("Erreur création offre:", error);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: error.message || "Impossible de créer l'offre",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-primary text-white py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6">
            <ArrowLeft size={16} />
            Retour aux offres
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            Créer une nouvelle offre
          </h1>
          <p className="text-white/80 mt-2">
            Ajoutez une nouvelle offre d'emploi à la plateforme
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12 -mt-8">
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Détails de l'offre</CardTitle>
            <p className="text-muted-foreground">
              Remplissez ce formulaire pour publier une nouvelle offre sur le site public.
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
                      placeholder="Ex: AITECH CÔTE D'IVOIRE"
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
                    <Label htmlFor="company_email">Email de contact (Interne)</Label>
                    <Input
                      id="company_email"
                      name="company_email"
                      type="email"
                      value={formData.company_email}
                      onChange={handleChange}
                      placeholder="contact@entreprise.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_phone">Téléphone (Interne)</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="company_logo">Logo de l'entreprise (optionnel)</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        id="company_logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG ou JPEG (max 2MB)
                      </p>
                    </div>
                    {logoPreview && (
                      <div className="w-20 h-20 border-2 rounded-lg overflow-hidden bg-white p-2">
                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain" />
                      </div>
                    )}
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
                        <SelectItem value="Alternance">Alternance</SelectItem>
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
                        <SelectItem value="Junior">Junior (0-2 ans)</SelectItem>
                        <SelectItem value="Confirmé">Confirmé (2-5 ans)</SelectItem>
                        <SelectItem value="Senior">Senior (5-10 ans)</SelectItem>
                        <SelectItem value="Expert">Expert (10+ ans)</SelectItem>
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

              {/* Publier immédiatement */}
              <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div>
                  <Label htmlFor="is_active" className="text-base font-medium">Publier immédiatement</Label>
                  <p className="text-sm text-muted-foreground mt-1">L'offre sera visible sur le site dès sa création</p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>

              <div className="pt-6 border-t flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      Créer l'offre
                      <Save className="ml-2" size={20} />
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/admin/jobs")}
                  disabled={loading}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}