export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      communication_logs: {
        Row: {
          clicked: boolean | null
          communication_date: string | null
          communication_type: string
          contact_id: string
          created_at: string | null
          cta_included: boolean | null
          id: string
          message_content: string | null
          notes: string | null
          opened: boolean | null
          responded: boolean | null
          template_used: string | null
          updated_at: string | null
        }
        Insert: {
          clicked?: boolean | null
          communication_date?: string | null
          communication_type: string
          contact_id: string
          created_at?: string | null
          cta_included?: boolean | null
          id?: string
          message_content?: string | null
          notes?: string | null
          opened?: boolean | null
          responded?: boolean | null
          template_used?: string | null
          updated_at?: string | null
        }
        Update: {
          clicked?: boolean | null
          communication_date?: string | null
          communication_type?: string
          contact_id?: string
          created_at?: string | null
          cta_included?: boolean | null
          id?: string
          message_content?: string | null
          notes?: string | null
          opened?: boolean | null
          responded?: boolean | null
          template_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communication_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_organizations: {
        Row: {
          contact_id: string
          organization_id: string
          role: string
        }
        Insert: {
          contact_id: string
          organization_id: string
          role: string
        }
        Update: {
          contact_id?: string
          organization_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_organizations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          communication_preferences: Json | null
          created_at: string | null
          email: string
          engagement_score: number | null
          first_name: string
          id: string
          last_contacted: string | null
          last_name: string
          phone: string | null
          referral_code: string | null
          referral_source: string | null
          referrals_made_count: number | null
          registration_date: string | null
          registration_source: string | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          communication_preferences?: Json | null
          created_at?: string | null
          email: string
          engagement_score?: number | null
          first_name: string
          id?: string
          last_contacted?: string | null
          last_name: string
          phone?: string | null
          referral_code?: string | null
          referral_source?: string | null
          referrals_made_count?: number | null
          registration_date?: string | null
          registration_source?: string | null
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          communication_preferences?: Json | null
          created_at?: string | null
          email?: string
          engagement_score?: number | null
          first_name?: string
          id?: string
          last_contacted?: string | null
          last_name?: string
          phone?: string | null
          referral_code?: string | null
          referral_source?: string | null
          referrals_made_count?: number | null
          registration_date?: string | null
          registration_source?: string | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      content_submissions: {
        Row: {
          content_type: string
          contributor_id: string
          created_at: string | null
          description: string | null
          id: string
          link: string | null
          publication_date: string | null
          review_notes: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_type: string
          contributor_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          publication_date?: string | null
          review_notes?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_type?: string
          contributor_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          link?: string | null
          publication_date?: string | null
          review_notes?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_submissions_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          attendee_count: number | null
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          listed_date: string | null
          location: Json
          name: string
          organizer_id: string
          registration_link: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          target_audience: string[] | null
          updated_at: string | null
        }
        Insert: {
          attendee_count?: number | null
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          listed_date?: string | null
          location: Json
          name: string
          organizer_id: string
          registration_link?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          target_audience?: string[] | null
          updated_at?: string | null
        }
        Update: {
          attendee_count?: number | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          listed_date?: string | null
          location?: Json
          name?: string
          organizer_id?: string
          registration_link?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          target_audience?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          partnership_types: string[] | null
          primary_contact_id: string | null
          relationship_stage:
            | Database["public"]["Enums"]["relationship_stage"]
            | null
          resources_offered: string[] | null
          type: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          partnership_types?: string[] | null
          primary_contact_id?: string | null
          relationship_stage?:
            | Database["public"]["Enums"]["relationship_stage"]
            | null
          resources_offered?: string[] | null
          type: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          partnership_types?: string[] | null
          primary_contact_id?: string | null
          relationship_stage?:
            | Database["public"]["Enums"]["relationship_stage"]
            | null
          resources_offered?: string[] | null
          type?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_applications: {
        Row: {
          applicant_id: string
          created_at: string | null
          decision_date: string | null
          id: string
          motivation: string
          project_type: Database["public"]["Enums"]["project_type"]
          relevant_experience: string | null
          reviewer_notes: string | null
          role_applied_for: string
          status: Database["public"]["Enums"]["application_status"] | null
          submission_date: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id: string
          created_at?: string | null
          decision_date?: string | null
          id?: string
          motivation: string
          project_type: Database["public"]["Enums"]["project_type"]
          relevant_experience?: string | null
          reviewer_notes?: string | null
          role_applied_for: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submission_date?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string
          created_at?: string | null
          decision_date?: string | null
          id?: string
          motivation?: string
          project_type?: Database["public"]["Enums"]["project_type"]
          relevant_experience?: string | null
          reviewer_notes?: string | null
          role_applied_for?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          submission_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      project_interests: {
        Row: {
          contact_id: string
          project_type: Database["public"]["Enums"]["project_type"]
        }
        Insert: {
          contact_id: string
          project_type: Database["public"]["Enums"]["project_type"]
        }
        Update: {
          contact_id?: string
          project_type?: Database["public"]["Enums"]["project_type"]
        }
        Relationships: [
          {
            foreignKeyName: "project_interests_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_directory: {
        Row: {
          contact_information: Json
          created_at: string | null
          description: string
          eligibility_criteria: string | null
          id: string
          listed_date: string | null
          organization_id: string
          service_type: string[]
          status: Database["public"]["Enums"]["content_status"] | null
          submission_date: string | null
          target_users: string[] | null
          updated_at: string | null
        }
        Insert: {
          contact_information: Json
          created_at?: string | null
          description: string
          eligibility_criteria?: string | null
          id?: string
          listed_date?: string | null
          organization_id: string
          service_type: string[]
          status?: Database["public"]["Enums"]["content_status"] | null
          submission_date?: string | null
          target_users?: string[] | null
          updated_at?: string | null
        }
        Update: {
          contact_information?: Json
          created_at?: string | null
          description?: string
          eligibility_criteria?: string | null
          id?: string
          listed_date?: string | null
          organization_id?: string
          service_type?: string[]
          status?: Database["public"]["Enums"]["content_status"] | null
          submission_date?: string | null
          target_users?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_directory_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      seats: {
        Row: {
          id: string
          max_seats: number
          updated_at: string | null
          used_seats: number
        }
        Insert: {
          id?: string
          max_seats?: number
          updated_at?: string | null
          used_seats?: number
        }
        Update: {
          id?: string
          max_seats?: number
          updated_at?: string | null
          used_seats?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          attribution_level: string
          created_at: string | null
          featured: boolean | null
          id: string
          photo_link: string | null
          project_referenced: Database["public"]["Enums"]["project_type"]
          publication_locations: string[] | null
          source_id: string
          status: Database["public"]["Enums"]["content_status"] | null
          testimonial_text: string
          updated_at: string | null
        }
        Insert: {
          attribution_level: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          photo_link?: string | null
          project_referenced: Database["public"]["Enums"]["project_type"]
          publication_locations?: string[] | null
          source_id: string
          status?: Database["public"]["Enums"]["content_status"] | null
          testimonial_text: string
          updated_at?: string | null
        }
        Update: {
          attribution_level?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          photo_link?: string | null
          project_referenced?: Database["public"]["Enums"]["project_type"]
          publication_locations?: string[] | null
          source_id?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          testimonial_text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      are_seats_available: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      application_status: "pending" | "reviewing" | "accepted" | "rejected"
      content_status: "draft" | "reviewing" | "published" | "archived"
      project_type: "coop" | "storylab" | "channel" | "ivor"
      relationship_stage: "prospect" | "engaged" | "partner" | "inactive"
      user_type: "black_queer_man" | "organizer" | "ally" | "organization"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
