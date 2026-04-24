import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Users, FileText, TrendingUp, PlusCircle, Settings, LogOut, Upload, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalCVs: 0,
    pendingSubmissions: 0,
  });

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const loadStats = async () => {
    setLoading(true);

    const [jobsData, applicationsData, cvsData, submissionsData] = await Promise.all([
      supabase.from("jobs").select("id, is_active", { count: "exact" }),
      supabase.from("applications").select("id, status", { count: "exact" }),
      supabase.from("candidate_cvs").select("id", { count: "exact" }),
      supabase.from("job_submissions").select("id, status", { count: "exact" }),
    ]);

    const totalJobs = jobsData.count || 0;
    const activeJobs = jobsData.data?.filter(j => j.is_active).length || 0;
    const totalApplications = applicationsData.count || 0;
    const pendingApplications = applicationsData.data?.filter(a => a.status === "pending").length || 0;
    const totalCVs = cvsData.count || 0;
    const pendingSubmissions = submissionsData.data?.filter(s => s.status === "pending").length || 0;

    setStats({
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      totalCVs,
      pendingSubmissions,
    });
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <>
      <SEO 
        title="Tableau de bord Admin - HR Talents Partners"
        description="Interface d'administration"
      />
      
      <Navigation />
      
      <main className="min-h-screen py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Tableau de bord</h1>
              <p className="text-muted-foreground">Gérez vos offres d'emploi et candidatures</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut size={18} className="mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Offres
                </CardTitle>
                <Briefcase className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.activeJobs} actives
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Candidatures
                </CardTitle>
                <FileText className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.pendingApplications} en attente
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CV Candidats
                </CardTitle>
                <Upload className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.totalCVs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  CV dans la base
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Soumissions Entreprises
                </CardTitle>
                <CheckSquare className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.pendingSubmissions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  En attente de validation
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taux de réponse
                </CardTitle>
                <TrendingUp className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">
                  {stats.totalApplications > 0 
                    ? Math.round((stats.totalApplications - stats.pendingApplications) / stats.totalApplications * 100)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Candidatures traitées
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Candidats uniques
                </CardTitle>
                <Users className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.totalApplications}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Inscriptions totales
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="text-accent" size={24} />
                  Gestion des offres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Créez, modifiez et gérez vos offres d'emploi
                </p>
                <div className="flex gap-3">
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/admin/jobs/new">
                      <PlusCircle size={18} className="mr-2" />
                      Nouvelle offre
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/jobs">
                      <Settings size={18} className="mr-2" />
                      Gérer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-accent" size={24} />
                  Candidatures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Consultez et gérez les candidatures reçues
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/applications">
                    <FileText size={18} className="mr-2" />
                    Voir les candidatures
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="text-accent" size={24} />
                  CV Candidats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Consultez tous les CV des candidats inscrits
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/cvs">
                    <Upload size={18} className="mr-2" />
                    Gérer les CV
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="text-accent" size={24} />
                  Soumissions Entreprises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Validez les offres soumises par les entreprises
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/submissions">
                    <CheckSquare size={18} className="mr-2" />
                    Valider les offres
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}