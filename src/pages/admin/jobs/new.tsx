import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<JobInsert>>({
    company_name: "",
    company_email: "",
    company_phone: "",
    job_title: "",
    location: "",
    contract_type: "CDD",
    industry: "",
    salary_min: undefined,
    salary_max: undefined,
    experience_required: "",
    description: "",
    profile: "",
    status: "published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("jobs")
        .insert([formData as JobInsert])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "✅ Offre créée avec succès",
        description: "L'offre a été publiée et est maintenant visible sur le site.",
      });

      router.push("/admin/jobs");
    } catch (error: unknown) {
      console.error("Erreur création offre:", error);
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: error instanceof Error ? error.message : "Impossible de créer l'offre",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border py-12">
        <div className="container mx-auto px-4">
          <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft size={16} />
            Retour aux offres
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="p-3 bg-accent/20 rounded-lg">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Nouvelle Offre d'Emploi</h1>
              <p className="text-muted-foreground mt-1">Créez une nouvelle offre d'emploi pour votre entreprise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations Entreprise */}
            <div>
              <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">📋</span> Informations Entreprise
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company_name">Nom de l'entreprise *</Label>
                  <Input
                    id="company_name"
                    required
                    value={formData.company_name || ""}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="AITECH CÔTE D'IVOIRE"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Secteur d'activité</Label>
                  <Select value={formData.industry || ""} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informatique / IT">Informatique / IT</SelectItem>
                      <SelectItem value="Finance / Banque">Finance / Banque</SelectItem>
                      <SelectItem value="Commerce / Vente">Commerce / Vente</SelectItem>
                      <SelectItem value="Santé">Santé</SelectItem>
                      <SelectItem value="Éducation">Éducation</SelectItem>
                      <SelectItem value="Industrie">Industrie</SelectItem>
                      <SelectItem value="BTP / Construction">BTP / Construction</SelectItem>
                      <SelectItem value="Télécommunications">Télécommunications</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="company_email">Email de contact *</Label>
                  <Input
                    id="company_email"
                    type="email"
                    required
                    value={formData.company_email || ""}
                    onChange={(e) => setFormData({ ...formData, company_email: e.target.value })}
                    placeholder="contact@entreprise.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company_phone">Téléphone</Label>
                  <Input
                    id="company_phone"
                    value={formData.company_phone || ""}
                    onChange={(e) => setFormData({ ...formData, company_phone: e.target.value })}
                    placeholder="+225 27 XX XX XX XX"
                  />
                </div>
              </div>
            </div>

            {/* Détails de l'offre */}
            <div>
              <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <span className="text-accent">💼</span> Détails de l'offre
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="job_title">Titre du poste *</Label>
                  <Input
                    id="job_title"
                    required
                    value={formData.job_title || ""}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    placeholder="Ex: Développeur Full Stack"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Localisation *</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Ex: ABIDJAN"
                  />
                </div>
                <div>
                  <Label htmlFor="contract_type">Type de contrat *</Label>
                  <Select 
                    value={formData.contract_type || "CDD"} 
                    onValueChange={(value) => setFormData({ ...formData, contract_type: value as "CDD" | "CDI" | "Stage" | "Freelance" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CDD">CDD</SelectItem>
                      <SelectItem value="CDI">CDI</SelectItem>
                      <SelectItem value="Stage">Stage</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary_min">Fourchette de salaire</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    value={formData.salary_min || ""}
                    onChange={(e) => setFormData({ ...formData, salary_min: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="Minimum (FCFA)"
                  />
                </div>
                <div>
                  <Label htmlFor="salary_max">Salaire maximum</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    value={formData.salary_max || ""}
                    onChange={(e) => setFormData({ ...formData, salary_max: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="Maximum (FCFA)"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="experience_required">Niveau d'expérience</Label>
                  <Input
                    id="experience_required"
                    value={formData.experience_required || ""}
                    onChange={(e) => setFormData({ ...formData, experience_required: e.target.value })}
                    placeholder="Ex: 3 ans"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description du poste *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={6}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Décrivez les missions, responsabilités et environnement de travail..."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="profile">Profil recherché</Label>
                  <Textarea
                    id="profile"
                    rows={6}
                    value={formData.profile || ""}
                    onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    placeholder="Compétences requises, qualifications, soft skills..."
                  />
                </div>
              </div>
            </div>

            {/* Publier immédiatement */}
            <div className="flex items-center justify-between p-4 bg-accent/5 rounded-lg border border-accent/20">
              <div>
                <Label htmlFor="status" className="text-base font-medium">Publier immédiatement</Label>
                <p className="text-sm text-muted-foreground mt-1">L'offre sera visible sur le site dès sa création</p>
              </div>
              <Switch
                id="status"
                checked={formData.status === "published"}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "published" : "draft" })}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Créer l'offre
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/jobs")}
                disabled={loading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}