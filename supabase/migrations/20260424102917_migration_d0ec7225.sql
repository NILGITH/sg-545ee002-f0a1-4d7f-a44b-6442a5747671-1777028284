-- 7. Sécuriser SERVICE_REQUESTS - Public peut demander, admin gère
DROP POLICY IF EXISTS "public_insert_service_request" ON service_requests;
DROP POLICY IF EXISTS "admin_read_all_service_requests" ON service_requests;
DROP POLICY IF EXISTS "admin_update_service_requests" ON service_requests;

-- Public: créer une demande de service
CREATE POLICY "public_insert_service_request" ON service_requests
  FOR INSERT
  WITH CHECK (true);

-- Admin: lire toutes les demandes
CREATE POLICY "admin_read_all_service_requests" ON service_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Admin: modifier les demandes
CREATE POLICY "admin_update_service_requests" ON service_requests
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );

-- Admin: supprimer les demandes
CREATE POLICY "admin_delete_service_requests" ON service_requests
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid() AND au.is_active = true
    )
  );