-- Table pour les utilisateurs admin avec rôles
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'manager')),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  last_login timestamp with time zone
);

-- Index pour recherches rapides
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- RLS Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Seul le super_admin peut voir tous les utilisateurs
CREATE POLICY "super_admin_read_all_users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
  );

-- Seul le super_admin peut créer des utilisateurs
CREATE POLICY "super_admin_insert_users" ON admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
  );

-- Seul le super_admin peut modifier des utilisateurs
CREATE POLICY "super_admin_update_users" ON admin_users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
  );

-- Seul le super_admin peut supprimer des utilisateurs (désactivation)
CREATE POLICY "super_admin_delete_users" ON admin_users
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    )
  );

-- Les admins peuvent voir leur propre profil
CREATE POLICY "admin_read_own_profile" ON admin_users
  FOR SELECT USING (id = auth.uid());

-- Fonction pour mettre à jour last_login
CREATE OR REPLACE FUNCTION update_admin_last_login()
RETURNS trigger AS $$
BEGIN
  UPDATE admin_users SET last_login = now() WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_admin_users_updated_at();

-- Créer le premier super admin (à remplacer par votre email)
-- IMPORTANT: Vous devrez d'abord créer cet utilisateur via Supabase Auth
-- Puis exécuter cette requête en remplaçant l'email
-- INSERT INTO admin_users (id, email, full_name, role)
-- SELECT id, email, raw_user_meta_data->>'full_name', 'super_admin'
-- FROM auth.users
-- WHERE email = 'votre-email@example.com'
-- ON CONFLICT (id) DO UPDATE SET role = 'super_admin';