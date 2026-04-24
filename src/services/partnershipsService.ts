import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const partnershipsService = {
  // Lister tous les partenariats (admin)
  async getAllPartnerships() {
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Lister les partenariats actifs (public)
  async getActivePartnerships() {
    const { data, error } = await supabase
      .from("partnerships")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Créer un partenariat
  async createPartnership(partnership: {
    company_name: string;
    logo_url: string;
    website_url?: string;
    description?: string;
    category?: string;
    display_order?: number;
  }) {
    const { data, error } = await supabase
      .from("partnerships")
      .insert([partnership])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un partenariat
  async updatePartnership(id: string, updates: Partial<Tables<"partnerships">>) {
    const { data, error } = await supabase
      .from("partnerships")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un partenariat
  async deletePartnership(id: string) {
    const { error } = await supabase
      .from("partnerships")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Upload logo partenaire
  async uploadPartnerLogo(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `partner-logos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("company-documents")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("company-documents")
      .getPublicUrl(filePath);

    return data.publicUrl;
  },
};