import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cvService } from "@/services/cvService";
import { FileText, Eye, Download, Search, Calendar, User } from "lucide-react";
import Link from "next/link";

type CV = {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  is_current: boolean;
  uploaded_at: string;
  candidates: {
    full_name: string;
    email: string;
    phone: string;
  } | null;
};

export default function AdminCVs() {
  const router = useRouter();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [filteredCvs, setFilteredCvs] = useState<CV[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadCVs();
    }
  }, [authLoading, isAdmin]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cvs.filter(
        (cv) =>
          cv.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cv.candidates?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cv.candidates?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCvs(filtered);
    } else {
      setFilteredCvs(cvs);
    }
  }, [searchTerm, cvs]);

  const loadCVs = async () => {
    try {
      const data = await cvService.getAllCVs();
      setCvs(data);
      setFilteredCvs(data);
    } catch (error) {
      console.error("Error loading CVs:", error);
    }
    setLoading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
      <SEO title="Gestion des CV - Admin" description="Gérez tous les CV des candidats" />
      
      <Navigation />
      
      <main className="min-h-[calc(100vh-80px)] bg-muted/30 py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Gestion des CV</h1>
              <p className="text-muted-foreground">
                {cvs.length} CV au total
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Retour au tableau de bord</Link>
            </Button>
          </div>

          {/* Search */}
          <Card className="border-2 mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, email ou fichier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* CV List */}
          <div className="space-y-4">
            {filteredCvs.length === 0 ? (
              <Card className="border-2">
                <CardContent className="py-12 text-center">
                  <FileText className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Aucun CV trouvé" : "Aucun CV pour le moment"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredCvs.map((cv) => (
                <Card key={cv.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="text-accent" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{cv.file_name}</h3>
                            {cv.is_current && (
                              <Badge className="bg-accent">CV Actuel</Badge>
                            )}
                          </div>
                          
                          {cv.candidates && (
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center gap-2 text-sm">
                                <User size={14} className="text-muted-foreground" />
                                <span className="font-medium">{cv.candidates.full_name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{cv.candidates.email}</span>
                                {cv.candidates.phone && (
                                  <>
                                    <span>•</span>
                                    <span>{cv.candidates.phone}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>{formatFileSize(cv.file_size)}</span>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{new Date(cv.uploaded_at).toLocaleDateString("fr-FR")}</span>
                            </div>
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
                        <Button asChild variant="outline" size="sm">
                          <a href={cv.file_url} download>
                            <Download className="mr-2" size={14} />
                            Télécharger
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}