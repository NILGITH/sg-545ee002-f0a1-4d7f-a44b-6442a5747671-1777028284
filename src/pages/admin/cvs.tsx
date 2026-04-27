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
import { ArrowLeft, Download, FileText, Mail, Phone, Calendar, Briefcase, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/integrations/supabase/types";

type Application = Database["public"]["Tables"]["applications"]["Row"] & {
  jobs?: { title: string; company_name: string } | null;
};

export default function AdminCVsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadCVs();
    }
  }, [authLoading, isAdmin]);

  const loadCVs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("applications")
      .select(`
        *,
        jobs (
          title,
          company_name
        )
      `)
      .not("cv_url", "is", null)
      .order("created_at", { ascending: false });
    
    setApplications(data || []);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", variant: "secondary" as const },
      reviewed: { label: "Examinée", variant: "default" as const },
      completed: { label: "Terminée", variant: "outline" as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge variant={config.variant} className={config.variant === "default" ? "bg-accent text-accent-foreground" : ""}>
        {config.label}
      </Badge>
    );
  };

  const downloadCV = (cvUrl: string, candidateName: string) => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = `CV_${candidateName.replace(/\s/g, "_")}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        title="Gestion des CVs - Admin - HR Talents Partners"
        description="Consultez et téléchargez les CVs des candidats"
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
                <h1 className="font-serif text-4xl font-bold">Gestion des CVs</h1>
                <p className="text-muted-foreground mt-1">{applications.length} CV{applications.length > 1 ? "s" : ""} reçu{applications.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
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
                <FileText className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-xl text-muted-foreground">
                  {filterStatus === "all" 
                    ? "Aucun CV reçu pour le moment" 
                    : "Aucun CV avec ce statut"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredApplications.map((app) => (
                <Card key={app.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl font-semibold">{app.candidate_name}</h3>
                          {getStatusBadge(app.status)}
                        </div>
                        {app.jobs && (
                          <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <Briefcase size={16} />
                            <span className="text-sm">{app.jobs.title} · {app.jobs.company_name}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => downloadCV(app.cv_url!, app.candidate_name)}
                      >
                        <Download size={16} className="mr-2" />
                        Télécharger
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>{app.candidate_email}</span>
                      </div>
                      {app.candidate_phone && (
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          <span>{app.candidate_phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>Reçu le {new Date(app.created_at).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </div>

                    {app.cv_url && (
                      <div className="mt-4 p-3 bg-accent/10 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="text-accent" size={20} />
                          <span className="text-sm font-medium">CV disponible</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                          className="hover:bg-accent/20"
                        >
                          <a href={app.cv_url} target="_blank" rel="noopener noreferrer">
                            Voir
                          </a>
                        </Button>
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