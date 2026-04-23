import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Candidate = Database["public"]["Tables"]["candidates"]["Row"];
type CandidateInsert = Database["public"]["Tables"]["candidates"]["Insert"];
type CandidateUpdate = Database["public"]["Tables"]["candidates"]["Update"];

export const candidateService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from("candidates")
      .select("*")
      .eq("user_id", userId)
      .single();

    console.log("getProfile:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async createProfile(profile: CandidateInsert) {
    const { data, error } = await supabase
      .from("candidates")
      .insert(profile)
      .select()
      .single();

    console.log("createProfile:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async updateProfile(userId: string, updates: CandidateUpdate) {
    const { data, error } = await supabase
      .from("candidates")
      .update(updates)
      .eq("user_id", userId)
      .select()
      .single();

    console.log("updateProfile:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async getUserApplications(userId: string) {
    const { data, error } = await supabase
      .from("applications")
      .select(`
        *,
        jobs:job_id (
          id,
          title,
          company_name,
          location,
          contract_type
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    console.log("getUserApplications:", { data, error });
    if (error) console.error("Error:", error);
    
    const applications = data?.map(app => ({
      ...app,
      jobs: Array.isArray(app.jobs) ? app.jobs[0] : app.jobs
    })) || [];
    
    return { data: applications, error };
  },

  async applyToJob(application: {
    job_id: string;
    user_id: string;
    candidate_name: string;
    candidate_email: string;
    candidate_phone?: string;
    cover_letter?: string;
    cv_url?: string;
  }) {
    const { data, error } = await supabase
      .from("applications")
      .insert({
        ...application,
        status: "pending",
      })
      .select()
      .single();

    console.log("applyToJob:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },
};