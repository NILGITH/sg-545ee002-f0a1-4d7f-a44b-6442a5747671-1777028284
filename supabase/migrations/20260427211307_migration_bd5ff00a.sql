-- Corriger les RLS pour le storage bucket job-logos
DROP POLICY IF EXISTS "public_read" ON storage.objects;
DROP POLICY IF EXISTS "auth_upload" ON storage.objects;
DROP POLICY IF EXISTS "auth_update" ON storage.objects;
DROP POLICY IF EXISTS "auth_delete" ON storage.objects;

CREATE POLICY "public_read" ON storage.objects FOR SELECT USING (bucket_id = 'job-logos');
CREATE POLICY "auth_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'job-logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_update" ON storage.objects FOR UPDATE USING (bucket_id = 'job-logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete" ON storage.objects FOR DELETE USING (bucket_id = 'job-logos' AND auth.uid() IS NOT NULL);