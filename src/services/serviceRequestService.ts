import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type ServiceRequest = Tables<"service_requests">;

export const serviceRequestService = {
  /**
   * Créer une demande de Team Building
   */
  async createTeamBuildingRequest(data: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    message?: string;
    teamSize?: number;
    preferredDate?: string;
    activityType?: string;
    locationPreference?: string;
  }): Promise<ServiceRequest> {
    const { data: request, error } = await supabase
      .from("service_requests")
      .insert({
        request_type: "team_building",
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        team_size: data.teamSize,
        preferred_date: data.preferredDate,
        activity_type: data.activityType,
        location_preference: data.locationPreference,
      })
      .select()
      .single();

    if (error) throw error;
    return request;
  },

  /**
   * Créer une demande de Formation
   */
  async createFormationRequest(data: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    message?: string;
    trainingTopic?: string;
    participantsCount?: number;
    trainingFormat?: "intra" | "inter" | "elearning";
  }): Promise<ServiceRequest> {
    const { data: request, error } = await supabase
      .from("service_requests")
      .insert({
        request_type: "formation",
        company_name: data.companyName,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        training_topic: data.trainingTopic,
        participants_count: data.participantsCount,
        training_format: data.trainingFormat,
      })
      .select()
      .single();

    if (error) throw error;
    return request;
  },

  /**
   * Récupérer toutes les demandes (admin)
   */
  async getAllRequests(): Promise<ServiceRequest[]> {
    const { data, error } = await supabase
      .from("service_requests")
      .select("*, admin_users!service_requests_assigned_to_fkey(full_name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Récupérer les demandes par type
   */
  async getRequestsByType(type: "team_building" | "formation" | "recrutement" | "analyse_salariale"): Promise<ServiceRequest[]> {
    const { data, error } = await supabase
      .from("service_requests")
      .select("*")
      .eq("request_type", type)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Mettre à jour le statut d'une demande (admin)
   */
  async updateRequestStatus(
    id: string,
    status: "pending" | "in_progress" | "completed" | "cancelled",
    adminNotes?: string
  ): Promise<void> {
    const { error } = await supabase
      .from("service_requests")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Assigner une demande à un admin
   */
  async assignRequest(id: string, adminId: string): Promise<void> {
    const { error } = await supabase
      .from("service_requests")
      .update({ assigned_to: adminId })
      .eq("id", id);

    if (error) throw error;
  },

  /**
   * Supprimer une demande (admin)
   */
  async deleteRequest(id: string): Promise<void> {
    const { error } = await supabase
      .from("service_requests")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};