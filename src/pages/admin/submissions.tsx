import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SEO } from "@/components/SEO";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { jobSubmissionService } from "@/services/jobSubmissionService";
import { Building2, CheckCircle, XCircle, Eye, Search, Calendar } from "lucide-react";
import Link from "next/link";

type Submission = {
  id: string;
  company_name: string;
  company_email: string;
  company_phone: string | null;
  job_title: string;
  job_description: string;
  contract_type: string;
  location: string;
  status: string;
  created_at: string;
  reviewed_at: string | null;
};

export default function AdminSubmissions() {
  const router = useRouter();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadSubmissions();
    }
  }, [authLoading, isAdmin]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = submissions.filter(
        (sub) =>
          sub.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [searchTerm, submissions]);

  const loadSubmissions = async () => {
    try {
      const data = await jobSubmissionService.getAllSubmissions();
      setSubmissions(data);
      setFilteredSubmissions(data);
    } catch (error) {
      console.error("Error loading submissions:", error);
    }
    setLoading(false);
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

  const handleApprove = async (submission: Submission) => {
    if (!confirm(`Approuver et publier l'offre "${submission.job_title}" ?`)) return;

    setProcessing(true);
    try {
      await jobSubmissionService.approveSubmission(submission.id, userId);
      alert("Offre approuvée et publiée avec succès !");
      await loadSubmissions();
    } catch (error) {
      console.error("Approval error:", error);
      alert("Erreur lors de l'approbation");
    }
    setProcessing(false);
  };

  const handleReject = async () => {
    if (!selectedSubmission || !rejectionReason.trim()) {
      alert("Veuillez indiquer une raison de rejet");
      return;
    }

    setProcessing(true);
    try {
      await jobSubmissionService.rejectSubmission(
        selectedSubmission.id,
        userId,
        rejectionReason
      );
      alert("Offre rejetée");
      await loadSubmissions();
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Erreur lors du rejet");
    }
    setProcessing(false);
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive"; label: string }> = {
      pending: { variant: "secondary", label: "En attente" },
      approved: { variant: "default", label: "Approuvée" },
      rejected: { variant: "destructive", label: "Rejetée" },
    };

    const { variant, label } = config[status] || { variant: "secondary", label: status };
    return <Badge variant={variant}>{label}</Badge>;
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
      <SEO title="Soumissions d'offres - Admin" description="Validez les offres soumises par les entreprises" />
      
      <Navigation />
      
      <main className="min-h-[calc(100vh-80px)] bg-muted/30 py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Soumissions d'Offres</h1>
              <p className="text-muted-foreground">
                {submissions.filter((s) => s.status === "pending").length} en attente de validation
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
                  placeholder="Rechercher par entreprise, poste ou localisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <div className="space-y-4">
            {filteredSubmissions.length === 0 ? (
              <Card className="border-2">
                <CardContent className="py-12 text-center">
                  <Building2 className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground">
                    {searchTerm ? "Aucune soumission trouvée" : "Aucune soumission pour le moment"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{submission.job_title}</h3>
                            {getStatusBadge(submission.status)}
                          </div>
                          <p className="text-muted-foreground mb-2">{submission.company_name}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>{submission.location}</span>
                            <span>•</span>
                            <span>{submission.contract_type}</span>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>Soumis le {new Date(submission.created_at).toLocaleDateString("fr-FR")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm mb-2"><strong>Description:</strong></p>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {submission.job_description}
                        </p>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm mb-2"><strong>Contact:</strong></p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{submission.company_email}</span>
                          {submission.company_phone && (
                            <>
                              <span>•</span>
                              <span>{submission.company_phone}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {submission.status === "pending" && (
                        <div className="flex gap-2 border-t pt-4">
                          <Button
                            onClick={() => handleApprove(submission)}
                            disabled={processing}
                            className="bg-accent hover:bg-accent/90"
                          >
                            <CheckCircle className="mr-2" size={16} />
                            Approuver et publier
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowRejectDialog(true);
                            }}
                            disabled={processing}
                          >
                            <XCircle className="mr-2" size={16} />
                            Rejeter
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter la soumission</DialogTitle>
            <DialogDescription>
              Indiquez la raison du rejet pour informer l'entreprise.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Raison du rejet</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                placeholder="Expliquez pourquoi cette offre est rejetée..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={processing}>
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}