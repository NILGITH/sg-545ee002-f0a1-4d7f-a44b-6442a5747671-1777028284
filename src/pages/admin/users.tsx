import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SEO } from "@/components/SEO";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { authService } from "@/services/authService";
import { adminUsersService } from "@/services/adminUsersService";
import { Users, UserPlus, Edit, Trash2, ShieldAlert, ShieldCheck, Calendar } from "lucide-react";
import Link from "next/link";
import type { Tables } from "@/integrations/supabase/types";

type AdminUser = Tables<"admin_users">;

export default function AdminUsers() {
  const router = useRouter();
  const { loading: authLoading, isAdmin, isSuperAdmin } = useAdminAuth(true); // requireSuperAdmin = true
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [processing, setProcessing] = useState(false);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "admin" as "admin" | "manager" | "super_admin",
  });

  const [editData, setEditData] = useState({
    fullName: "",
    role: "admin" as "admin" | "manager" | "super_admin",
    isActive: true,
  });

  // Handler pour le changement de rôle lors de la création
  const handleNewRoleChange = (value: string) => {
    setNewUser({ ...newUser, role: value as "admin" | "manager" | "super_admin" });
  };

  // Handler pour le changement de rôle lors de l'édition
  const handleEditRoleChange = (value: string) => {
    setEditData({ ...editData, role: value as "admin" | "manager" | "super_admin" });
  };

  useEffect(() => {
    if (!authLoading && isSuperAdmin) {
      loadUsers();
    }
  }, [authLoading, isSuperAdmin]);

  const loadUsers = async () => {
    try {
      const data = await adminUsersService.getAllAdminUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.fullName) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setProcessing(true);
    try {
      await adminUsersService.createAdminUser(
        newUser.email,
        newUser.password,
        newUser.fullName,
        newUser.role
      );
      alert("Utilisateur créé avec succès !");
      setShowCreateDialog(false);
      setNewUser({ email: "", password: "", fullName: "", role: "admin" });
      await loadUsers();
    } catch (error: any) {
      console.error("Create user error:", error);
      alert(error.message || "Erreur lors de la création de l'utilisateur");
    }
    setProcessing(false);
  };

  const handleEditUser = async () => {
    if (!selectedUser || !editData.fullName) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    setProcessing(true);
    try {
      await adminUsersService.updateAdminUser(selectedUser.id, {
        full_name: editData.fullName,
        role: editData.role,
        is_active: editData.isActive,
      });
      alert("Utilisateur modifié avec succès !");
      setShowEditDialog(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (error: any) {
      console.error("Edit user error:", error);
      alert(error.message || "Erreur lors de la modification");
    }
    setProcessing(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setProcessing(true);
    try {
      await adminUsersService.deleteAdminUser(selectedUser.id);
      alert("Utilisateur supprimé avec succès !");
      setShowDeleteDialog(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (error: any) {
      console.error("Delete user error:", error);
      alert(error.message || "Erreur lors de la suppression");
    }
    setProcessing(false);
  };

  const getRoleBadge = (role: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive"; label: string }> = {
      super_admin: { variant: "destructive", label: "Super Admin" },
      admin: { variant: "default", label: "Admin" },
      manager: { variant: "secondary", label: "Manager" },
    };

    const { variant, label } = config[role] || { variant: "secondary", label: role };
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (authLoading || !isSuperAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Vérification des permissions Super Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Gestion des utilisateurs - Admin" description="Gérer les utilisateurs administrateurs" />
      
      <Navigation />
      
      <main className="min-h-[calc(100vh-80px)] bg-muted/30 py-16">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">Gestion des Utilisateurs</h1>
              <p className="text-muted-foreground">
                {users.length} utilisateur{users.length > 1 ? "s" : ""} administrateur{users.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <UserPlus className="mr-2" size={20} />
                Nouvel utilisateur
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/dashboard">Retour au tableau de bord</Link>
              </Button>
            </div>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {users.length === 0 ? (
              <Card className="border-2">
                <CardContent className="py-12 text-center">
                  <Users className="mx-auto text-muted-foreground mb-4" size={48} />
                  <p className="text-muted-foreground">Aucun utilisateur pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              users.map((user) => (
                <Card key={user.id} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          {user.role === "super_admin" ? (
                            <ShieldAlert className="text-accent" size={24} />
                          ) : (
                            <ShieldCheck className="text-accent" size={24} />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{user.full_name}</h3>
                            {getRoleBadge(user.role)}
                            {!user.is_active && <Badge variant="destructive">Inactif</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={12} />
                            <span>Créé le {new Date(user.created_at).toLocaleDateString("fr-FR")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setEditData({
                              fullName: user.full_name || "",
                              role: user.role as "admin" | "manager" | "super_admin",
                              isActive: user.is_active,
                            });
                            setShowEditDialog(true);
                          }}
                        >
                          <Edit className="mr-2" size={14} />
                          Modifier
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="mr-2" size={14} />
                          Supprimer
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

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Ajouter un nouvel administrateur au système
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-email">Email *</Label>
              <Input
                id="new-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="utilisateur@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Mot de passe *</Label>
              <Input
                id="new-password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Minimum 6 caractères"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-fullname">Nom complet *</Label>
              <Input
                id="new-fullname"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                placeholder="Jean Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-role">Rôle *</Label>
              <Select value={newUser.role} onValueChange={handleNewRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateUser} disabled={processing}>
              {processing ? "Création..." : "Créer l'utilisateur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifier les informations de {selectedUser?.full_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-fullname">Nom complet *</Label>
              <Input
                id="edit-fullname"
                value={editData.fullName}
                onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Rôle *</Label>
              <Select value={editData.role} onValueChange={handleEditRoleChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-active"
                checked={editData.isActive}
                onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="edit-active">Compte actif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleEditUser} disabled={processing}>
              {processing ? "Modification..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{selectedUser?.full_name}</strong> ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} disabled={processing} className="bg-destructive text-destructive-foreground">
              {processing ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
}