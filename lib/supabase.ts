import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          user_id: string
          role: 'admin' | 'client' | 'coach'
          created_at: string
        }
        Insert: {
          user_id?: string
          role: 'admin' | 'client' | 'coach'
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: 'admin' | 'client' | 'coach'
          created_at?: string
        }
      }
      availability_slots: {
        Row: {
          id: string
          slot_date: string
          slot_time: string
          session_type: string
          is_active: boolean
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slot_date?: string
          slot_time?: string
          session_type?: string
          is_active?: boolean
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slot_date?: string
          slot_time?: string
          session_type?: string
          is_active?: boolean
          created_by?: string | null
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string | null
          date: string
          time: string
          session_type: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          date?: string
          time?: string
          session_type?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          date?: string
          time?: string
          session_type?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          message: string
          status: 'new' | 'read' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'new' | 'read' | 'archived'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: 'new' | 'read' | 'archived'
        }
      }
      program_enrolments: {
        Row: {
          id: string
          user_id: string
          program_name: string
          status: 'active' | 'completed' | 'cancelled'
          enrolled_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          program_name?: string
          status?: 'active' | 'completed' | 'cancelled'
          enrolled_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_name?: string
          status?: 'active' | 'completed' | 'cancelled'
          enrolled_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
