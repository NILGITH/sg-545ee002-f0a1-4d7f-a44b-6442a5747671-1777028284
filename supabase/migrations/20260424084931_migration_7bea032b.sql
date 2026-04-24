-- Table pour les demandes de services (Team Building, Formation, etc.)
CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL CHECK (request_type IN ('team_building', 'formation', 'recrutement', 'analyse_salariale')),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text,
  
  -- Champs spécifiques Team Building
  team_size integer,
  preferred_date date,
  activity_type text,
  location_preference text,
  
  -- Champs spécifiques Formation
  training_topic text,
  participants_count integer,
  training_format text CHECK (training_format IN ('intra', 'inter', 'elearning', NULL)),
  
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  admin_notes text,
  assigned_to uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index pour recherche rapide
CREATE INDEX IF NOT EXISTS idx_service_requests_type ON service_requests(request_type);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_service_requests_created ON service_requests(created_at DESC);

-- RLS Policies
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut créer une demande (formulaires publics)
CREATE POLICY "anyone_can_create_service_request" ON service_requests
  FOR INSERT WITH CHECK (true);

-- Seuls les admins peuvent lire
CREATE POLICY "admins_can_read_service_requests" ON service_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

-- Seuls les admins peuvent mettre à jour
CREATE POLICY "admins_can_update_service_requests" ON service_requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() 
      AND admin_users.is_active = true
    )
  );

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_service_requests_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS service_requests_updated_at ON service_requests;
CREATE TRIGGER service_requests_updated_at
  BEFORE UPDATE ON service_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_service_requests_updated_at();

COMMENT ON TABLE service_requests IS 'Demandes de services (Team Building, Formation, Recrutement, Analyse Salariale)';