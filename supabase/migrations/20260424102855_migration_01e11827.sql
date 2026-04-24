-- 3. Sécuriser CANDIDATES - Chaque candidat voit SEULEMENT son profil
DROP POLICY IF EXISTS "admin_read_all_candidates" ON candidates;
DROP POLICY IF EXISTS "candidate_read_own_profile" ON candidates;
DROP POLICY IF EXISTS "candidate_update_own_profile" ON candidates;

-- Candidat: lire SEULEMENT son propre profil
CREATE POLICY "candidate_read_own_profile" ON candidates
  FOR SELECT
  USING (user_id = auth.uid());

-- Candidat: modifier SEULEMENT son propre profil
CREATE POLICY "candidate_update_own_profile" ON candidates
  FOR UPDATE
  USING (user_id = auth.uid());

-- Admin: lire tous les profils candidats
CREATE POLICY "admin_read_all_candidates" ON candidates
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );