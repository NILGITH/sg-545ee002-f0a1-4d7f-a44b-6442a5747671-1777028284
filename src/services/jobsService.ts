import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];
type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
type JobUpdate = Database["public"]["Tables"]["jobs"]["Update"];

export const jobsService = {
  async getActiveJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    console.log("getActiveJobs:", { data, error });
    if (error) console.error("Error:", error);
    return { data: data || [], error };
  },

  async getJobById(id: string) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    console.log("getJobById:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async searchJobs(searchTerm: string, filters?: {
    contract_type?: string;
    location?: string;
    sector?: string;
  }) {
    let query = supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true);

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,company_name.ilike.%${searchTerm}%`);
    }

    if (filters?.contract_type) {
      query = query.eq("contract_type", filters.contract_type);
    }

    if (filters?.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters?.sector) {
      query = query.ilike("sector", `%${filters.sector}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    console.log("searchJobs:", { data, error });
    if (error) console.error("Error:", error);
    return { data: data || [], error };
  },

  async createJob(job: JobInsert) {
    console.log("🔨 Creating job with data:", job);
    
    // Vérifier l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();
    console.log("👤 Current user:", user?.id, user?.email);
    
    // Vérifier si c'est un admin actif
    if (user) {
      const { data: adminCheck } = await supabase
        .from("admin_users")
        .select("id, email, is_active")
        .eq("id", user.id)
        .single();
      
      console.log("🔐 Admin check:", adminCheck);
    }
    
    const { data, error } = await supabase
      .from("jobs")
      .insert(job)
      .select()
      .single();

    console.log("✅ Create job result:", { data, error });
    if (error) {
      console.error("❌ Create job error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
    }
    
    return { data, error };
  },

  async updateJob(id: string, updates: JobUpdate) {
    const { data, error } = await supabase
      .from("jobs")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    console.log("updateJob:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async deleteJob(id: string) {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    console.log("deleteJob:", { error });
    if (error) console.error("Error:", error);
    return { error };
  },
};