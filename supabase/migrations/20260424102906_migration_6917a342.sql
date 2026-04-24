-- 5. CRITIQUE: Sécuriser ADMIN_USERS - Empêcher candidats de devenir admin!
DROP POLICY IF EXISTS "admin_read_own_profile" ON admin_users;
DROP POLICY IF EXISTS "super_admin_read_all" ON admin_users;

-- Lecture: Chaque admin peut lire SEULEMENT son propre profil
CREATE POLICY "admin_read_own_profile" ON admin_users
  FOR SELECT
  USING (id = auth.uid());

-- Super Admin: lire tous les profils admin
CREATE POLICY "super_admin_read_all" ON admin_users
  FOR SELECT
  USING (
    id = auth.uid() AND role = 'super_admin' AND is_active = true
  );

-- AUCUNE policy INSERT/UPDATE/DELETE pour admin_users
-- = Impossible de créer/modifier des admins via l'application
-- = Seul le super admin via interface dédiée peut le faire