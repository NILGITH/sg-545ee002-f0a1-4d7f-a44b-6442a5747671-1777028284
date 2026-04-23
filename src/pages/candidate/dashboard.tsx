import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { authService } from "@/services/authService";
import { candidateService } from "@/services/candidateService";
import { Briefcase, FileText, User, LogOut, MapPin, Calendar, Eye } from "lucide-react";
import Link from "next/link";

type Application = {
  id: string;
  status: string;
  created_at: string;
  jobs: {
    id: string;
    title: string;
    company_name: string;
    location: string;
    contract_type: string;
  } | null;
};

export default function CandidateDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { session } = await authService.getSession();
    if (!session) {
      router.push("/candidate/login");
      return;
    }

    // Load profile and applications
    const { data: profileData } = await candidateService.getProfile(session.user.id);
    setProfile(profileData);

    const { data: appsData } = await candidateService.getUserApplications(session.user.id);
    setApplications(appsData || []);

    setLoading(false);
  };

  const handleLogout = async () => {
    await authService.signOut();
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      reviewing: "default",
      accepted: "default",
      rejected: "destructive",
    };

    const labels: Record<string, string> = {
      pending: "En attente",
      reviewing: "En cours",
      accepted: "Acceptée",
      rejected: "Refusée",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center">
          <p>Chargement...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO title="Mon Espace Candidat" description="Gérez votre profil et vos candidatures" />
      
      <Navigation />
      
      <main className="min-h-[calc(100vh-80px)] bg-muted/30 py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Mon Espace</h1>
              <p className="text-muted-foreground">
                Bienvenue, {profile?.full_name || "Candidat"}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2" size={16} />
              Déconnexion
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Briefcase className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Candidatures</p>
                    <p className="text-2xl font-bold">{applications.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <FileText className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En cours</p>
                    <p className="text-2xl font-bold">
                      {applications.filter((a) => a.status === "reviewing").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Profil</p>
                    <Button asChild variant="link" className="text-accent p-0 h-auto">
                      <Link href="/candidate/profile">Modifier</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications List */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Mes Candidatures</CardTitle>
              <CardDescription>
                Suivez l'état d'avancement de vos candidatures
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore de candidatures
                  </p>
                  <Button asChild className="bg-accent hover:bg-accent/90">
                    <Link href="/jobs">Voir les offres d'emploi</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg">
                                {application.jobs?.title || "Offre supprimée"}
                              </h3>
                              {getStatusBadge(application.status)}
                            </div>
                            {application.jobs && (
                              <>
                                <p className="text-muted-foreground mb-2">
                                  {application.jobs.company_name}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <span>{application.jobs.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Briefcase size={14} />
                                    <span>{application.jobs.contract_type}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    <span>
                                      Candidaté le{" "}
                                      {new Date(application.created_at).toLocaleDateString("fr-FR")}
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          {application.jobs && (
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/jobs/${application.jobs.id}`}>
                                <Eye className="mr-2" size={14} />
                                Voir l'offre
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}