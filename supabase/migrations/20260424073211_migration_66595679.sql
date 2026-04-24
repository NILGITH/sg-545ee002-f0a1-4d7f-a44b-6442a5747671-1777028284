-- Créer les buckets Supabase Storage pour les fichiers
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('cvs', 'cvs', false),
  ('company-documents', 'company-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS pour le bucket CVs
CREATE POLICY "Users can upload their own CV" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'cvs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can read their own CV" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'cvs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can read all CVs" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'cvs' AND 
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can delete their own CV" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'cvs' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- RLS pour le bucket documents entreprises
CREATE POLICY "Anyone can upload company documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'company-documents');

CREATE POLICY "Admins can read company documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'company-documents' AND 
    auth.uid() IS NOT NULL
  );