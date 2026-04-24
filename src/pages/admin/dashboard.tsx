import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Briefcase, Users, FileText, TrendingUp, PlusCircle, Settings, LogOut, Upload, CheckSquare, ShieldCheck, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, Star, Handshake } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const { loading: authLoading, isAdmin, isSuperAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    inactiveJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    totalCVs: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
    pendingServiceRequests: 0,
    completedServiceRequests: 0,
    totalServiceRequests: 0,
    totalTestimonials: 0,
    totalPartnerships: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadStats();
    }
  }, [authLoading, isAdmin]);

  const loadStats = async () => {
    setLoading(true);

    const [jobsData, applicationsData, cvsData, submissionsData, serviceRequestsData, testimonialsData, partnershipsData] = await Promise.all([
      supabase.from("jobs").select("id, is_active", { count: "exact" }),
      supabase.from("applications").select("id, status", { count: "exact" }),
      supabase.from("candidate_cvs").select("id", { count: "exact" }),
      supabase.from("job_submissions").select("id, status", { count: "exact" }),
      supabase.from("service_requests").select("id, status", { count: "exact" }),
      supabase.from("testimonials").select("id", { count: "exact" }),
      supabase.from("partnerships").select("id", { count: "exact" }),
    ]);

    const totalJobs = jobsData.count || 0;
    const activeJobs = jobsData.data?.filter(j => j.is_active).length || 0;
    const inactiveJobs = totalJobs - activeJobs;

    const totalApplications = applicationsData.count || 0;
    const pendingApplications = applicationsData.data?.filter(a => a.status === "pending").length || 0;
    const approvedApplications = applicationsData.data?.filter(a => a.status === "approved").length || 0;
    const rejectedApplications = applicationsData.data?.filter(a => a.status === "rejected").length || 0;

    const totalCVs = cvsData.count || 0;

    const pendingSubmissions = submissionsData.data?.filter(s => s.status === "pending").length || 0;
    const approvedSubmissions = submissionsData.data?.filter(s => s.status === "approved").length || 0;
    const rejectedSubmissions = submissionsData.data?.filter(s => s.status === "rejected").length || 0;

    const totalServiceRequests = serviceRequestsData.count || 0;
    const pendingServiceRequests = serviceRequestsData.data?.filter(s => s.status === "pending").length || 0;
    const completedServiceRequests = serviceRequestsData.data?.filter(s => s.status === "completed").length || 0;

    const totalTestimonials = testimonialsData.count || 0;
    const totalPartnerships = partnershipsData.count || 0;

    const conversionRate = totalApplications > 0 
      ? Math.round((approvedApplications / totalApplications) * 100)
      : 0;

    setStats({
      totalJobs,
      activeJobs,
      inactiveJobs,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalCVs,
      pendingSubmissions,
      approvedSubmissions,
      rejectedSubmissions,
      pendingServiceRequests,
      completedServiceRequests,
      totalServiceRequests,
      totalTestimonials,
      totalPartnerships,
      conversionRate,
    });
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Afficher un loader pendant la vérification d'authentification
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

  // Données pour les graphiques
  const applicationsChartData = [
    { name: "En attente", value: stats.pendingApplications, color: "#f59e0b" },
    { name: "Approuvées", value: stats.approvedApplications, color: "#10b981" },
    { name: "Rejetées", value: stats.rejectedApplications, color: "#ef4444" },
  ];

  const submissionsChartData = [
    { name: "En attente", value: stats.pendingSubmissions, color: "#f59e0b" },
    { name: "Approuvées", value: stats.approvedSubmissions, color: "#10b981" },
    { name: "Rejetées", value: stats.rejectedSubmissions, color: "#ef4444" },
  ];

  const activityData = [
    { name: "Offres", actives: stats.activeJobs, inactives: stats.inactiveJobs },
    { name: "Candidatures", approuvées: stats.approvedApplications, rejetées: stats.rejectedApplications },
    { name: "Soumissions", approuvées: stats.approvedSubmissions, rejetées: stats.rejectedSubmissions },
    { name: "Services", complétées: stats.completedServiceRequests, enAttente: stats.pendingServiceRequests },
  ];

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
              <p className="text-muted-foreground">Vue d'ensemble de votre activité RH</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut size={18} className="mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Stats principales */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Offres d'emploi
                </CardTitle>
                <Briefcase className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.totalJobs}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.activeJobs} actives · {stats.inactiveJobs} inactives
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
                  Dans la base de données
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taux d'approbation
                </CardTitle>
                <TrendingUp className="text-accent" size={20} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-serif">{stats.conversionRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Candidatures approuvées
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques statistiques */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Vue d'ensemble des candidatures</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationsChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {applicationsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Soumissions entreprises</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={submissionsChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {submissionsChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Graphique d'activité globale */}
          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle className="text-base">Activité globale</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="actives" stackId="a" fill="#10b981" name="Actives" />
                  <Bar dataKey="inactives" stackId="a" fill="#6b7280" name="Inactives" />
                  <Bar dataKey="approuvées" stackId="b" fill="#10b981" name="Approuvées" />
                  <Bar dataKey="rejetées" stackId="b" fill="#ef4444" name="Rejetées" />
                  <Bar dataKey="complétées" stackId="c" fill="#10b981" name="Complétées" />
                  <Bar dataKey="enAttente" stackId="c" fill="#f59e0b" name="En attente" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Statistiques détaillées */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="text-accent" size={20} />
                  Répartition Candidatures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="text-yellow-500" size={16} />
                    <span className="text-sm">En attente</span>
                  </div>
                  <span className="font-semibold">{stats.pendingApplications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm">Approuvées</span>
                  </div>
                  <span className="font-semibold">{stats.approvedApplications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-500" size={16} />
                    <span className="text-sm">Rejetées</span>
                  </div>
                  <span className="font-semibold">{stats.rejectedApplications}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckSquare className="text-accent" size={20} />
                  Soumissions Entreprises
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="text-yellow-500" size={16} />
                    <span className="text-sm">En attente</span>
                  </div>
                  <span className="font-semibold">{stats.pendingSubmissions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm">Approuvées</span>
                  </div>
                  <span className="font-semibold">{stats.approvedSubmissions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="text-red-500" size={16} />
                    <span className="text-sm">Rejetées</span>
                  </div>
                  <span className="font-semibold">{stats.rejectedSubmissions}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="text-accent" size={20} />
                  Demandes Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="text-yellow-500" size={16} />
                    <span className="text-sm">En attente</span>
                  </div>
                  <span className="font-semibold">{stats.pendingServiceRequests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm">Complétées</span>
                  </div>
                  <span className="font-semibold">{stats.completedServiceRequests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-blue-500" size={16} />
                    <span className="text-sm">Total</span>
                  </div>
                  <span className="font-semibold">{stats.totalServiceRequests}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <h2 className="font-serif text-2xl font-bold mb-4">Actions rapides</h2>
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

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-accent" size={24} />
                  Demandes de Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Gérez les demandes de Team Building, Formation, etc.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/service-requests">
                    <MessageSquare size={18} className="mr-2" />
                    Voir les demandes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="text-accent" size={24} />
                  Témoignages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Gérez les témoignages clients ({stats.totalTestimonials} total)
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/testimonials">
                    <Star size={18} className="mr-2" />
                    Gérer les témoignages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="text-accent" size={24} />
                  Partenariats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Gérez vos partenaires ({stats.totalPartnerships} total)
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/partnerships">
                    <Handshake size={18} className="mr-2" />
                    Gérer les partenariats
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {isSuperAdmin && (
              <Card className="border-2 hover:border-accent transition-colors bg-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="text-accent" size={24} />
                    Gestion des Utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Gérer les comptes administrateurs (Super Admin uniquement)
                  </p>
                  <Button asChild variant="outline" className="w-full border-accent">
                    <Link href="/admin/users">
                      <Users size={18} className="mr-2" />
                      Gérer les utilisateurs
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}