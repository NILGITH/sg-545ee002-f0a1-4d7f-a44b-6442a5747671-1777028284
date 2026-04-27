-- Ajouter une colonne pour stocker l'URL du CV dans la table applications
ALTER TABLE applications ADD COLUMN IF NOT EXISTS cv_url text NULL;