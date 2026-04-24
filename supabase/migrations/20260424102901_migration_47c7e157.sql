-- 4. Sécuriser CANDIDATE_CVS - Chaque candidat voit SEULEMENT son CV
DROP POLICY IF EXISTS "admin_read_all_cvs" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_read_own_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_insert_own_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_update_own_cv" ON candidate_cvs;

-- Candidat: lire SEULEMENT son propre CV
CREATE POLICY "candidate_read_own_cv" ON candidate_cvs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM candidates c
      WHERE c.id = candidate_cvs.candidate_id AND c.user_id = auth.uid()
    )
  );

-- Candidat: créer SEULEMENT son propre CV
CREATE POLICY "candidate_insert_own_cv" ON candidate_cvs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM candidates c
      WHERE c.id = candidate_id AND c.user_id = auth.uid()
    )
  );

-- Candidat: modifier SEULEMENT son propre CV
CREATE POLICY "candidate_update_own_cv" ON candidate_cvs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM candidates c
      WHERE c.id = candidate_cvs.candidate_id AND c.user_id = auth.uid()
    )
  );

-- Admin: lire tous les CV
CREATE POLICY "admin_read_all_cvs" ON candidate_cvs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );