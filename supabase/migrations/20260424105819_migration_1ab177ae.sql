-- 2. Ajouter les policies RLS sur storage.objects pour permettre les uploads publics

-- Permettre à tous d'uploader dans company-documents
DROP POLICY IF EXISTS "public_upload_company_docs" ON storage.objects;
CREATE POLICY "public_upload_company_docs"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'company-documents');

-- Permettre à tous de lire les fichiers du bucket
DROP POLICY IF EXISTS "public_read_company_docs" ON storage.objects;
CREATE POLICY "public_read_company_docs"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'company-documents');

-- Admins peuvent tout gérer
DROP POLICY IF EXISTS "admin_manage_company_docs" ON storage.objects;
CREATE POLICY "admin_manage_company_docs"
  ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'company-documents' AND
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

SELECT 'Storage policies créées' as status;