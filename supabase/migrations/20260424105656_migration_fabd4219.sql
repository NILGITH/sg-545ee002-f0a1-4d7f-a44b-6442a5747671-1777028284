-- Nettoyer les policies en double sur job_submissions
DROP POLICY IF EXISTS "public_insert_submission" ON job_submissions;

-- Garder seulement public_insert_submissions
SELECT 'Policy nettoyée' as status;