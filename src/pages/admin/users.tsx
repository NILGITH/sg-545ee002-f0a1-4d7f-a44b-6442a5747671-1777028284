import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { adminUsersService } from "@/services/adminUsersService";
import { ArrowLeft, UserPlus, Edit, Trash2, Shield, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/integrations/supabase/types";

type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];

export default function AdminUsersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  
  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "admin",
  });

  const [editForm, setEditForm] = useState({
    email: "",
    full_name: "",
    role: "admin",
    newPassword: "",
  });

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadUsers();
    }
  }, [authLoading, isAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    const { data } = await adminUsersService.getAllUsers();
    setUsers(data || []);
    setLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data, error } = await adminUsersService.createUser(createForm);

    if (error) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer l'utilisateur",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Utilisateur créé",
        description: "Le nouvel utilisateur a été créé avec succès",
      });
      setIsCreateDialogOpen(false);
      setCreateForm({ email: "", password: "", full_name: "", role: "admin" });
      loadUsers();
    }
    
    setSubmitting(false);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setSubmitting(true);

    // Mettre à jour les infos de base
    const { error: updateError } = await adminUsersService.updateUser(editingUser.id, {
      email: editForm.email,
      full_name: editForm.full_name,
      role: editForm.role,
    });

    if (updateError) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'utilisateur",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    // Si un nouveau mot de passe est fourni, le mettre à jour
    if (editForm.newPassword && editForm.newPassword.length >= 6) {
      const { error: passwordError } = await adminUsersService.updateUserPassword(
        editingUser.id,
        editForm.newPassword
      );

      if (passwordError) {
        toast({
          title: "Erreur mot de passe",
          description: "Informations mises à jour mais le mot de passe n'a pas pu être modifié",
          variant: "destructive",
        });
      }
    }

    toast({
      title: "Utilisateur modifié",
      description: "Les informations ont été mises à jour avec succès",
    });
    
    setIsEditDialogOpen(false);
    setEditingUser(null);
    setEditForm({ email: "", full_name: "", role: "admin", newPassword: "" });
    loadUsers();
    setSubmitting(false);
  };

  const openEditDialog = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({
      email: user.email,
      full_name: user.full_name || "",
      role: user.role,
      newPassword: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

    const { error } = await adminUsersService.deleteUser(id);
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'utilisateur",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
      });
      loadUsers();
    }
  };

  const getRoleBadge = (role: string) => {
    return role === "super_admin" ? (
      <Badge className="bg-accent text-accent-foreground">Super Admin</Badge>
    ) : (
      <Badge variant="secondary">Admin</Badge>
    );
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
      <SEO 
        title="Gestion des Utilisateurs - Admin - HR Talents Partners"
        description="Gérez les utilisateurs administrateurs"
      />
      
      <Navigation />
      
      <main className="min-h-screen py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/admin/dashboard">
                  <ArrowLeft size={18} className="mr-2" />
                  Retour au tableau de bord
                </Link>
              </Button>
              <div>
                <h1 className="font-serif text-4xl font-bold">Gestion des Utilisateurs</h1>
                <p className="text-muted-foreground mt-1">{users.length} utilisateur{users.length > 1 ? "s" : ""} administrateur{users.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <UserPlus size={18} className="mr-2" />
              Nouvel utilisateur
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-accent" size={48} />
            </div>
          ) : users.length === 0 ? (
            <Card className="border-2">
              <CardContent className="text-center py-12">
                <p className="text-xl text-muted-foreground">Aucun utilisateur pour le moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <Shield className="text-accent" size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-serif text-xl font-semibold">{user.full_name || "Sans nom"}</h3>
                            {getRoleBadge(user.role)}
                          </div>
                          <p className="text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar size={14} />
                            <span>Créé le {new Date(user.created_at).toLocaleDateString("fr-FR")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit size={16} className="mr-2" />
                          Modifier
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialogue de création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <p className="text-sm text-muted-foreground">Ajouter un nouvel administrateur au système</p>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Label htmlFor="create-email">Email *</Label>
              <Input
                id="create-email"
                type="email"
                required
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="create-password">Mot de passe *</Label>
              <Input
                id="create-password"
                type="password"
                required
                minLength={6}
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 caractères</p>
            </div>

            <div>
              <Label htmlFor="create-name">Nom complet *</Label>
              <Input
                id="create-name"
                required
                value={createForm.full_name}
                onChange={(e) => setCreateForm({ ...createForm, full_name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="create-role">Rôle *</Label>
              <Select 
                value={createForm.role} 
                onValueChange={(value) => setCreateForm({ ...createForm, role: value })}
              >
                <SelectTrigger id="create-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Création...
                  </>
                ) : (
                  "Créer l'utilisateur"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <p className="text-sm text-muted-foreground">Mettre à jour les informations de l'utilisateur</p>
          </DialogHeader>
          <form onSubmit={handleEditUser} className="space-y-4">
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                required
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-name">Nom complet *</Label>
              <Input
                id="edit-name"
                required
                value={editForm.full_name}
                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-role">Rôle *</Label>
              <Select 
                value={editForm.role} 
                onValueChange={(value) => setEditForm({ ...editForm, role: value })}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-password">Nouveau mot de passe</Label>
              <Input
                id="edit-password"
                type="password"
                placeholder="Laisser vide pour ne pas modifier"
                minLength={6}
                value={editForm.newPassword}
                onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Laisser vide si vous ne voulez pas changer le mot de passe. Sinon, minimum 6 caractères.
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Modification...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}