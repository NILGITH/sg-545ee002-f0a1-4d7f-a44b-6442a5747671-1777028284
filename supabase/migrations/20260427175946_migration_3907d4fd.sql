-- Corriger les RLS policies pour job_submissions (soumissions d'offres publiques)
DROP POLICY IF EXISTS "anon_insert_job_submissions" ON job_submissions;
DROP POLICY IF EXISTS "public_insert_job_submissions" ON job_submissions;

-- Permettre à n'importe qui de soumettre une offre (formulaire public)
CREATE POLICY "public_insert_job_submissions" ON job_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Permettre la lecture publique
CREATE POLICY "public_read_job_submissions" ON job_submissions 
  FOR SELECT 
  USING (true);