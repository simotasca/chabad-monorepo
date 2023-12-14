export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          category: Database["public"]["Enums"]["article_category"]
          content: string
          created_at: string
          date: string
          draft: boolean
          id: number
          image: string
          preview: string
          slug: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["article_category"]
          content: string
          created_at?: string
          date?: string
          draft?: boolean
          id?: number
          image: string
          preview: string
          slug: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["article_category"]
          content?: string
          created_at?: string
          date?: string
          draft?: boolean
          id?: number
          image?: string
          preview?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      authors: {
        Row: {
          created_at: string
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          name?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string
          id: number
          id_event: number | null
          id_organization: number | null
          key: Database["public"]["Enums"]["contacts_key"]
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_event?: number | null
          id_organization?: number | null
          key: Database["public"]["Enums"]["contacts_key"]
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          id_event?: number | null
          id_organization?: number | null
          key?: Database["public"]["Enums"]["contacts_key"]
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_id_event_fkey"
            columns: ["id_event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_id_organization_fkey"
            columns: ["id_organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          city: string
          created_at: string
          date: string | null
          id: number
          main_image: string | null
          markdown: string | null
          name: string
          slug: string
        }
        Insert: {
          city: string
          created_at?: string
          date?: string | null
          id?: number
          main_image?: string | null
          markdown?: string | null
          name: string
          slug: string
        }
        Update: {
          city?: string
          created_at?: string
          date?: string | null
          id?: number
          main_image?: string | null
          markdown?: string | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      events_organizations: {
        Row: {
          created_at: string
          id: number
          id_event: number
          id_organization: number
        }
        Insert: {
          created_at?: string
          id?: number
          id_event: number
          id_organization: number
        }
        Update: {
          created_at?: string
          id?: number
          id_event?: number
          id_organization?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_organizations_id_event_fkey"
            columns: ["id_event"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizations_id_organization_fkey"
            columns: ["id_organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      live_responsibles: {
        Row: {
          created_at: string
          id: number
          id_live: number | null
          id_responsible: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          id_live?: number | null
          id_responsible?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          id_live?: number | null
          id_responsible?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "live_responsibles_id_live_fkey"
            columns: ["id_live"]
            isOneToOne: false
            referencedRelation: "live_video"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_responsibles_id_responsible_fkey"
            columns: ["id_responsible"]
            isOneToOne: false
            referencedRelation: "responsibles"
            referencedColumns: ["id"]
          }
        ]
      }
      live_video: {
        Row: {
          category: Database["public"]["Enums"]["video_live_category"]
          created_at: string
          date: string
          id: number
          responsible: number | null
          slug: string
          title: string
          youtube_link: string
        }
        Insert: {
          category: Database["public"]["Enums"]["video_live_category"]
          created_at?: string
          date?: string
          id?: number
          responsible?: number | null
          slug: string
          title: string
          youtube_link: string
        }
        Update: {
          category?: Database["public"]["Enums"]["video_live_category"]
          created_at?: string
          date?: string
          id?: number
          responsible?: number | null
          slug?: string
          title?: string
          youtube_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_video_responsible_fkey"
            columns: ["responsible"]
            isOneToOne: false
            referencedRelation: "responsibles"
            referencedColumns: ["id"]
          }
        ]
      }
      news: {
        Row: {
          category: Database["public"]["Enums"]["news_category"] | null
          content: string
          created_at: string
          date: string
          draft: boolean
          id: number
          image: string
          preview: string
          slug: string
          title: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["news_category"] | null
          content: string
          created_at?: string
          date?: string
          draft?: boolean
          id?: number
          image: string
          preview: string
          slug: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["news_category"] | null
          content?: string
          created_at?: string
          date?: string
          draft?: boolean
          id?: number
          image?: string
          preview?: string
          slug?: string
          title?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string
          city: string
          content: string | null
          created_at: string
          id: number
          link_donate: string | null
          logo: string | null
          main_image: string | null
          markdown: string
          name: string
          slogan: string | null
          slug: string
          website: string | null
        }
        Insert: {
          address: string
          city: string
          content?: string | null
          created_at?: string
          id?: number
          link_donate?: string | null
          logo?: string | null
          main_image?: string | null
          markdown: string
          name: string
          slogan?: string | null
          slug?: string
          website?: string | null
        }
        Update: {
          address?: string
          city?: string
          content?: string | null
          created_at?: string
          id?: number
          link_donate?: string | null
          logo?: string | null
          main_image?: string | null
          markdown?: string
          name?: string
          slogan?: string | null
          slug?: string
          website?: string | null
        }
        Relationships: []
      }
      responsibles: {
        Row: {
          created_at: string
          email: string
          id: number
          id_organization: number | null
          name: string
          telephone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          id_organization?: number | null
          name: string
          telephone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          id_organization?: number | null
          name?: string
          telephone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responsibles_id_organization_fkey"
            columns: ["id_organization"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      scraped: {
        Row: {
          created_at: string
          id: number
          image: string | null
          source: Database["public"]["Enums"]["scraper_website"]
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          source: Database["public"]["Enums"]["scraper_website"]
          title: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          source?: Database["public"]["Enums"]["scraper_website"]
          title?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      enum_values: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      events_with_organizations: {
        Args: {
          limitation: number
        }
        Returns: {
          e_id: number
          e_created_at: string
          e_name: string
          e_markdown: string
          e_main_image: string
          e_slug: string
          o_id: number
          o_name: string
        }[]
      }
    }
    Enums: {
      article_category: "torah" | "family"
      contacts_key:
        | "telephone"
        | "email"
        | "iban"
        | "facebook"
        | "instagram"
        | "tiktok"
        | "youtube"
        | "twitter"
        | "linkedin"
      news_category: "mazaltov" | "comunità" | "politica" | "società"
      scraper_website: "it-chabad"
      video_live_category: "video" | "live"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

