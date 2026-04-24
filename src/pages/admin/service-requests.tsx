import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { serviceRequestService } from "@/services/serviceRequestService";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, Users, MapPin, MessageSquare, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

type ServiceRequest = {
  id: string;
  request_type: string;
  status: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  message?: string;
  team_size?: number;
  preferred_date?: string;
  activity_type?: string;
  location_preference?: string;
  training_topic?: string;
  participants_count?: number;
  training_format?: string;
  admin_notes?: string;
  created_at: string;
};

export default function ServiceRequests() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadRequests();
    }
  }, [authLoading, isAdmin]);

  const loadRequests = async () => {
    try {
      const data = await serviceRequestService.getAllRequests();
      setRequests(data);
    } catch (error) {
      console.error("Error loading requests:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

  const handleUpdateStatus = async () => {
    if (!selectedRequest || !newStatus) return;

    try {
      await serviceRequestService.updateRequestStatus(
        selectedRequest.id,
        newStatus as "pending" | "in_progress" | "completed" | "cancelled",
        adminNotes || undefined
      );

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la demande a été modifié avec succès",
      });

      setShowDetailsDialog(false);
      loadRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      in_progress: "default",
      completed: "secondary",
      cancelled: "destructive",
    };

    const labels: Record<string, string> = {
      pending: "En attente",
      in_progress: "En cours",
      completed: "Terminée",
      cancelled: "Annulée",
    };

    return <Badge variant={variants[status] || "outline"}>{labels[status] || status}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    const labels: Record<string, string> = {
      team_building: "Team Building",
      formation: "Formation",
      recrutement: "Recrutement",
      analyse_salariale: "Analyse Salariale",
    };

    return <Badge variant="outline">{labels[type] || type}</Badge>;
  };

  const filteredRequests = requests.filter((req) => {
    if (filterType !== "all" && req.request_type !== filterType) return false;
    if (filterStatus !== "all" && req.status !== filterStatus) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <>
      <SEO title="Demandes de Services - Admin" description="Gestion des demandes de services" />
      <Navigation />

      <main className="min-h-screen bg-background py-12">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif mb-2">Demandes de Services</h1>
              <p className="text-muted-foreground">Gérer les demandes de Team Building, Formation, etc.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/admin/dashboard">Retour au tableau de bord</Link>
            </Button>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type de service</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="team_building">Team Building</SelectItem>
                      <SelectItem value="formation">Formation</SelectItem>
                      <SelectItem value="recrutement">Recrutement</SelectItem>
                      <SelectItem value="analyse_salariale">Analyse Salariale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in_progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminée</SelectItem>
                      <SelectItem value="cancelled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des demandes */}
          {filteredRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Aucune demande trouvée
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="hover:border-accent transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getTypeBadge(request.request_type)}
                          {getStatusBadge(request.status)}
                        </div>
                        <CardTitle className="text-xl">{request.company_name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Contact : {request.contact_name} • {request.email} • {request.phone}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setSelectedRequest(request);
                          setNewStatus(request.status);
                          setAdminNotes(request.admin_notes || "");
                          setShowDetailsDialog(true);
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      {request.request_type === "team_building" && (
                        <>
                          {request.team_size && (
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-muted-foreground" />
                              <span>{request.team_size} participants</span>
                            </div>
                          )}
                          {request.preferred_date && (
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-muted-foreground" />
                              <span>{new Date(request.preferred_date).toLocaleDateString("fr-FR")}</span>
                            </div>
                          )}
                          {request.activity_type && (
                            <div className="flex items-center gap-2">
                              <MessageSquare size={16} className="text-muted-foreground" />
                              <span>{request.activity_type}</span>
                            </div>
                          )}
                          {request.location_preference && (
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-muted-foreground" />
                              <span>{request.location_preference}</span>
                            </div>
                          )}
                        </>
                      )}

                      {request.request_type === "formation" && (
                        <>
                          {request.training_topic && (
                            <div className="flex items-center gap-2">
                              <MessageSquare size={16} className="text-muted-foreground" />
                              <span>{request.training_topic}</span>
                            </div>
                          )}
                          {request.participants_count && (
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-muted-foreground" />
                              <span>{request.participants_count} participants</span>
                            </div>
                          )}
                          {request.training_format && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-muted-foreground" />
                              <span>{request.training_format}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {request.message && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm">{request.message}</p>
                      </div>
                    )}

                    <div className="mt-4 text-xs text-muted-foreground">
                      Reçue le {new Date(request.created_at).toLocaleDateString("fr-FR")} à{" "}
                      {new Date(request.created_at).toLocaleTimeString("fr-FR")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialog détails */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>Modifier le statut et ajouter des notes</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Type :</span> {getTypeBadge(selectedRequest.request_type)}
                </div>
                <div>
                  <span className="font-semibold">Statut actuel :</span> {getStatusBadge(selectedRequest.status)}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Entreprise :</span> {selectedRequest.company_name}
                </div>
                <div className="col-span-2">
                  <span className="font-semibold">Contact :</span> {selectedRequest.contact_name}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nouveau statut</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminée</SelectItem>
                    <SelectItem value="cancelled">Annulée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes administratives</Label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ajouter des notes internes..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateStatus}>
              <CheckCircle2 className="mr-2" size={16} />
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}