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
import { supabase } from "@/integrations/supabase/client";
import { applicationsService } from "@/services/applicationsService";
import { ArrowLeft, Mail, Phone, FileText, Loader2, Calendar } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/integrations/supabase/types";

type Application = Database["public"]["Tables"]["applications"]["Row"] & {
  jobs?: {
    title: string;
    company_name: string;
  };
};

export default function AdminApplicationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

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

  const updateStatus = async (id: string, status: string) => {
    const { error } = await applicationsService.updateApplicationStatus(id, status);
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la candidature a été modifié",
      });
      loadApplications();
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "En attente", className: "bg-yellow-500 text-white" },
      reviewed: { label: "Examinée", className: "bg-blue-500 text-white" },
      accepted: { label: "Acceptée", className: "bg-green-500 text-white" },
      rejected: { label: "Refusée", className: "bg-red-500 text-white" },
    };
    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
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
                <p className="text-muted-foreground mt-1">
                  {filteredApplications.length} candidature{filteredApplications.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="w-48">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="reviewed">Examinées</SelectItem>
                  <SelectItem value="accepted">Acceptées</SelectItem>
                  <SelectItem value="rejected">Refusées</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : filteredApplications.length === 0 ? (
            <Card className="border-2">
              <CardContent className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  {filter === "all" 
                    ? "Aucune candidature pour le moment"
                    : "Aucune candidature avec ce statut"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((application) => (
                <Card key={application.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-2xl font-semibold">
                              {application.candidate_name}
                            </h3>
                            {getStatusBadge(application.status)}
                          </div>
                          {application.jobs && (
                            <p className="text-lg text-muted-foreground mb-3">
                              {application.jobs.title} chez {application.jobs.company_name}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Mail size={14} />
                              {application.candidate_email}
                            </span>
                            <span className="flex items-center gap-2">
                              <Phone size={14} />
                              {application.candidate_phone}
                            </span>
                            <span className="flex items-center gap-2">
                              <Calendar size={14} />
                              {new Date(application.created_at).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                        </div>

                        <div className="w-48">
                          <Select 
                            value={application.status} 
                            onValueChange={(value) => updateStatus(application.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="reviewed">Examinée</SelectItem>
                              <SelectItem value="accepted">Acceptée</SelectItem>
                              <SelectItem value="rejected">Refusée</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {application.cover_letter && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText size={16} className="text-accent" />
                            <span className="font-semibold text-sm">Lettre de motivation</span>
                          </div>
                          <p className="text-sm text-foreground/80 whitespace-pre-line">
                            {application.cover_letter}
                          </p>
                        </div>
                      )}
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