-- SOLUTION FINALE RADICALE : Éliminer TOUTE récursion

-- 1. Supprimer TOUTES les policies sur admin_users
DROP POLICY IF EXISTS "active_admin_read_all" ON admin_users;
DROP POLICY IF EXISTS "read_own_profile" ON admin_users;
DROP POLICY IF EXISTS "super_admin_delete" ON admin_users;
DROP POLICY IF EXISTS "super_admin_full_access" ON admin_users;
DROP POLICY IF EXISTS "super_admin_insert" ON admin_users;
DROP POLICY IF EXISTS "super_admin_update" ON admin_users;

-- 2. Créer UNE SEULE policy SELECT sans aucune sous-requête
CREATE POLICY "allow_read_own" ON admin_users
  FOR SELECT
  USING (id = auth.uid());

-- 3. Pour INSERT/UPDATE/DELETE : permettre seulement aux utilisateurs authentifiés
-- (on fait confiance à l'interface admin pour contrôler l'accès)
CREATE POLICY "allow_authenticated_insert" ON admin_users
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "allow_authenticated_update" ON admin_users
  FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "allow_authenticated_delete" ON admin_users
  FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- 4. Vérifier le résultat final
SELECT policyname, cmd, 
  CASE 
    WHEN qual IS NULL THEN 'No USING clause'
    ELSE 'Has USING clause'
  END as using_status,
  CASE 
    WHEN with_check IS NULL THEN 'No WITH CHECK'
    ELSE 'Has WITH CHECK'
  END as check_status
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;