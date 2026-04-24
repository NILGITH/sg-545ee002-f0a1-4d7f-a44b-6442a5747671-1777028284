-- Table pour les soumissions d'offres par les entreprises
CREATE TABLE IF NOT EXISTS job_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_phone TEXT,
  job_title TEXT NOT NULL,
  job_description TEXT NOT NULL,
  job_requirements TEXT,
  job_responsibilities TEXT,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('CDI', 'CDD', 'Stage', 'Freelance', 'Alternance')),
  location TEXT NOT NULL,
  sector TEXT,
  salary_range TEXT,
  experience_level TEXT CHECK (experience_level IN ('Junior', 'Confirmé', 'Senior', 'Expert')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'published')),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  published_job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_job_submissions_status ON job_submissions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_submissions_company ON job_submissions(company_id);

-- RLS pour job_submissions
ALTER TABLE job_submissions ENABLE ROW LEVEL SECURITY;

-- Les entreprises peuvent soumettre sans auth
CREATE POLICY "anon_insert_job_submissions" ON job_submissions
  FOR INSERT WITH CHECK (true);

-- Les admins peuvent tout voir
CREATE POLICY "admin_read_job_submissions" ON job_submissions
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Les admins peuvent update (approuver/rejeter)
CREATE POLICY "admin_update_job_submissions" ON job_submissions
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Table pour historique des CV des candidats
CREATE TABLE IF NOT EXISTS candidate_cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  is_current BOOLEAN DEFAULT false,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_candidate_cvs_user ON candidate_cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_candidate_cvs_current ON candidate_cvs(user_id, is_current);

-- RLS pour candidate_cvs
ALTER TABLE candidate_cvs ENABLE ROW LEVEL SECURITY;

-- Les candidats peuvent gérer leurs propres CV
CREATE POLICY "candidate_insert_own_cv" ON candidate_cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "candidate_read_own_cv" ON candidate_cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "candidate_update_own_cv" ON candidate_cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "candidate_delete_own_cv" ON candidate_cvs
  FOR DELETE USING (auth.uid() = user_id);

-- Les admins peuvent voir tous les CV
CREATE POLICY "admin_read_all_cvs" ON candidate_cvs
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Fonction pour marquer un CV comme courant
CREATE OR REPLACE FUNCTION set_current_cv(cv_id UUID, user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Désactiver tous les CV courants
  UPDATE candidate_cvs SET is_current = false WHERE user_id = user_uuid;
  -- Activer le CV spécifié
  UPDATE candidate_cvs SET is_current = true WHERE id = cv_id AND user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;