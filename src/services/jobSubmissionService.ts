import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type JobSubmission = Tables<"job_submissions">;

export const jobSubmissionService = {
  async submitJob(submission: {
    company_name: string;
    company_email: string;
    company_phone?: string;
    job_title: string;
    job_description: string;
    job_requirements?: string;
    job_responsibilities?: string;
    contract_type: string;
    location: string;
    sector?: string;
    salary_range?: string;
    experience_level?: string;
  }) {
    const { data, error } = await supabase
      .from("job_submissions")
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllSubmissions() {
    const { data, error } = await supabase
      .from("job_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getSubmissionById(id: string) {
    const { data, error } = await supabase
      .from("job_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async approveSubmission(id: string, adminId: string) {
    const { data: submission } = await supabase
      .from("job_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (!submission) throw new Error("Submission not found");

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .insert({
        title: submission.job_title,
        company: submission.company_name,
        location: submission.location,
        contract_type: submission.contract_type,
        sector: submission.sector,
        description: submission.job_description,
        requirements: submission.job_requirements,
        responsibilities: submission.job_responsibilities,
        salary_range: submission.salary_range,
        experience_level: submission.experience_level,
        is_active: true,
      })
      .select()
      .single();

    if (jobError) throw jobError;

    const { error: updateError } = await supabase
      .from("job_submissions")
      .update({
        status: "approved",
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString(),
        published_job_id: job.id,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    return job;
  },

  async rejectSubmission(id: string, adminId: string, reason: string) {
    const { error } = await supabase
      .from("job_submissions")
      .update({
        status: "rejected",
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason,
      })
      .eq("id", id);

    if (error) throw error;
  },

  async deleteSubmission(id: string) {
    const { error } = await supabase
      .from("job_submissions")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};