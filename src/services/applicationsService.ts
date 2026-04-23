import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Application = Database["public"]["Tables"]["applications"]["Row"];
type ApplicationInsert = Database["public"]["Tables"]["applications"]["Insert"];
type ApplicationUpdate = Database["public"]["Tables"]["applications"]["Update"];

export const applicationsService = {
  async submitApplication(application: ApplicationInsert) {
    const { data, error } = await supabase
      .from("applications")
      .insert(application)
      .select()
      .single();

    console.log("submitApplication:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },

  async getApplicationsByJob(jobId: string) {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false });

    console.log("getApplicationsByJob:", { data, error });
    if (error) console.error("Error:", error);
    return { data: data || [], error };
  },

  async getAllApplications() {
    const { data, error } = await supabase
      .from("applications")
      .select("*, jobs(title, company_name)")
      .order("created_at", { ascending: false });

    console.log("getAllApplications:", { data, error });
    if (error) console.error("Error:", error);
    return { data: data || [], error };
  },

  async updateApplicationStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    console.log("updateApplicationStatus:", { data, error });
    if (error) console.error("Error:", error);
    return { data, error };
  },
};