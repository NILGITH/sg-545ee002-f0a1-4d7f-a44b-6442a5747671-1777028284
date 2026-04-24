import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook de sécurité pour protéger les routes admin
 * Vérifie que l'utilisateur connecté est bien un admin actif
 * Redirige vers /admin/login si non authentifié
 * Redirige vers / si authentifié mais pas admin
 */
export function useAdminAuth(requireSuperAdmin = false) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      // 1. Vérifier la session auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Pas de session = rediriger vers login admin
        router.push("/admin/login");
        return;
      }

      // 2. Vérifier que l'utilisateur est dans admin_users
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("role, is_active")
        .eq("id", session.user.id)
        .single();

      if (error || !adminUser) {
        // Utilisateur connecté mais PAS dans admin_users = candidat
        console.warn("Access denied: User is not an admin");
        await supabase.auth.signOut();
        router.push("/");
        return;
      }

      // 3. Vérifier que le compte admin est actif
      if (!adminUser.is_active) {
        console.warn("Access denied: Admin account is inactive");
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }

      // 4. Si super admin requis, vérifier le rôle
      if (requireSuperAdmin && adminUser.role !== "super_admin") {
        console.warn("Access denied: Super admin required");
        router.push("/admin/dashboard");
        return;
      }

      // ✅ Tout est OK
      setIsAdmin(true);
      setIsSuperAdmin(adminUser.role === "super_admin");
      setLoading(false);
    } catch (err) {
      console.error("Admin auth error:", err);
      router.push("/admin/login");
    }
  };

  return { loading, isAdmin, isSuperAdmin };
}