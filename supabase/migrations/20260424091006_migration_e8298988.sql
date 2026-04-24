-- Ajouter les colonnes manquantes à la table job_submissions
ALTER TABLE job_submissions
ADD COLUMN IF NOT EXISTS company_logo_url text,
ADD COLUMN IF NOT EXISTS submitter_name text,
ADD COLUMN IF NOT EXISTS submitter_position text;

-- Commenter les nouvelles colonnes
COMMENT ON COLUMN job_submissions.company_logo_url IS 'URL du logo de l''entreprise uploadé';
COMMENT ON COLUMN job_submissions.submitter_name IS 'Nom complet de la personne qui soumet l''offre';
COMMENT ON COLUMN job_submissions.submitter_position IS 'Poste/fonction de la personne qui soumet l''offre';

-- Vérifier la structure mise à jour
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'job_submissions' 
ORDER BY ordinal_position;