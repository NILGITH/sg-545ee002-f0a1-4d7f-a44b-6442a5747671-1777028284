-- Ajouter une colonne user_id à la table candidates pour lier aux comptes auth
ALTER TABLE candidates ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE candidates ADD COLUMN bio TEXT;
ALTER TABLE candidates ADD COLUMN location TEXT;

-- Créer un index pour les recherches par user_id
CREATE INDEX idx_candidates_user_id ON candidates(user_id);

-- Mettre à jour les politiques RLS pour les candidats
DROP POLICY IF EXISTS anon_insert_candidates ON candidates;
DROP POLICY IF EXISTS auth_read_candidates ON candidates;

-- Les candidats peuvent créer leur propre profil
CREATE POLICY "candidate_insert_own" ON candidates
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les candidats peuvent lire leur propre profil
CREATE POLICY "candidate_read_own" ON candidates
  FOR SELECT
  USING (auth.uid() = user_id);

-- Les candidats peuvent mettre à jour leur propre profil
CREATE POLICY "candidate_update_own" ON candidates
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Les admins peuvent tout lire
CREATE POLICY "admin_read_all_candidates" ON candidates
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Mettre à jour les politiques pour applications
DROP POLICY IF EXISTS anon_insert_applications ON applications;
DROP POLICY IF EXISTS auth_read_applications ON applications;
DROP POLICY IF EXISTS auth_update_applications ON applications;

-- Ajouter user_id aux candidatures
ALTER TABLE applications ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX idx_applications_user_id ON applications(user_id);

-- Les utilisateurs authentifiés peuvent créer des candidatures
CREATE POLICY "auth_insert_applications" ON applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent lire leurs propres candidatures
CREATE POLICY "user_read_own_applications" ON applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Les admins peuvent tout lire et modifier
CREATE POLICY "admin_read_all_applications" ON applications
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin_update_applications" ON applications
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);