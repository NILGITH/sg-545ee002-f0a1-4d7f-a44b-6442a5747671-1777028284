-- Supprimer les policies RLS récursives de admin_users
DROP POLICY IF EXISTS "super_admin_read_all_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_insert_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_update_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_delete_users" ON admin_users;

-- Créer de nouvelles policies sans récursion en utilisant une fonction
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
    AND role = 'super_admin'
    AND is_active = true
  );
$$;

-- Recréer les policies avec la fonction
CREATE POLICY "super_admin_read_all_users" ON admin_users
  FOR SELECT
  USING (is_super_admin());

CREATE POLICY "super_admin_insert_users" ON admin_users
  FOR INSERT
  WITH CHECK (is_super_admin());

CREATE POLICY "super_admin_update_users" ON admin_users
  FOR UPDATE
  USING (is_super_admin());

CREATE POLICY "super_admin_delete_users" ON admin_users
  FOR DELETE
  USING (is_super_admin());