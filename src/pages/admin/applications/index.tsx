import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { applicationsService } from "@/services/applicationsService";
import { ArrowLeft, Mail, Phone, Calendar, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/integrations/supabase/types";

type Application = Database["public"]["Tables"]["applications"]["Row"] & {
  jobs?: { title: string; company_name: string } | null;
};

type StatusType = "pending" | "reviewed" | "completed";

export default function AdminApplicationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadApplications();
    }
  }, [authLoading, isAdmin]);

  const loadApplications = async () => {
    setLoading(true);
    const { data } = await applicationsService.getAllApplications();
    setApplications(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: StatusType) => {
    const { error } = await applicationsService.updateApplicationStatus(id, newStatus);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Statut modifié",
        description: "Le statut de la candidature a été mis à jour",
      });
      loadApplications();
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", variant: "secondary" as const },
      reviewed: { label: "Examinée", variant: "default" as const },
      completed: { label: "Terminée", variant: "outline" as const },
    };
    const config = statusConfig[status as StatusType] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className={config.variant === "default" ? "bg-accent text-accent-foreground" : ""}>
        {config.label}
      </Badge>
    );
  };

  const filteredApplications = applications.filter((app) => {
    if (filterStatus === "all") return true;
    return app.status === filterStatus;
  });

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
        title="Gestion des candidatures - Admin - HR Talents Partners"
        description="Gérez les candidatures reçues"
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
                <h1 className="font-serif text-4xl font-bold">Gestion des candidatures</h1>
                <p className="text-muted-foreground mt-1">{applications.length} candidature{applications.length > 1 ? "s" : ""} au total</p>
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="reviewed">Examinée</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : filteredApplications.length === 0 ? (
            <Card className="border-2">
              <CardContent className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  {filterStatus === "all" 
                    ? "Aucune candidature pour le moment" 
                    : "Aucune candidature avec ce statut"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <Card key={app.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-2xl font-semibold">{app.candidate_name}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        {app.jobs && (
                          <p className="text-lg text-muted-foreground">
                            {app.jobs.title} chez {app.jobs.company_name}
                          </p>
                        )}
                      </div>
                      <Select 
                        value={app.status} 
                        onValueChange={(value) => updateStatus(app.id, value as StatusType)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="reviewed">Examinée</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{app.candidate_email}</span>
                      </div>
                      {app.candidate_phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={16} />
                          <span>{app.candidate_phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Reçue le {new Date(app.created_at).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>

                    {app.cover_letter && (
                      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-accent" />
                          <span className="font-medium text-sm">Lettre de motivation</span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {app.cover_letter}
                        </p>
                      </div>
                    )}
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