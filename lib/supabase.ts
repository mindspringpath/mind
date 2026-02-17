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
          email: string
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          email: string
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          created_at?: string
        }
      }
appointments: {
  Row: {
    id: string
    user_id: string
    full_name: string | null
    email: string | null
    phone: string | null
    date: string
    time: string
    session_type: string
    status: 'pending' | 'confirmed' | 'cancelled'
    notes: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    user_id?: string
    full_name?: string | null
    email?: string | null
    phone?: string | null
    date?: string
    time?: string
    session_type?: string
    status?: 'pending' | 'confirmed' | 'cancelled'
    notes?: string | null
    created_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    full_name?: string | null
    email?: string | null
    phone?: string | null
    date?: string
    time?: string
    session_type?: string
    status?: 'pending' | 'confirmed' | 'cancelled'
    notes?: string | null
  }
}
      program_enrolments: {
        Row: {
          id: string
          user_id: string
          program_name: string
          start_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          program_name: string
          start_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          program_name?: string
          start_date?: string
          created_at?: string
        }
      }
    }
  }
}
