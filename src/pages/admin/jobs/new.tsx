import { useState } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { jobsService } from "@/services/jobsService";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await jobsService.createJob(formData);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'offre d'emploi",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Offre créée !",
        description: "L'offre d'emploi a été publiée avec succès",
      });
      router.push("/admin/jobs");
    }
    setLoading(false);
  };

  return (
    <>
      <SEO 
        title="Nouvelle offre - Admin - HR Talents Partners"
        description="Créer une nouvelle offre d'emploi"
      />
      
      <Navigation />
      
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/admin/jobs">
              <ArrowLeft size={18} className="mr-2" />
              Retour aux offres
            </Link>
          </Button>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-serif">Nouvelle offre d'emploi</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Titre du poste *</Label>
                    <Input
                      id="title"
                      required
                      placeholder="Ex: Responsable RH Senior"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise *</Label>
                    <Input
                      id="company"
                      required
                      placeholder="Nom de l'entreprise"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Localisation *</Label>
                    <Input
                      id="location"
                      required
                      placeholder="Ex: Kinshasa, RD Congo"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contract">Type de contrat *</Label>
                    <Select value={formData.contract_type} onValueChange={(value) => setFormData({ ...formData, contract_type: value })}>
                      <SelectTrigger id="contract">
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

                  <div>
                    <Label htmlFor="sector">Secteur d'activité</Label>
                    <Input
                      id="sector"
                      placeholder="Ex: Finance, IT, Santé..."
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="salary">Fourchette de salaire</Label>
                    <Input
                      id="salary"
                      placeholder="Ex: 1000 - 1500 USD"
                      value={formData.salary_range}
                      onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Niveau d'expérience</Label>
                    <Input
                      id="experience"
                      placeholder="Ex: 3-5 ans d'expérience"
                      value={formData.experience_level}
                      onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description du poste *</Label>
                    <Textarea
                      id="description"
                      required
                      rows={8}
                      placeholder="Décrivez le poste, les responsabilités, l'environnement de travail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="requirements">Profil recherché</Label>
                    <Textarea
                      id="requirements"
                      rows={6}
                      placeholder="Compétences requises, formations, expériences..."
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between p-4 border-2 rounded-lg">
                    <div>
                      <Label htmlFor="active" className="text-base font-semibold">
                        Publier immédiatement
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        L'offre sera visible sur le site dès sa création
                      </p>
                    </div>
                    <Switch
                      id="active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin" size={18} />
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={18} />
                        Créer l'offre
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
      </main>

      <Footer />
    </>
  );
}