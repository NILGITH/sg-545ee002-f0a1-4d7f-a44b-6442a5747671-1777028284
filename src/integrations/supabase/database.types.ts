 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          candidate_email: string
          candidate_name: string
          candidate_phone: string | null
          cover_letter: string | null
          created_at: string | null
          cv_url: string | null
          id: string
          job_id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          candidate_email: string
          candidate_name: string
          candidate_phone?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          job_id: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          candidate_email?: string
          candidate_name?: string
          candidate_phone?: string | null
          cover_letter?: string | null
          created_at?: string | null
          cv_url?: string | null
          id?: string
          job_id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_cvs: {
        Row: {
          candidate_id: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          is_current: boolean | null
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          candidate_id?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          is_current?: boolean | null
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          candidate_id?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_current?: boolean | null
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_cvs_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          bio: string | null
          created_at: string | null
          current_position: string | null
          cv_url: string | null
          email: string
          experience_years: number | null
          full_name: string
          id: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          skills: string[] | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          current_position?: string | null
          cv_url?: string | null
          email: string
          experience_years?: number | null
          full_name: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          current_position?: string | null
          cv_url?: string | null
          email?: string
          experience_years?: number | null
          full_name?: string
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          skills?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          description: string | null
          email: string
          id: string
          name: string
          phone: string | null
          sector: string | null
          size: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          sector?: string | null
          size?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          sector?: string | null
          size?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      job_submissions: {
        Row: {
          company_email: string
          company_id: string | null
          company_logo_url: string | null
          company_name: string
          company_phone: string | null
          contract_type: string
          created_at: string | null
          experience_level: string | null
          id: string
          job_description: string
          job_requirements: string | null
          job_responsibilities: string | null
          job_title: string
          location: string
          published_job_id: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          salary_range: string | null
          sector: string | null
          status: string | null
          submitter_name: string | null
          submitter_position: string | null
          updated_at: string | null
        }
        Insert: {
          company_email: string
          company_id?: string | null
          company_logo_url?: string | null
          company_name: string
          company_phone?: string | null
          contract_type: string
          created_at?: string | null
          experience_level?: string | null
          id?: string
          job_description: string
          job_requirements?: string | null
          job_responsibilities?: string | null
          job_title: string
          location: string
          published_job_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          salary_range?: string | null
          sector?: string | null
          status?: string | null
          submitter_name?: string | null
          submitter_position?: string | null
          updated_at?: string | null
        }
        Update: {
          company_email?: string
          company_id?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_phone?: string | null
          contract_type?: string
          created_at?: string | null
          experience_level?: string | null
          id?: string
          job_description?: string
          job_requirements?: string | null
          job_responsibilities?: string | null
          job_title?: string
          location?: string
          published_job_id?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          salary_range?: string | null
          sector?: string | null
          status?: string | null
          submitter_name?: string | null
          submitter_position?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_submissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_submissions_published_job_id_fkey"
            columns: ["published_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_name: string
          contract_type: string
          created_at: string | null
          description: string
          experience_level: string | null
          id: string
          is_active: boolean | null
          location: string
          published_at: string | null
          requirements: string | null
          responsibilities: string | null
          salary_range: string | null
          sector: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          contract_type: string
          created_at?: string | null
          description: string
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location: string
          published_at?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          sector?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          contract_type?: string
          created_at?: string | null
          description?: string
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          location?: string
          published_at?: string | null
          requirements?: string | null
          responsibilities?: string | null
          salary_range?: string | null
          sector?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      partnerships: {
        Row: {
          category: string | null
          company_name: string
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          category?: string | null
          company_name: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          category?: string | null
          company_name?: string
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          activity_type: string | null
          admin_notes: string | null
          assigned_to: string | null
          company_name: string
          contact_name: string
          created_at: string | null
          email: string
          id: string
          location_preference: string | null
          message: string | null
          participants_count: number | null
          phone: string
          preferred_date: string | null
          request_type: string
          status: string | null
          team_size: number | null
          training_format: string | null
          training_topic: string | null
          updated_at: string | null
        }
        Insert: {
          activity_type?: string | null
          admin_notes?: string | null
          assigned_to?: string | null
          company_name: string
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          location_preference?: string | null
          message?: string | null
          participants_count?: number | null
          phone: string
          preferred_date?: string | null
          request_type: string
          status?: string | null
          team_size?: number | null
          training_format?: string | null
          training_topic?: string | null
          updated_at?: string | null
        }
        Update: {
          activity_type?: string | null
          admin_notes?: string | null
          assigned_to?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          location_preference?: string | null
          message?: string | null
          participants_count?: number | null
          phone?: string
          preferred_date?: string | null
          request_type?: string
          status?: string | null
          team_size?: number | null
          training_format?: string | null
          training_topic?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author_company: string
          author_name: string
          author_photo_url: string | null
          author_position: string
          content: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          author_company: string
          author_name: string
          author_photo_url?: string | null
          author_position: string
          content: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          author_company?: string
          author_name?: string
          author_photo_url?: string | null
          author_position?: string
          content?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_super_admin: { Args: never; Returns: boolean }
      set_current_cv: {
        Args: { cv_id: string; user_uuid: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
