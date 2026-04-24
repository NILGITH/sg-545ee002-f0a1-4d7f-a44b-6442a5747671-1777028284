import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type JobSubmission = Tables<"job_submissions">;

export const jobSubmissionService = {
  async uploadCompanyLogo(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `company-logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("company-documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("company-documents")
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async submitJob(submission: {
    company_name: string;
    company_email: string;
    company_phone?: string;
    company_logo_url?: string;
    submitter_name: string;
    submitter_position: string;
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
    // Nettoyer les données - retirer les valeurs vides
    const cleanData: any = {
      company_name: submission.company_name,
      company_email: submission.company_email,
      submitter_name: submission.submitter_name,
      submitter_position: submission.submitter_position,
      job_title: submission.job_title,
      job_description: submission.job_description,
      contract_type: submission.contract_type,
      location: submission.location,
    };

    // Ajouter les champs optionnels seulement s'ils ont une valeur
    if (submission.company_phone) cleanData.company_phone = submission.company_phone;
    if (submission.company_logo_url) cleanData.company_logo_url = submission.company_logo_url;
    if (submission.job_requirements) cleanData.job_requirements = submission.job_requirements;
    if (submission.job_responsibilities) cleanData.job_responsibilities = submission.job_responsibilities;
    if (submission.sector) cleanData.sector = submission.sector;
    if (submission.salary_range) cleanData.salary_range = submission.salary_range;
    if (submission.experience_level) cleanData.experience_level = submission.experience_level;

    console.log("Clean data to insert:", cleanData);

    const { data, error } = await supabase
      .from("job_submissions")
      .insert(cleanData)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }
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

  async updateSubmission(id: string, updates: Partial<JobSubmission>) {
    const { data, error } = await supabase
      .from("job_submissions")
      .update(updates)
      .eq("id", id)
      .select()
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
        company_name: submission.company_name,
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