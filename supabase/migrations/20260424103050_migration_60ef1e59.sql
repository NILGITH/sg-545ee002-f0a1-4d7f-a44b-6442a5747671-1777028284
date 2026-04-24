-- 3. CANDIDATE_CVS - user_id
DROP POLICY IF EXISTS "candidate_read_own_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_insert_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_update_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "admin_read_cvs" ON candidate_cvs;

CREATE POLICY "candidate_read_own" ON candidate_cvs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "candidate_insert_own" ON candidate_cvs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "candidate_update_own" ON candidate_cvs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "admin_read_all" ON candidate_cvs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

SELECT 'CV sécurisés' as status;