-- Supprimer la policy si elle existe, puis la recréer
DROP POLICY IF EXISTS "anonymous_applications" ON applications;

CREATE POLICY "anonymous_applications" ON applications
  FOR INSERT
  TO public
  WITH CHECK (user_id IS NULL);

-- Vérifier toutes les policies sur applications
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'applications';