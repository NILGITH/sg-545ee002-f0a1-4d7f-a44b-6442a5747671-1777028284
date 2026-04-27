-- Modifier la table applications pour avoir seulement 3 statuts
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;
ALTER TABLE applications ADD CONSTRAINT applications_status_check CHECK (status IN ('pending', 'reviewed', 'completed'));

-- Mettre à jour les anciennes valeurs
UPDATE applications SET status = 'completed' WHERE status IN ('accepted', 'rejected');
UPDATE applications SET status = 'reviewed' WHERE status = 'interviewed';