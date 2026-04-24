import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { jobsService } from "@/services/jobsService";
import { PlusCircle, Edit, Trash2, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

export default function AdminJobsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadJobs();
    }
  }, [authLoading, isAdmin]);

  const loadJobs = async () => {
    setLoading(true);
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  const toggleJobStatus = async (job: Job) => {
    const { error } = await jobsService.updateJob(job.id, { is_active: !job.is_active });
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'offre",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Statut modifié",
        description: `L'offre est maintenant ${!job.is_active ? "active" : "inactive"}`,
      });
      loadJobs();
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")) return;

    const { error } = await jobsService.deleteJob(id);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'offre",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Offre supprimée",
        description: "L'offre a été supprimée avec succès",
      });
      loadJobs();
    }
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gestion des offres - Admin - HR Talents Partners"
        description="Gérez vos offres d'emploi"
      />
      
      <Navigation />
      
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/admin/dashboard">
                  <ArrowLeft size={18} className="mr-2" />
                  Retour
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-4xl font-bold">Gestion des offres</h1>
                <p className="text-muted-foreground mt-1">{jobs.length} offre{jobs.length > 1 ? "s" : ""} au total</p>
              </div>
            </div>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/admin/jobs/new">
                <PlusCircle size={18} className="mr-2" />
                Nouvelle offre
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : jobs.length === 0 ? (
            <Card className="border-2">
              <CardContent className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">
                  Aucune offre d'emploi pour le moment
                </p>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/admin/jobs/new">
                    <PlusCircle size={18} className="mr-2" />
                    Créer la première offre
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="font-serif text-2xl font-semibold">{job.title}</h3>
                          <Badge variant={job.is_active ? "default" : "secondary"} className={job.is_active ? "bg-accent text-accent-foreground" : ""}>
                            {job.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-lg text-muted-foreground mb-2">{job.company_name}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.contract_type}</span>
                          {job.sector && (
                            <>
                              <span>•</span>
                              <span>{job.sector}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleJobStatus(job)}
                          title={job.is_active ? "Désactiver" : "Activer"}
                        >
                          {job.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          title="Modifier"
                        >
                          <Link href={`/admin/jobs/${job.id}/edit`}>
                            <Edit size={16} />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteJob(job.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}