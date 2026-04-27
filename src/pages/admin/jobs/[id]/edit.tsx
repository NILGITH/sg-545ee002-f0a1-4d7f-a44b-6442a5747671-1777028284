import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { jobsService } from "@/services/jobsService";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Save, Upload, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

export default function EditJobPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    location: "",
    contract_type: "CDI",
    sector: "",
    salary_range: "",
    experience_level: "",
    description: "",
    requirements: "",
    company_logo_url: "",
  });

  useEffect(() => {
    if (!authLoading && isAdmin && id && typeof id === "string") {
      loadJob(id);
    }
  }, [authLoading, isAdmin, id]);

  const loadJob = async (jobId: string) => {
    setLoading(true);
    const { data, error } = await jobsService.getJobById(jobId);
    if (data) {
      setFormData({
        title: data.title || "",
        company_name: data.company_name || "",
        location: data.location || "",
        contract_type: data.contract_type || "CDI",
        sector: data.sector || "",
        salary_range: data.salary_range || "",
        experience_level: data.experience_level || "",
        description: data.description || "",
        requirements: data.requirements || "",
        company_logo_url: data.company_logo_url || "",
      });
      if (data.company_logo_url) {
        setImagePreview(data.company_logo_url);
      }
    } else if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'offre",
        variant: "destructive",
      });
      router.push("/admin/jobs");
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from("job-images")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: "Erreur",
        description: "Impossible d'uploader l'image",
        variant: "destructive",
      });
      setUploadingImage(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("job-images")
      .getPublicUrl(filePath);

    setFormData({ ...formData, company_logo_url: publicUrl });
    setImagePreview(publicUrl);
    setUploadingImage(false);

    toast({
      title: "Image uploadée",
      description: "L'image a été uploadée avec succès",
    });
  };

  const removeImage = () => {
    setFormData({ ...formData, company_logo_url: "" });
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || typeof id !== "string") return;

    setSubmitting(true);

    const { error } = await jobsService.updateJob(id, {
      title: formData.title,
      company_name: formData.company_name,
      location: formData.location,
      contract_type: formData.contract_type,
      sector: formData.sector,
      salary_range: formData.salary_range,
      experience_level: formData.experience_level,
      description: formData.description,
      requirements: formData.requirements,
      company_logo_url: formData.company_logo_url,
    });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'offre",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Offre mise à jour",
        description: "L'offre a été mise à jour avec succès",
      });
      router.push("/admin/jobs");
    }

    setSubmitting(false);
  };

  if (authLoading || !isAdmin || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Modifier l'offre - Admin - HR Talents Partners"
        description="Modifiez une offre d'emploi"
      />
      
      <Navigation />
      
      <div className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/admin/jobs">
              <ArrowLeft size={18} className="mr-2" />
              Retour à la gestion des offres
            </Link>
          </Button>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-serif text-3xl">Modifier l'offre</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Logo entreprise */}
                <div className="space-y-2">
                  <Label>Logo de l'entreprise</Label>
                  {imagePreview ? (
                    <div className="relative w-32 h-32 border-2 rounded-lg p-2">
                      <Image
                        src={imagePreview}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Upload size={32} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {uploadingImage ? "Upload en cours..." : "Cliquez pour uploader le logo"}
                          </span>
                        </div>
                      </Label>
                    </div>
                  )}
                </div>

                {/* Informations Entreprise */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold">📋 Informations Entreprise</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_name">Nom de l'entreprise *</Label>
                      <Input
                        id="company_name"
                        required
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sector">Secteur d'activité</Label>
                      <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                        <SelectTrigger id="sector">
                          <SelectValue placeholder="Sélectionnez un secteur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Informatique / IT">Informatique / IT</SelectItem>
                          <SelectItem value="Finance / Banque">Finance / Banque</SelectItem>
                          <SelectItem value="Commerce / Vente">Commerce / Vente</SelectItem>
                          <SelectItem value="Industrie / Production">Industrie / Production</SelectItem>
                          <SelectItem value="Santé / Médical">Santé / Médical</SelectItem>
                          <SelectItem value="Éducation / Formation">Éducation / Formation</SelectItem>
                          <SelectItem value="Marketing / Communication">Marketing / Communication</SelectItem>
                          <SelectItem value="Logistique / Transport">Logistique / Transport</SelectItem>
                          <SelectItem value="BTP / Construction">BTP / Construction</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Détails du poste */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold">💼 Détails du poste</h3>
                  
                  <div>
                    <Label htmlFor="title">Titre du poste *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="Ex: Développeur Full Stack Senior"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Lieu *</Label>
                      <Input
                        id="location"
                        required
                        placeholder="Ex: Abidjan, Plateau"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="contract_type">Type de contrat *</Label>
                      <Select value={formData.contract_type} onValueChange={(value) => setFormData({ ...formData, contract_type: value })}>
                        <SelectTrigger id="contract_type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CDI">CDI</SelectItem>
                          <SelectItem value="CDD">CDD</SelectItem>
                          <SelectItem value="Stage">Stage</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salary_range">Fourchette de salaire</Label>
                      <Input
                        id="salary_range"
                        placeholder="Ex: 500 000 - 800 000 FCFA"
                        value={formData.salary_range}
                        onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience_level">Niveau d'expérience</Label>
                      <Input
                        id="experience_level"
                        placeholder="Ex: 3-5 ans"
                        value={formData.experience_level}
                        onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description du poste *</Label>
                    <Textarea
                      id="description"
                      required
                      rows={6}
                      placeholder="Décrivez le poste, les missions principales, les responsabilités..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Profil recherché</Label>
                    <Textarea
                      id="requirements"
                      rows={6}
                      placeholder="Compétences requises, diplômes, expériences, qualités personnelles..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={18} />
                        Mise à jour en cours...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={18} />
                        Enregistrer les modifications
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/jobs">Annuler</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
}