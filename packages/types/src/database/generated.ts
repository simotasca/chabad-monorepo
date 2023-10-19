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
      organization_contacts: {
        Row: {
          content: string
          created_at: string
          description: string
          id: number
          id_organization: number | null
        }
        Insert: {
          content: string
          created_at?: string
          description: string
          id?: number
          id_organization?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          description?: string
          id?: number
          id_organization?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_contacts_id_organization_fkey"
            columns: ["id_organization"]
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          }
        ]
      }
      organizations: {
        Row: {
          address: string
          city: string
          contacts: string[] | null
          content: string | null
          created_at: string
          id: number
          "main image": string | null
          name: string
          slug: string
          website: string | null
        }
        Insert: {
          address: string
          city: string
          contacts?: string[] | null
          content?: string | null
          created_at?: string
          id?: number
          "main image"?: string | null
          name: string
          slug?: string
          website?: string | null
        }
        Update: {
          address?: string
          city?: string
          contacts?: string[] | null
          content?: string | null
          created_at?: string
          id?: number
          "main image"?: string | null
          name?: string
          slug?: string
          website?: string | null
        }
        Relationships: []
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
    }
    Enums: {
      article_category: "torah" | "family"
      scraper_website: "it-chabad"
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

