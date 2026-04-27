-- Corriger les RLS policies pour applications (candidatures publiques)
DROP POLICY IF EXISTS "anon_insert_applications" ON applications;
DROP POLICY IF EXISTS "public_insert_applications" ON applications;

-- Permettre à n'importe qui de postuler (avec ou sans compte)
CREATE POLICY "public_insert_applications" ON applications 
  FOR INSERT 
  WITH CHECK (true);

-- Permettre la lecture publique des candidatures
CREATE POLICY "public_read_applications" ON applications 
  FOR SELECT 
  USING (true);