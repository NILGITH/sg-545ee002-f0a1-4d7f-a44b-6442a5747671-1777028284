import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { partnershipsService } from "@/services/partnershipsService";
import { adminUsersService } from "@/services/adminUsersService";
import { PlusCircle, Edit, Trash2, ArrowLeft, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminPartnerships() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [partnerships, setPartnerships] = useState<Tables<"partnerships">[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState<Tables<"partnerships"> | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");

  const [newPartnership, setNewPartnership] = useState({
    company_name: "",
    website_url: "",
    description: "",
    category: "Client",
    display_order: 0,
  });

  const [editData, setEditData] = useState({
    company_name: "",
    website_url: "",
    description: "",
    category: "Client",
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    checkAuth();
    loadPartnerships();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const profile = await adminUsersService.getCurrentAdminProfile();
    if (!profile || !profile.is_active) {
      router.push("/admin/dashboard");
    }
  };

  const loadPartnerships = async () => {
    setLoading(true);
    try {
      const data = await partnershipsService.getAllPartnerships();
      setPartnerships(data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!newPartnership.company_name || !logoFile) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Nom et logo sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      const logoUrl = await partnershipsService.uploadPartnerLogo(logoFile);

      await partnershipsService.createPartnership({
        ...newPartnership,
        logo_url: logoUrl,
      });

      toast({
        title: "Succès",
        description: "Partenariat créé avec succès",
      });

      setShowCreateDialog(false);
      setNewPartnership({
        company_name: "",
        website_url: "",
        description: "",
        category: "Client",
        display_order: 0,
      });
      setLogoFile(null);
      setLogoPreview("");
      loadPartnerships();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedPartnership) return;

    try {
      let logoUrl = selectedPartnership.logo_url;
      if (logoFile) {
        logoUrl = await partnershipsService.uploadPartnerLogo(logoFile);
      }

      await partnershipsService.updatePartnership(selectedPartnership.id, {
        ...editData,
        logo_url: logoUrl,
      });

      toast({
        title: "Succès",
        description: "Partenariat mis à jour",
      });

      setShowEditDialog(false);
      setLogoFile(null);
      setLogoPreview("");
      loadPartnerships();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce partenariat ?")) return;

    try {
      await partnershipsService.deletePartnership(id);
      toast({
        title: "Succès",
        description: "Partenariat supprimé",
      });
      loadPartnerships();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEO title="Gestion des Partenariats - Admin" />
      <Navigation />
      
      <main className="min-h-screen py-12 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button asChild variant="ghost" className="mb-4">
                <Link href="/admin/dashboard">
                  <ArrowLeft size={18} className="mr-2" />
                  Retour au tableau de bord
                </Link>
              </Button>
              <h1 className="font-serif text-4xl font-bold">Gestion des Partenariats</h1>
              <p className="text-muted-foreground mt-2">
                Gérez vos clients et partenaires stratégiques
              </p>
            </div>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                  <PlusCircle size={18} className="mr-2" />
                  Nouveau partenariat
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un partenariat</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Nom de l'entreprise *</Label>
                    <Input
                      id="company_name"
                      value={newPartnership.company_name}
                      onChange={(e) => setNewPartnership({ ...newPartnership, company_name: e.target.value })}
                      placeholder="Orange CI"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo *</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                    {logoPreview && (
                      <img src={logoPreview} alt="Preview" className="w-32 h-32 object-contain border rounded p-2" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website_url">Site web</Label>
                    <Input
                      id="website_url"
                      value={newPartnership.website_url}
                      onChange={(e) => setNewPartnership({ ...newPartnership, website_url: e.target.value })}
                      placeholder="https://orange.ci"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newPartnership.description}
                      onChange={(e) => setNewPartnership({ ...newPartnership, description: e.target.value })}
                      placeholder="Partenaire depuis..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Input
                        id="category"
                        value={newPartnership.category}
                        onChange={(e) => setNewPartnership({ ...newPartnership, category: e.target.value })}
                        placeholder="Client, Partenaire..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display_order">Ordre d'affichage</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={newPartnership.display_order}
                        onChange={(e) => setNewPartnership({ ...newPartnership, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreate} className="bg-accent hover:bg-accent/90">
                    Créer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des partenariats ({partnerships.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Site web</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Ordre</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerships.map((partnership) => (
                    <TableRow key={partnership.id}>
                      <TableCell>
                        <img src={partnership.logo_url} alt={partnership.company_name} className="w-16 h-16 object-contain" />
                      </TableCell>
                      <TableCell className="font-medium">{partnership.company_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{partnership.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {partnership.website_url && (
                          <a href={partnership.website_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                            Visiter <ExternalLink size={14} />
                          </a>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={partnership.is_active ? "default" : "secondary"}>
                          {partnership.is_active ? "Actif" : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell>{partnership.display_order}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPartnership(partnership);
                              setEditData({
                                company_name: partnership.company_name,
                                website_url: partnership.website_url || "",
                                description: partnership.description || "",
                                category: partnership.category || "Client",
                                is_active: partnership.is_active,
                                display_order: partnership.display_order,
                              });
                              setLogoPreview(partnership.logo_url);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit size={14} className="mr-1" />
                            Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(partnership.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Dialog Modifier */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Modifier le partenariat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de l'entreprise *</Label>
                  <Input
                    value={editData.company_name}
                    onChange={(e) => setEditData({ ...editData, company_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  {logoPreview && (
                    <img src={logoPreview} alt="Preview" className="w-32 h-32 object-contain border rounded p-2" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Site web</Label>
                  <Input
                    value={editData.website_url}
                    onChange={(e) => setEditData({ ...editData, website_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Catégorie</Label>
                    <Input
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Ordre d'affichage</Label>
                    <Input
                      type="number"
                      value={editData.display_order}
                      onChange={(e) => setEditData({ ...editData, display_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editData.is_active}
                    onCheckedChange={(checked) => setEditData({ ...editData, is_active: checked })}
                  />
                  <Label>Actif</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleUpdate} className="bg-accent hover:bg-accent/90">
                  Mettre à jour
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </>
  );
}