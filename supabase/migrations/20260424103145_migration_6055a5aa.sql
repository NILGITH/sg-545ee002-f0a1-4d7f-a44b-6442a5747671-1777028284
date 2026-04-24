-- Nettoyer les policies en double - Garder seulement les meilleures

-- 1. ADMIN_USERS - Supprimer les anciennes
DROP POLICY IF EXISTS "allow_authenticated_insert" ON admin_users;
DROP POLICY IF EXISTS "allow_authenticated_update" ON admin_users;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON admin_users;

-- Garder seulement: admin_read_own_profile, allow_read_own, super_admin_read_all

-- 2. APPLICATIONS - Supprimer les anciennes
DROP POLICY IF EXISTS "auth_insert_applications" ON applications;
DROP POLICY IF EXISTS "admin_read_all_applications" ON applications;
DROP POLICY IF EXISTS "user_read_own_applications" ON applications;

-- Garder seulement: candidates_create, admin_read_all, candidates_read_own, admin_update_status

-- 3. CANDIDATE_CVS - Supprimer les anciennes
DROP POLICY IF EXISTS "candidate_insert_own_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "candidate_update_own_cv" ON candidate_cvs;
DROP POLICY IF EXISTS "admin_read_all_cvs" ON candidate_cvs;

-- Garder seulement: candidate_insert_own, candidate_read_own, candidate_update_own, candidate_delete_own_cv, admin_read_all

-- 4. CANDIDATES - Supprimer les anciennes
DROP POLICY IF EXISTS "candidate_read_own_profile" ON candidates;
DROP POLICY IF EXISTS "candidate_update_own_profile" ON candidates;
DROP POLICY IF EXISTS "admin_read_all_candidates" ON candidates;

-- Garder seulement: candidate_insert_own, candidate_read_own, candidate_update_own, admin_read_all

-- 5. JOB_SUBMISSIONS - Supprimer les anciennes
DROP POLICY IF EXISTS "anon_insert_job_submissions" ON job_submissions;
DROP POLICY IF EXISTS "admin_read_job_submissions" ON job_submissions;
DROP POLICY IF EXISTS "admin_update_job_submissions" ON job_submissions;

-- Garder: public_insert_submission, admin_read_all_submissions, admin_update_submissions, admin_delete_submissions

-- 6. SERVICE_REQUESTS - Supprimer les anciennes
DROP POLICY IF EXISTS "anyone_can_create_service_request" ON service_requests;
DROP POLICY IF EXISTS "admins_can_read_service_requests" ON service_requests;
DROP POLICY IF EXISTS "admins_can_update_service_requests" ON service_requests;

-- Garder: public_insert_service_request, admin_read_all_service_requests, admin_update_service_requests, admin_delete_service_requests

-- 7. TESTIMONIALS - Supprimer les anciennes
DROP POLICY IF EXISTS "admin_full_access_testimonials" ON testimonials;

-- Garder: admin_manage_testimonials, public_read_active_testimonials

-- 8. PARTNERSHIPS - Supprimer les anciennes
DROP POLICY IF EXISTS "admin_full_access_partnerships" ON partnerships;

-- Garder: admin_manage_partnerships, public_read_active_partnerships

SELECT 'Policies nettoyées - plus de doublons' as status;