-- SOLUTION COMPLÈTE DANS LE BON ORDRE

-- 1. D'abord supprimer toutes les policies de admin_users
DROP POLICY IF EXISTS "super_admin_read_all_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_insert_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_update_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_delete_users" ON admin_users;
DROP POLICY IF EXISTS "admin_read_own_profile" ON admin_users;

-- 2. Maintenant supprimer les fonctions
DROP FUNCTION IF EXISTS is_super_admin();
DROP FUNCTION IF EXISTS is_admin_user();

-- 3. Créer les nouvelles policies SANS récursion pour admin_users
-- Tout admin actif peut lire TOUTES les entrées (nécessaire pour checkAuth)
CREATE POLICY "active_admin_read_all" ON admin_users
  FOR SELECT
  USING (true);  -- Lecture publique pour éviter la récursion

-- Seuls les super_admin peuvent INSERT
CREATE POLICY "super_admin_insert" ON admin_users
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() 
      AND au.role = 'super_admin'
      AND au.is_active = true
    )
  );

-- Seuls les super_admin peuvent UPDATE
CREATE POLICY "super_admin_update" ON admin_users
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid()
      AND au.role = 'super_admin'
      AND au.is_active = true
    )
  );

-- Seuls les super_admin peuvent DELETE
CREATE POLICY "super_admin_delete" ON admin_users
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid()
      AND au.role = 'super_admin'
      AND au.is_active = true
    )
  );

-- 4. Simplifier les policies pour testimonials
DROP POLICY IF EXISTS "admin_all_testimonials" ON testimonials;
CREATE POLICY "admin_manage_testimonials" ON testimonials
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- 5. Simplifier les policies pour partnerships
DROP POLICY IF EXISTS "admin_all_partnerships" ON partnerships;
CREATE POLICY "admin_manage_partnerships" ON partnerships
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- 6. Améliorer la policy INSERT pour jobs (permettre aux admins)
DROP POLICY IF EXISTS "auth_insert_jobs" ON jobs;
CREATE POLICY "admin_insert_jobs" ON jobs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

SELECT 'RLS policies recréées sans récursion' as status;