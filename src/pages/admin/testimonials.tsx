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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { testimonialsService } from "@/services/testimonialsService";
import { adminUsersService } from "@/services/adminUsersService";
import { PlusCircle, Edit, Trash2, Upload, Star, ArrowLeft } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AdminTestimonials() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Tables<"testimonials">[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Tables<"testimonials"> | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [newTestimonial, setNewTestimonial] = useState({
    author_name: "",
    author_position: "",
    author_company: "",
    content: "",
    rating: 5,
    is_featured: false,
    display_order: 0,
  });

  const [editData, setEditData] = useState({
    author_name: "",
    author_position: "",
    author_company: "",
    content: "",
    rating: 5,
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    checkAuth();
    loadTestimonials();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const hasPrivilege = await adminUsersService.hasPrivilege();
    if (!hasPrivilege) {
      router.push("/admin/dashboard");
    }
  };

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const data = await testimonialsService.getAllTestimonials();
      setTestimonials(data);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!newTestimonial.author_name || !newTestimonial.author_company || !newTestimonial.content) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    try {
      let photoUrl = "";
      if (photoFile) {
        photoUrl = await testimonialsService.uploadAuthorPhoto(photoFile);
      }

      await testimonialsService.createTestimonial({
        ...newTestimonial,
        author_photo_url: photoUrl,
      });

      toast({
        title: "Succès",
        description: "Témoignage créé avec succès",
      });

      setShowCreateDialog(false);
      setNewTestimonial({
        author_name: "",
        author_position: "",
        author_company: "",
        content: "",
        rating: 5,
        is_featured: false,
        display_order: 0,
      });
      setPhotoFile(null);
      setPhotoPreview("");
      loadTestimonials();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async () => {
    if (!selectedTestimonial) return;

    try {
      let photoUrl = selectedTestimonial.author_photo_url;
      if (photoFile) {
        photoUrl = await testimonialsService.uploadAuthorPhoto(photoFile);
      }

      await testimonialsService.updateTestimonial(selectedTestimonial.id, {
        ...editData,
        author_photo_url: photoUrl,
      });

      toast({
        title: "Succès",
        description: "Témoignage mis à jour",
      });

      setShowEditDialog(false);
      setPhotoFile(null);
      setPhotoPreview("");
      loadTestimonials();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) return;

    try {
      await testimonialsService.deleteTestimonial(id);
      toast({
        title: "Succès",
        description: "Témoignage supprimé",
      });
      loadTestimonials();
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
      <SEO title="Gestion des Témoignages - Admin" />
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
              <h1 className="font-serif text-4xl font-bold">Gestion des Témoignages</h1>
              <p className="text-muted-foreground mt-2">
                Gérez les avis et témoignages de vos clients
              </p>
            </div>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                  <PlusCircle size={18} className="mr-2" />
                  Nouveau témoignage
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Créer un témoignage</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="author_name">Nom de l'auteur *</Label>
                      <Input
                        id="author_name"
                        value={newTestimonial.author_name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, author_name: e.target.value })}
                        placeholder="Marie Kouadio"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author_position">Poste</Label>
                      <Input
                        id="author_position"
                        value={newTestimonial.author_position}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, author_position: e.target.value })}
                        placeholder="Directrice RH"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_company">Entreprise *</Label>
                    <Input
                      id="author_company"
                      value={newTestimonial.author_company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, author_company: e.target.value })}
                      placeholder="Orange CI"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo de l'auteur</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                      <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Témoignage *</Label>
                    <Textarea
                      id="content"
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                      placeholder="Un excellent partenaire RH..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating">Note (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display_order">Ordre d'affichage</Label>
                      <Input
                        id="display_order"
                        type="number"
                        value={newTestimonial.display_order}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={newTestimonial.is_featured}
                      onCheckedChange={(checked) => setNewTestimonial({ ...newTestimonial, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">En vedette</Label>
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
              <CardTitle>Liste des témoignages ({testimonials.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Ordre</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {testimonial.author_photo_url && (
                            <img src={testimonial.author_photo_url} alt={testimonial.author_name} className="w-10 h-10 rounded-full object-cover" />
                          )}
                          <div>
                            <div className="font-medium">{testimonial.author_name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.author_position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{testimonial.author_company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                            {testimonial.is_active ? "Actif" : "Inactif"}
                          </Badge>
                          {testimonial.is_featured && (
                            <Badge className="bg-accent">Vedette</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{testimonial.display_order}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedTestimonial(testimonial);
                              setEditData({
                                author_name: testimonial.author_name,
                                author_position: testimonial.author_position || "",
                                author_company: testimonial.author_company,
                                content: testimonial.content,
                                rating: testimonial.rating || 5,
                                is_featured: testimonial.is_featured,
                                is_active: testimonial.is_active,
                                display_order: testimonial.display_order,
                              });
                              setPhotoPreview(testimonial.author_photo_url || "");
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit size={14} className="mr-1" />
                            Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(testimonial.id)}
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
                <DialogTitle>Modifier le témoignage</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de l'auteur *</Label>
                    <Input
                      value={editData.author_name}
                      onChange={(e) => setEditData({ ...editData, author_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Poste</Label>
                    <Input
                      value={editData.author_position}
                      onChange={(e) => setEditData({ ...editData, author_position: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Entreprise *</Label>
                  <Input
                    value={editData.author_company}
                    onChange={(e) => setEditData({ ...editData, author_company: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Photo de l'auteur</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {photoPreview && (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Témoignage *</Label>
                  <Textarea
                    value={editData.content}
                    onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Note (1-5)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={editData.rating}
                      onChange={(e) => setEditData({ ...editData, rating: parseInt(e.target.value) })}
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

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editData.is_featured}
                      onCheckedChange={(checked) => setEditData({ ...editData, is_featured: checked })}
                    />
                    <Label>En vedette</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editData.is_active}
                      onCheckedChange={(checked) => setEditData({ ...editData, is_active: checked })}
                    />
                    <Label>Actif</Label>
                  </div>
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