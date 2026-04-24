-- 6. Sécuriser JOB_SUBMISSIONS - Public peut soumettre, admin valide
DROP POLICY IF EXISTS "public_insert_submission" ON job_submissions;
DROP POLICY IF EXISTS "admin_read_all_submissions" ON job_submissions;
DROP POLICY IF EXISTS "admin_update_submissions" ON job_submissions;

-- Public: soumettre une offre (entreprises)
CREATE POLICY "public_insert_submission" ON job_submissions
  FOR INSERT
  WITH CHECK (true);

-- Admin: lire toutes les soumissions
CREATE POLICY "admin_read_all_submissions" ON job_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Admin: modifier les soumissions
CREATE POLICY "admin_update_submissions" ON job_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Admin: supprimer les soumissions
CREATE POLICY "admin_delete_submissions" ON job_submissions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );