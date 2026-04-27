-- Ajouter les RLS policies pour le bucket cvs
DROP POLICY IF EXISTS "public_read_cvs" ON storage.objects;
DROP POLICY IF EXISTS "public_insert_cvs" ON storage.objects;
DROP POLICY IF EXISTS "auth_delete_cvs" ON storage.objects;

CREATE POLICY "public_read_cvs" ON storage.objects FOR SELECT USING (bucket_id = 'cvs');
CREATE POLICY "public_insert_cvs" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cvs');
CREATE POLICY "auth_delete_cvs" ON storage.objects FOR DELETE USING (bucket_id = 'cvs' AND auth.uid() IS NOT NULL);