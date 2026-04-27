-- Ajouter une colonne status pour la validation des offres
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));