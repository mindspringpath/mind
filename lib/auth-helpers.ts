import { supabase } from './supabase'
import type { Database } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export { supabase }
export type User = SupabaseUser
export type DatabaseUser = Database['public']['Tables']['users']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type ProgramEnrollment = Database['public']['Tables']['program_enrolments']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserRole = Database['public']['Tables']['user_roles']['Row']
export type AvailabilitySlot = Database['public']['Tables']['availability_slots']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user) return false

    // Check if user has admin role
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    return roleData?.role === 'admin'
  } catch (error) {
    return false
  }
}

// -----------------------------
// PROFILE HELPERS
// -----------------------------
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
    throw error
  }
  return data
}

export async function createProfile(profile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(id: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// -----------------------------
// USER ROLE HELPERS
// -----------------------------
export async function assignUserRole(userId: string, role: 'client' | 'coach' | 'admin') {
  const { data, error } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserRoles(userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// -----------------------------
// AVAILABILITY HELPERS
// -----------------------------
export async function createAvailabilitySlot(slot: Omit<AvailabilitySlot, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('availability_slots')
    .insert(slot)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getAvailabilitySlots(date?: string) {
  let query = supabase
    .from('availability_slots')
    .select('*')
    .eq('is_active', true)
    
  if (date) {
    query = query.eq('slot_date', date)
  }
  
  const { data, error } = await query.order('slot_time', { ascending: true })

  if (error) throw error
  return data
}

export async function updateAvailabilitySlot(id: string, updates: Partial<AvailabilitySlot>) {
  const { data, error } = await supabase
    .from('availability_slots')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}

// -----------------------------
// CONTACT MESSAGE HELPERS
// -----------------------------
export async function createContactMessage(message: {
  full_name: string
  email: string
  phone?: string
  message: string
  status?: 'new' | 'read' | 'archived'
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(message)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateContactMessage(id: string, updates: {
  status?: 'new' | 'read' | 'archived'
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

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

export async function getCurrentUser(): Promise<User | null> {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('getCurrentUser can only be called on the client side')
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user || null
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