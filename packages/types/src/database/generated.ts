export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
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
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_id_organization_fkey"
            columns: ["id_organization"]
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
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizations_id_organization_fkey"
            columns: ["id_organization"]
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
        Relationships: []
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
        | "facebook"
        | "instagram"
        | "tiktok"
        | "youtube"
        | "twitter"
        | "linkedin"
        | "telephone"
        | "email"
        | "iban"
      news_category: "mazaltov" | "comunità" | "politica" | "società"
      scraper_website: "it-chabad"
      video_live_category: "video" | "live"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

