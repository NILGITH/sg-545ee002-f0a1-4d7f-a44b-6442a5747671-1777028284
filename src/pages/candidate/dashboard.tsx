import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { authService } from "@/services/authService";
import { candidateService } from "@/services/candidateService";
import { cvService } from "@/services/cvService";
import { Briefcase, FileText, User, LogOut, MapPin, Calendar, Eye, Upload, Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";

type Application = {
  id: string;
  status: string;
  created_at: string;
  jobs: {
    id: string;
    title: string;
    company: string;
    location: string;
    contract_type: string;
  } | null;
};

type CV = {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  is_current: boolean;
  uploaded_at: string;
};

export default function CandidateDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const session = await authService.getCurrentSession();
    if (!session) {
      router.push("/candidate/login");
      return;
    }

    setUserId(session.user.id);

    const { data: profileData } = await candidateService.getProfile(session.user.id);
    setProfile(profileData);

    const { data: appsData } = await candidateService.getUserApplications(session.user.id);
    setApplications(appsData || []);

    await loadCVs(session.user.id);

    setLoading(false);
  };

  const loadCVs = async (uid: string) => {
    try {
      const cvList = await cvService.getUserCVs(uid);
      setCvs(cvList);
    } catch (error) {
      console.error("Error loading CVs:", error);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Le fichier ne doit pas dépasser 5 Mo");
      return;
    }

    setUploading(true);
    try {
      await cvService.uploadCV(file, userId, profile?.id);
      await loadCVs(userId);
      alert("CV téléchargé avec succès !");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erreur lors du téléchargement du CV");
    }
    setUploading(false);
  };

  const handleSetCurrentCV = async (cvId: string) => {
    try {
      await cvService.setCurrentCV(cvId, userId);
      await loadCVs(userId);
      alert("CV défini comme actuel !");
    } catch (error) {
      console.error("Error setting current CV:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce CV ?")) return;

    try {
      await cvService.deleteCV(cvId, userId);
      await loadCVs(userId);
      alert("CV supprimé !");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Erreur lors de la suppression");
    }
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
                    <p className="text-sm text-muted-foreground">CV enregistrés</p>
                    <p className="text-2xl font-bold">{cvs.length}</p>
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
                    <p className="text-sm text-muted-foreground">En cours</p>
                    <p className="text-2xl font-bold">
                      {applications.filter((a) => a.status === "reviewing").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CV Management */}
          <Card className="border-2 mb-8">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Mes CV</CardTitle>
              <CardDescription>
                Téléchargez et gérez vos CV. Le CV actuel sera utilisé pour vos candidatures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload CV */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto text-muted-foreground mb-4" size={48} />
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <div className="space-y-2">
                    <p className="font-semibold">Télécharger un nouveau CV</p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX (max 5 Mo)
                    </p>
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                  <Button className="mt-4 bg-accent hover:bg-accent/90" disabled={uploading}>
                    {uploading ? "Téléchargement..." : "Choisir un fichier"}
                  </Button>
                </Label>
              </div>

              {/* CV List */}
              <div className="space-y-3">
                {cvs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun CV téléchargé. Ajoutez votre premier CV pour postuler aux offres.
                  </p>
                ) : (
                  cvs.map((cv) => (
                    <Card key={cv.id} className={cv.is_current ? "border-accent border-2" : ""}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <FileText className="text-accent" size={32} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{cv.file_name}</p>
                                {cv.is_current && (
                                  <Badge className="bg-accent">
                                    <CheckCircle size={12} className="mr-1" />
                                    CV actuel
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>{formatFileSize(cv.file_size)}</span>
                                <span>
                                  {new Date(cv.uploaded_at).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <a href={cv.file_url} target="_blank" rel="noopener noreferrer">
                                <Eye className="mr-2" size={14} />
                                Voir
                              </a>
                            </Button>
                            {!cv.is_current && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetCurrentCV(cv.id)}
                              >
                                Définir comme actuel
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCV(cv.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

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
                                  {application.jobs.company}
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