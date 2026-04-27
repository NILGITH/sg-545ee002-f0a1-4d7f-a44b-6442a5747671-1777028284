import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];
type AdminUserInsert = Database["public"]["Tables"]["admin_users"]["Insert"];
type AdminUserUpdate = Database["public"]["Tables"]["admin_users"]["Update"];

export const adminUsersService = {
  /**
   * Récupérer le profil admin de l'utilisateur connecté
   */
  async getCurrentAdminProfile(): Promise<AdminUser | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching admin profile:", error);
      return null;
    }

    return data;
  },

  /**
   * Vérifier si l'utilisateur connecté est super_admin
   */
  async isSuperAdmin(): Promise<boolean> {
    const profile = await this.getCurrentAdminProfile();
    return profile?.role === "super_admin" && profile?.is_active === true;
  },

  /**
   * Récupérer tous les utilisateurs admin (super_admin only)
   */
  async getAllAdminUsers(): Promise<AdminUser[]> {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching admin users:", error);
      throw error;
    }

    return data || [];
  },

  /**
   * Créer un nouvel utilisateur admin (super_admin only)
   */
  async createAdminUser(email: string, password: string, fullName: string, role: "admin" | "manager" | "super_admin"): Promise<void> {
    // Vérifier que l'utilisateur actuel est super_admin
    const isSuperAdmin = await this.isSuperAdmin();
    if (!isSuperAdmin) {
      throw new Error("Accès refusé. Seul le super_admin peut créer des utilisateurs.");
    }

    // Créer l'utilisateur dans Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Erreur lors de la création de l'utilisateur");

    // Créer le profil admin
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    const { error: profileError } = await supabase
      .from("admin_users")
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role,
        is_active: true,
        created_by: currentUser?.id,
      });

    if (profileError) throw profileError;
  },

  /**
   * Mettre à jour un utilisateur admin (super_admin only)
   */
  async updateAdminUser(userId: string, updates: Partial<Pick<AdminUser, "full_name" | "role" | "is_active">>): Promise<void> {
    const isSuperAdmin = await this.isSuperAdmin();
    if (!isSuperAdmin) {
      throw new Error("Accès refusé. Seul le super_admin peut modifier des utilisateurs.");
    }

    const { error } = await supabase
      .from("admin_users")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
  },

  /**
   * Désactiver un utilisateur admin (super_admin only)
   */
  async deactivateAdminUser(userId: string): Promise<void> {
    const isSuperAdmin = await this.isSuperAdmin();
    if (!isSuperAdmin) {
      throw new Error("Accès refusé. Seul le super_admin peut désactiver des utilisateurs.");
    }

    // Ne pas permettre de se désactiver soi-même
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id === userId) {
      throw new Error("Vous ne pouvez pas désactiver votre propre compte.");
    }

    const { error } = await supabase
      .from("admin_users")
      .update({ is_active: false })
      .eq("id", userId);

    if (error) throw error;
  },

  /**
   * Supprimer définitivement un utilisateur admin (super_admin only)
   */
  async deleteAdminUser(userId: string): Promise<void> {
    const isSuperAdmin = await this.isSuperAdmin();
    if (!isSuperAdmin) {
      throw new Error("Accès refusé. Seul le super_admin peut supprimer des utilisateurs.");
    }

    // Ne pas permettre de se supprimer soi-même
    const { data: { user } } = await supabase.auth.getUser();
    if (user?.id === userId) {
      throw new Error("Vous ne pouvez pas supprimer votre propre compte.");
    }

    // Supprimer de admin_users (cascade supprimera aussi de auth.users)
    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", userId);

    if (error) throw error;
  },

  /**
   * Réinitialiser le mot de passe d'un utilisateur admin (super_admin only)
   */
  async resetAdminPassword(userId: string, newPassword: string): Promise<void> {
    const isSuperAdmin = await this.isSuperAdmin();
    if (!isSuperAdmin) {
      throw new Error("Accès refusé. Seul le super_admin peut réinitialiser des mots de passe.");
    }

    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) throw error;
  },

  async getAllUsers() {
    return await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });
  },

  async getUserById(id: string) {
    return await supabase
      .from("admin_users")
      .select("*")
      .eq("id", id)
      .single();
  },

  async createUser(userData: { email: string; password: string; full_name: string; role: string }) {
    try {
      // Créer l'utilisateur dans auth.users via l'API
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role,
          },
        },
      });

      if (authError) {
        console.error("Auth error:", authError);
        return { data: null, error: authError };
      }

      if (!authData.user) {
        return { data: null, error: new Error("Utilisateur non créé") };
      }

      // Créer l'entrée dans admin_users
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .insert({
          id: authData.user.id,
          email: userData.email,
          full_name: userData.full_name,
          role: userData.role,
        })
        .select()
        .single();

      if (adminError) {
        console.error("Admin user creation error:", adminError);
        // Si échec, supprimer l'utilisateur auth
        await supabase.auth.admin.deleteUser(authData.user.id);
        return { data: null, error: adminError };
      }

      return { data: adminData, error: null };
    } catch (error) {
      console.error("Unexpected error:", error);
      return { data: null, error: error as Error };
    }
  },

  async updateUser(id: string, updates: AdminUserUpdate) {
    return await supabase
      .from("admin_users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  },

  async updateUserPassword(userId: string, newPassword: string) {
    try {
      // Mise à jour du mot de passe via l'API Supabase
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Password update error:", error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Unexpected error:", error);
      return { error: error as Error };
    }
  },

  async deleteUser(id: string) {
    // Supprimer d'abord de admin_users, puis de auth.users sera supprimé automatiquement grâce à ON DELETE CASCADE
    return await supabase
      .from("admin_users")
      .delete()
      .eq("id", id);
  },
};