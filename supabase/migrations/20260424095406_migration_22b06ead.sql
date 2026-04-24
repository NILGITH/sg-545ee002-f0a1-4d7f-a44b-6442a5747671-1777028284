-- Créer la table pour les témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name text NOT NULL,
  author_position text NOT NULL,
  author_company text NOT NULL,
  author_photo_url text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Créer la table pour les partenariats
CREATE TABLE IF NOT EXISTS partnerships (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  description text,
  category text, -- Ex: "Client", "Technologie", "Formation", etc.
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- RLS policies pour testimonials (lecture publique, écriture admin)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "admin_all_testimonials" ON testimonials FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
  )
);

-- RLS policies pour partnerships
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_partnerships" ON partnerships FOR SELECT USING (is_active = true);
CREATE POLICY "admin_all_partnerships" ON partnerships FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid() AND admin_users.is_active = true
  )
);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partnerships_updated_at ON partnerships;
CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON partnerships
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insérer quelques témoignages d'exemple
INSERT INTO testimonials (author_name, author_position, author_company, content, rating, is_featured, display_order) VALUES
('Konan Yao', 'DRH', 'Orange Côte d''Ivoire', 'HR Talents Partners nous a accompagné dans notre processus de recrutement avec professionnalisme. Leur expertise et leur réseau nous ont permis de trouver des talents exceptionnels.', 5, true, 1),
('Aminata Touré', 'CEO', 'NSIA Banque', 'Une agence RH d''excellence ! Leur accompagnement stratégique nous a aidé à structurer notre département RH et à optimiser nos processus de recrutement.', 5, true, 2),
('Jean-Marc Kouassi', 'Directeur Général', 'MTN CI', 'Les formations proposées par HR Talents Partners ont transformé nos équipes. Un investissement stratégique qui porte ses fruits.', 5, false, 3);

-- Insérer quelques partenariats d'exemple
INSERT INTO partnerships (company_name, logo_url, website_url, category, display_order) VALUES
('Orange CI', '/placeholder-logo.png', 'https://orange.ci', 'Client', 1),
('MTN', '/placeholder-logo.png', 'https://mtn.ci', 'Client', 2),
('NSIA Banque', '/placeholder-logo.png', 'https://nsia.ci', 'Client', 3);