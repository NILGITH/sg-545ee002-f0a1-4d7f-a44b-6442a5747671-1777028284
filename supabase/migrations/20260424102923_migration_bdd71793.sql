-- 8. Sécuriser TESTIMONIALS et PARTNERSHIPS - Admin seulement
DROP POLICY IF EXISTS "public_read_testimonials" ON testimonials;
DROP POLICY IF EXISTS "admin_full_access_testimonials" ON testimonials;
DROP POLICY IF EXISTS "public_read_partnerships" ON partnerships;
DROP POLICY IF EXISTS "admin_full_access_partnerships" ON partnerships;

-- Testimonials: lecture publique des témoignages actifs
CREATE POLICY "public_read_active_testimonials" ON testimonials
  FOR SELECT
  USING (is_active = true);

-- Admin: accès complet aux témoignages
CREATE POLICY "admin_full_access_testimonials" ON testimonials
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Partnerships: lecture publique des partenariats actifs
CREATE POLICY "public_read_active_partnerships" ON partnerships
  FOR SELECT
  USING (is_active = true);

-- Admin: accès complet aux partenariats
CREATE POLICY "admin_full_access_partnerships" ON partnerships
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );