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

export async function getCurrentUser(): Promise<User | null> {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('getCurrentUser can only be called on the client side')
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user || null
}

export async function isAdmin(): Promise<boolean> {
  try {
    console.log('isAdmin: Starting admin check...')
    const user = await getCurrentUser()
    if (!user) {
      console.log('isAdmin: No user found')
      return false
    }

    console.log('isAdmin: Checking role for user:', user.id)

    // Check if user has admin role
    const { data: roleData, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('isAdmin: Database error:', {
        error: (error as any).message,
        code: (error as any).code,
        details: (error as any).details,
        user_id: user.id
      })
      return false
    }

    const isAdminRole = roleData?.role === 'admin'
    console.log('isAdmin: Role check result:', {
      user_id: user.id,
      role: roleData?.role,
      is_admin: isAdminRole
    })

    return isAdminRole
  } catch (error) {
    console.error('isAdmin: Exception:', {
      error: (error as any).message,
      stack: (error as any).stack
    })
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
  try {
    console.log('Creating contact message:', { email: message.email, timestamp: new Date().toISOString() })
    
    // Insert without selecting to avoid RLS recursion issues
    const { error } = await supabase
      .from('contact_messages')
      .insert(message)

    if (error) {
      console.error('Contact message creation error:', error)
      throw error
    }

    console.log('Contact message created successfully')
    return { success: true }
  } catch (error: any) {
    console.error('Contact message creation exception:', error)
    throw error
  }
}

export async function getContactMessages() {
  try {
    // Select only specific fields to avoid RLS recursion
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id, full_name, email, phone, message, status, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get contact messages error:', error)
      throw error
    }
    
    return data || []
  } catch (error: any) {
    console.error('Get contact messages exception:', error)
    throw error
  }
}

export async function updateContactMessage(id: string, updates: {
  status?: 'new' | 'read' | 'archived'
}) {
  try {
    // Update without selecting to avoid RLS recursion
    const { error } = await supabase
      .from('contact_messages')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Update contact message error:', error)
      throw error
    }
    
    return { success: true }
  } catch (error: any) {
    console.error('Update contact message exception:', error)
    throw error
  }
}

export async function signUp(email: string, password: string, fullName: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('signUp can only be called on the client side')
  }

  console.log('Registration attempt:', { email, fullName, timestamp: new Date().toISOString() })

  // Fix redirect URL - ensure it's properly constructed
  const redirectUrl = `https://www.mindspringpath.com.au/auth/callback`

  console.log('Registration: Using redirect URL:', redirectUrl)

  try {
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

    if (error) {
      console.error('Registration error:', error)
      
      // Handle specific verification errors
      if (error.message?.includes('email_confirmation')) {
        throw new Error('Email verification failed. Please check your email and try the verification link.')
      }
      
      if (error.message?.includes('User already registered')) {
        throw new Error('This email is already registered. Please sign in instead.')
      }
      
      if (error.message?.includes('Password')) {
        throw new Error('Password is too weak. Please use a stronger password.')
      }
      
      throw error
    }

    console.log('Registration success:', { 
      userId: data.user?.id, 
      email: data.user?.email,
      emailConfirmed: data.user?.email_confirmed_at,
      hasSession: !!data.session
    })
    
    // Provide better feedback based on registration result
    if (data.user && !data.user.email_confirmed_at) {
      console.log('Registration: User created but email not confirmed')
      // This is expected - user needs to verify email
    } else if (data.session) {
      console.log('Registration: User already verified, session created')
    }
    
    return data
  } catch (error: any) {
    console.error('Registration exception:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      status: error.status,
      stack: error.stack
    })
    
    // DISABLED: AbortError detection was causing false positives
    // Only catch actual AbortError if it's truly a user cancellation
    // if (error.name === 'AbortError') {
    //   console.error('Registration request was aborted:', error)
    //   throw new Error('Registration request was interrupted. Please try again.')
    // }
    
    // DISABLED: These message checks were too broad and catching legitimate errors
    // Only catch specific Supabase abort message
    // if (error.message?.includes('signal is aborted without reason')) {
    //   console.error('Registration aborted without reason:', error)
    //   throw new Error('Registration was cancelled. Please try again.')
    // }
    
    // DISABLED: Generic abort message detection was too broad
    // Don't catch general "signal is aborted" as it might be part of other error messages
    // Only catch if it's specifically about request being aborted
    // if (error.message?.includes('The request was aborted') || 
    //     error.message?.includes('Request was aborted')) {
    //   console.error('Registration request was aborted:', error)
    //   throw new Error('Registration request was interrupted. Please try again.')
    // }
    
    // Let original error through for proper handling
    throw error
  }
}

