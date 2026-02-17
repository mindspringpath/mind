import { supabase } from './supabase'
import type { Database } from './supabase'

export type User = Database['public']['Tables']['users']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type ProgramEnrollment = Database['public']['Tables']['program_enrolments']['Row']

// -----------------------------
// AUTHENTICATION HELPERS
// -----------------------------
export async function signUp(email: string, password: string, fullName: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('signUp can only be called on the client side')
  }

  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/callback`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/auth/callback`

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: redirectUrl
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('signIn can only be called on the client side')
  }

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
  return true
}

export async function getCurrentUser() {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('getCurrentUser can only be called on the client side')
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function resetPassword(email: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('resetPassword can only be called on the client side')
  }

  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/reset-password`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/auth/reset-password`

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) throw error
  return data
}

export async function updatePassword(newPassword: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('updatePassword can only be called on the client side')
  }

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) throw error
  return data
}

// -----------------------------
// APPOINTMENT HELPERS
// -----------------------------
export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()
 
  if (error) throw error
  return data
}

export async function getUserAppointments(userId: string) {
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

// -----------------------------
// PROGRAM ENROLLMENT HELPERS
// -----------------------------
export async function createProgramEnrollment(enrollment: Omit<ProgramEnrollment, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('program_enrolments')
    .insert(enrollment)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserProgramEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('program_enrolments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// -----------------------------
// EMAIL & SMS HELPERS
// -----------------------------
export async function sendEmailConfirmation(appointmentId: string) {
  console.log('Email confirmation sent for appointment:', appointmentId)
  // TODO: Implement actual email sending
  return true
}

export async function sendEmailReminder(appointmentId: string) {
  console.log('Email reminder sent for appointment:', appointmentId)
  // TODO: Implement actual email sending
  return true
}

export async function sendSMSReminder(appointmentId: string, phoneNumber: string) {
  console.log('SMS reminder sent to:', phoneNumber, 'for appointment:', appointmentId)
  // TODO: Implement actual SMS sending
  return true
}