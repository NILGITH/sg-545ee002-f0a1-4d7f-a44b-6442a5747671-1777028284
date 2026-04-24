-- Corriger les policies Storage pour le bucket cvs (syntaxe correcte)

-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "candidates_upload_cv" ON storage.objects;
DROP POLICY IF EXISTS "candidates_read_own_cv" ON storage.objects;
DROP POLICY IF EXISTS "admin_read_all_cvs_storage" ON storage.objects;
DROP POLICY IF EXISTS "admin_delete_cvs_storage" ON storage.objects;

-- Recréer les policies avec la bonne syntaxe
CREATE POLICY "candidates_upload_cv" 
  ON storage.objects 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    bucket_id = 'cvs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "candidates_read_own_cv" 
  ON storage.objects 
  FOR SELECT 
  TO authenticated
  USING (
    bucket_id = 'cvs' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "admin_read_all_cvs_storage" 
  ON storage.objects 
  FOR SELECT 
  TO authenticated
  USING (
    bucket_id = 'cvs' AND
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "admin_delete_cvs_storage" 
  ON storage.objects 
  FOR DELETE 
  TO authenticated
  USING (
    bucket_id = 'cvs' AND
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

SELECT 'Storage policies CVs créées' as status;