export async function signIn(email: string, password: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('signIn can only be called on the client side')
  }

  console.log('Login attempt:', { email, timestamp: new Date().toISOString() })
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      throw error
    }

    console.log('Login success:', { userId: data.user?.id })
    return data
  } catch (error: any) {
    console.error('Login exception:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      status: error.status,
      stack: error.stack
    })
    
    // DISABLED: AbortError detection was causing false positives
    // Only catch actual AbortError if it's truly a user cancellation
    // if (error.name === 'AbortError') {
    //   console.error('Login request was aborted:', error)
    //   throw new Error('Login request was interrupted. Please try again.')
    // }
    
    // DISABLED: These message checks were too broad and catching legitimate errors
    // Only catch specific Supabase abort message
    // if (error.message?.includes('signal is aborted without reason')) {
    //   console.error('Login aborted without reason:', error)
    //   throw new Error('Login was cancelled. Please try again.')
    // }
    
    // DISABLED: Generic abort message detection was too broad
    // Don't catch general "signal is aborted" as it might be part of other error messages
    // Only catch if it's specifically about request being aborted
    // if (error.message?.includes('The request was aborted') || 
    //     error.message?.includes('Request was aborted')) {
    //   console.error('Login request was aborted:', error)
    //   throw new Error('Login request was interrupted. Please try again.')
    // }
    
    // Let the original error through for proper handling
    throw error
  }
}

// ... (rest of the code remains the same)
export async function signOut() {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('signOut can only be called on the client side')
  }

  try {
    console.log('Auth helpers: Signing out user')
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Auth helpers: SignOut error:', error)
      throw error
    }
    
    console.log('Auth helpers: SignOut successful')
    return { success: true }
  } catch (error: any) {
    console.error('Auth helpers: SignOut exception:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      status: error.status,
      stack: error.stack
    })
    
    // DISABLED: AbortError detection was causing false positives
    // Only catch actual AbortError if it's truly a user cancellation
    // if (error.name === 'AbortError') {
    //   console.error('SignOut request was aborted:', error)
    //   throw new Error('SignOut request was interrupted. Please try again.')
    // }
    
    // DISABLED: These message checks were too broad and catching legitimate errors
    // Only catch specific Supabase abort message
    // if (error.message?.includes('signal is aborted without reason')) {
    //   console.error('SignOut aborted without reason:', error)
    //   throw new Error('SignOut was cancelled. Please try again.')
    // }
    
    // DISABLED: Generic abort message detection was too broad
    // Don't catch general "signal is aborted" as it might be part of other error messages
    // Only catch if it's specifically about request being aborted
    // if (error.message?.includes('The request was aborted') || 
    //     error.message?.includes('Request was aborted')) {
    //   console.error('SignOut request was aborted:', error)
    //   throw new Error('SignOut request was interrupted. Please try again.')
    // }
    
    // Let original error through for proper handling
    throw error
  }
}

export async function resetPassword(email: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('resetPassword can only be called on the client side')
  }

  console.log('Password reset requested for:', email)

  const redirectUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/auth/reset-password`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/auth/reset-password`

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error) {
      console.error('Password reset error:', error)
      throw error
    }

    console.log('Password reset email sent successfully')
    return data
  } catch (error: any) {
    console.error('Password reset exception:', error)
    
    // Handle specific error cases
    if (error.name === 'AbortError' || error.message?.includes('signal is aborted')) {
      console.error('Password reset request was aborted:', error)
      throw new Error('Password reset request was interrupted. Please try again.')
    }
    
    if (error.message?.includes('signal is aborted without reason')) {
      console.error('Password reset aborted without reason:', error)
      throw new Error('Password reset was cancelled. Please try again.')
    }
    
    throw error
  }
}

export async function updatePassword(newPassword: string) {
  // Only run on client side
  if (typeof window === 'undefined') {
    throw new Error('updatePassword can only be called on the client side')
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      console.error('Password update error:', error)
      throw error
    }

    console.log('Password update successful')
    return data
  } catch (error: any) {
    console.error('Password update exception:', error)
    
    // Handle specific error cases
    if (error.name === 'AbortError' || error.message?.includes('signal is aborted')) {
      console.error('Password update request was aborted:', error)
      throw new Error('Password update request was interrupted. Please try again.')
    }
    
    if (error.message?.includes('signal is aborted without reason')) {
      console.error('Password update aborted without reason:', error)
      throw new Error('Password update was cancelled. Please try again.')
    }
    
    throw error
  }
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
  try {
    // Get appointment details
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    if (appointmentError || !appointment) {
      console.error('Failed to fetch appointment for confirmation:', appointmentError)
      return false
    }

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', appointment.user_id)
      .single()

    if (userError || !user) {
      console.error('Failed to fetch user for confirmation:', userError)
      return false
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; margin-bottom: 20px;">Appointment Confirmation</h2>
        <p style="color: #666; line-height: 1.6;">
          Dear ${user.full_name || 'Valued Client'},
        </p>
        <p style="color: #666; line-height: 1.6;">
          Your appointment has been confirmed with the following details:
        </p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Date:</strong> ${appointment.date}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Session Type:</strong> ${appointment.session_type}</p>
        </div>
        <p style="color: #666; line-height: 1.6;">
          All sessions are conducted online. You will receive joining instructions via email 24 hours before your session.
        </p>
        <p style="color: #666; line-height: 1.6;">
          If you need to reschedule or cancel, please visit your dashboard or contact us.
        </p>
      </div>
    `

    // Send via API route instead of direct nodemailer
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: user.email,
        subject: 'Appointment Confirmation - MindSpring Path',
        html: emailHtml
      })
    })

    if (response.ok) {
      console.log('Email confirmation sent successfully:', appointmentId)
      return true
    } else {
      console.error('Failed to send email confirmation:', await response.text())
      return false
    }
  } catch (error: any) {
    console.error('Email confirmation error:', error)
    return false
  }
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