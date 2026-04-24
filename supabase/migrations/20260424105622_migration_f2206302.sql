-- 1. Corriger la policy INSERT sur job_submissions pour permettre les soumissions publiques
DROP POLICY IF EXISTS "public_insert_submissions" ON job_submissions;

CREATE POLICY "public_insert_submissions" ON job_submissions
  FOR INSERT
  WITH CHECK (true);  -- N'importe qui peut soumettre une offre

-- Vérifier la policy
SELECT policyname, cmd, with_check
FROM pg_policies 
WHERE tablename = 'job_submissions' AND cmd = 'INSERT';