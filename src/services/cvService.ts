import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type CandidateCV = Tables<"candidate_cvs">;

export const cvService = {
  async uploadCV(file: File, userId: string, candidateId?: string) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("cvs")
      .getPublicUrl(fileName);

    const { data, error } = await supabase.from("candidate_cvs").insert({
      user_id: userId,
      candidate_id: candidateId,
      file_name: file.name,
      file_url: publicUrl,
      file_size: file.size,
      file_type: file.type,
      is_current: true,
    }).select().single();

    if (error) throw error;

    await supabase.rpc("set_current_cv", { cv_id: data.id, user_uuid: userId });

    return data;
  },

  async getUserCVs(userId: string) {
    const { data, error } = await supabase
      .from("candidate_cvs")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getCurrentCV(userId: string) {
    const { data, error } = await supabase
      .from("candidate_cvs")
      .select("*")
      .eq("user_id", userId)
      .eq("is_current", true)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  async setCurrentCV(cvId: string, userId: string) {
    const { error } = await supabase.rpc("set_current_cv", { 
      cv_id: cvId, 
      user_uuid: userId 
    });

    if (error) throw error;
  },

  async deleteCV(cvId: string, userId: string) {
    const { data: cv } = await supabase
      .from("candidate_cvs")
      .select("file_url")
      .eq("id", cvId)
      .eq("user_id", userId)
      .single();

    if (cv?.file_url) {
      const filePath = cv.file_url.split("/").slice(-2).join("/");
      await supabase.storage.from("cvs").remove([filePath]);
    }

    const { error } = await supabase
      .from("candidate_cvs")
      .delete()
      .eq("id", cvId)
      .eq("user_id", userId);

    if (error) throw error;
  },

  async getAllCVs() {
    const { data, error } = await supabase
      .from("candidate_cvs")
      .select(`
        *,
        candidates (
          full_name,
          email,
          phone
        )
      `)
      .order("uploaded_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};