import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Briefcase, DollarSign, Clock, Calendar, ArrowLeft, Send, Loader2 } from "lucide-react";
import { jobsService } from "@/services/jobsService";
import { applicationsService } from "@/services/applicationsService";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });

  useEffect(() => {
    if (id && typeof id === "string") {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    setLoading(true);
    const { data, error } = await jobsService.getJobById(jobId);
    if (data) {
      setJob(data);
    } else if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger l'offre d'emploi",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSubmitting(true);
    
    try {
      // Candidature anonyme - pas besoin de user_id
      const { error } = await applicationsService.submitApplication({
        job_id: job.id,
        candidate_name: formData.full_name,
        candidate_email: formData.email,
        candidate_phone: formData.phone,
        cover_letter: formData.cover_letter,
        status: "pending",
        user_id: null, // Candidature anonyme
      });

      if (error) {
        console.error("Application error:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer votre candidature. Veuillez réessayer.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Candidature envoyée !",
          description: "Nous vous contacterons prochainement.",
        });
        setFormData({ full_name: "", email: "", phone: "", cover_letter: "" });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    }
    
    setSubmitting(false);
  };

  const formatSalary = (range?: string | null) => {
    if (!range) return "À négocier";
    return range;
  };

  const getContractTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "CDI": "CDI",
      "CDD": "CDD",
      "Stage": "Stage",
      "Freelance": "Freelance",
      "Temps partiel": "Temps partiel"
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={48} />
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="font-serif text-3xl font-bold">Offre introuvable</h1>
            <p className="text-muted-foreground">Cette offre d'emploi n'existe pas ou n'est plus disponible.</p>
            <Button asChild>
              <Link href="/jobs">Retour aux offres</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${job.title} - ${job.company_name} | HR Talents Partners`}
        description={job.description?.substring(0, 155) || `Offre d'emploi ${job.title} chez ${job.company_name}`}
      />
      
      <Navigation />
      
      <main className="min-h-screen py-12">
        <div className="container">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/jobs">
              <ArrowLeft size={18} className="mr-2" />
              Retour aux offres
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h1 className="font-serif text-3xl md:text-4xl font-bold">
                    {job.title}
                  </h1>
                  <Badge className="bg-accent text-accent-foreground text-base px-4 py-1">
                    {getContractTypeLabel(job.contract_type)}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground font-medium mb-6">{job.company_name}</p>

                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{job.location}</span>
                  </div>
                  {job.sector && (
                    <div className="flex items-center gap-2">
                      <Briefcase size={20} />
                      <span>{job.sector}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} />
                    <span>{formatSalary(job.salary_range)}</span>
                  </div>
                  {job.experience_level && (
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>{job.experience_level}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>Publié le {new Date(job.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Description du poste</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-line text-foreground/90">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              {job.requirements && (
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">Profil recherché</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-slate max-w-none">
                    <p className="whitespace-pre-line text-foreground/90">
                      {job.requirements}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Application Form */}
            <div>
              <Card className="border-2 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Postuler</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="cover">Lettre de motivation</Label>
                      <Textarea
                        id="cover"
                        rows={6}
                        placeholder="Expliquez pourquoi ce poste vous intéresse..."
                        value={formData.cover_letter}
                        onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={18} />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Envoyer ma candidature
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      En soumettant ce formulaire, vous acceptez que vos données soient traitées 
                      dans le cadre de votre candidature.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}