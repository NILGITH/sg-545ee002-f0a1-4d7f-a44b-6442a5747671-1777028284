-- SÉCURITÉ TOTALE : Corriger toutes les policies avec la bonne structure

-- 1. APPLICATIONS - user_id pas candidate_id
DROP POLICY IF EXISTS "candidates_read_own_applications" ON applications;
DROP POLICY IF EXISTS "candidates_create_applications" ON applications;
DROP POLICY IF EXISTS "admin_read_applications" ON applications;
DROP POLICY IF EXISTS "admin_update_applications" ON applications;

CREATE POLICY "candidates_read_own" ON applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "candidates_create" ON applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admin_read_all" ON applications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "admin_update_status" ON applications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

SELECT 'Applications sécurisées' as status;