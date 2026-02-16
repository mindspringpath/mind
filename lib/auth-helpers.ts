import { supabase } from './supabase'
import type { Database } from './supabase'

export type User = Database['public']['Tables']['users']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type ProgramEnrollment = Database['public']['Tables']['program_enrolments']['Row']

// Authentication helpers
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// User profile helpers
export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: userId, ...updates })
    .select()
    .single()

  if (error) throw error
  return data
}

// Appointment helpers
export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserAppointments(userId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) throw error
  return data || []
}

export async function updateAppointment(id: string, updates: Partial<Appointment>) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function cancelAppointment(id: string) {
  return updateAppointment(id, { status: 'cancelled' })
}

// Program enrollment helpers
export async function createProgramEnrollment(enrollment: Omit<ProgramEnrollment, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('program_enrolments')
    .insert(enrollment)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserProgramEnrollments(userId: string): Promise<ProgramEnrollment[]> {
  const { data, error } = await supabase
    .from('program_enrolments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Email and SMS reminder placeholders
export async function sendEmailConfirmation(appointmentId: string) {
  // TODO: Implement Supabase Edge Function for email sending
  console.log('Email confirmation sent for appointment:', appointmentId)
}

export async function sendEmailReminder(appointmentId: string) {
  // TODO: Implement Supabase Edge Function for email reminder
  console.log('Email reminder sent for appointment:', appointmentId)
}

export async function sendSMSReminder(appointmentId: string, phoneNumber: string) {
  // TODO: Implement SMS API integration (placeholder)
  console.log('SMS reminder sent to:', phoneNumber, 'for appointment:', appointmentId)
}

// Real-time subscriptions
export function subscribeToAppointments(userId: string, callback: (appointment: Appointment) => void) {
  return supabase
    .channel(`appointments:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'appointments',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          callback(payload.new as Appointment)
        }
      }
    )
    .subscribe()
}
