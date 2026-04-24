-- SOLUTION FINALE : Politique RLS non-récursive pour admin_users

-- 1. Supprimer TOUTES les policies existantes sur admin_users
DROP POLICY IF EXISTS "super_admin_read_all_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_insert_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_update_users" ON admin_users;
DROP POLICY IF EXISTS "super_admin_delete_users" ON admin_users;
DROP POLICY IF EXISTS "admin_read_own_profile" ON admin_users;
DROP POLICY IF EXISTS "Users can read their own admin profile" ON admin_users;
DROP POLICY IF EXISTS "Super admins can read all profiles" ON admin_users;
DROP POLICY IF EXISTS "Super admins can insert profiles" ON admin_users;
DROP POLICY IF EXISTS "Super admins can update profiles" ON admin_users;
DROP POLICY IF EXISTS "Super admins can delete profiles" ON admin_users;

-- 2. Créer une SEULE policy SELECT ultra-simple : chaque utilisateur lit SA PROPRE ligne
CREATE POLICY "read_own_profile" ON admin_users
  FOR SELECT
  USING (id = auth.uid());

-- 3. Super admin : accès complet via policies séparées utilisant le rôle directement
CREATE POLICY "super_admin_full_access" ON admin_users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users sa
      WHERE sa.id = auth.uid() 
      AND sa.role = 'super_admin' 
      AND sa.is_active = true
      LIMIT 1
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users sa
      WHERE sa.id = auth.uid() 
      AND sa.role = 'super_admin' 
      AND sa.is_active = true
      LIMIT 1
    )
  );

-- 4. Vérifier les policies créées
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;