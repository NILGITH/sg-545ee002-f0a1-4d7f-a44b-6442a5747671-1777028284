import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const testimonialsService = {
  // Lister tous les témoignages (admin)
  async getAllTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Lister les témoignages actifs (public)
  async getActiveTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Lister les témoignages en vedette
  async getFeaturedTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Créer un témoignage
  async createTestimonial(testimonial: {
    author_name: string;
    author_position: string;
    author_company: string;
    author_photo_url?: string;
    content: string;
    rating?: number;
    is_featured?: boolean;
    display_order?: number;
  }) {
    const { data, error } = await supabase
      .from("testimonials")
      .insert([testimonial])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mettre à jour un témoignage
  async updateTestimonial(id: string, updates: Partial<Tables<"testimonials">>) {
    const { data, error } = await supabase
      .from("testimonials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supprimer un témoignage
  async deleteTestimonial(id: string) {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  // Upload photo auteur
  async uploadAuthorPhoto(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `author-photos/${fileName}`;

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