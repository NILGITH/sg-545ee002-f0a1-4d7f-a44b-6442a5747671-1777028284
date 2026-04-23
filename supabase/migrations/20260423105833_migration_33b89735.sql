-- Enable RLS sur toutes les tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies pour jobs (T2: public read, auth write)
CREATE POLICY "public_read_jobs" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "auth_insert_jobs" ON jobs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_jobs" ON jobs FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_jobs" ON jobs FOR DELETE USING (auth.uid() IS NOT NULL);

-- Policies pour applications (T3: anon insert pour candidatures publiques, auth read)
CREATE POLICY "anon_insert_applications" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_applications" ON applications FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_applications" ON applications FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Policies pour companies (T3: anon insert pour formulaire entreprise, auth read)
CREATE POLICY "anon_insert_companies" ON companies FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_companies" ON companies FOR SELECT USING (auth.uid() IS NOT NULL);

-- Policies pour candidates (T3: anon insert pour inscription candidat)
CREATE POLICY "anon_insert_candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_candidates" ON candidates FOR SELECT USING (auth.uid() IS NOT NULL);

-- Policies pour news (T2: public read, auth write)
CREATE POLICY "public_read_news" ON news FOR SELECT USING (published = true);
CREATE POLICY "auth_manage_news" ON news FOR ALL USING (auth.uid() IS NOT NULL);

-- Policies pour contact (T3: anon insert, auth read)
CREATE POLICY "anon_insert_contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "auth_read_contact" ON contact_submissions FOR SELECT USING (auth.uid() IS NOT NULL);

-- Trigger pour auto-create profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (NEW.id, NEW.email) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();