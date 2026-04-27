-- Corriger les RLS pour admin_users (permettre aux admins de créer d'autres admins)
DROP POLICY IF EXISTS "admin_insert" ON admin_users;
DROP POLICY IF EXISTS "admin_select" ON admin_users;
DROP POLICY IF EXISTS "admin_update" ON admin_users;
DROP POLICY IF EXISTS "admin_delete" ON admin_users;

CREATE POLICY "admin_select" ON admin_users FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_insert" ON admin_users FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_update" ON admin_users FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "admin_delete" ON admin_users FOR DELETE USING (auth.uid() IS NOT NULL);