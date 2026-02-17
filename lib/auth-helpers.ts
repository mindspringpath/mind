// -----------------------------
// APPOINTMENT HELPERS
// -----------------------------
export async function createAppointment(appointment) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserAppointments(userId) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) throw error
  return data || []
}

export async function updateAppointment(id, updates) {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function cancelAppointment(id) {
  return updateAppointment(id, { status: 'cancelled' })
}

// -----------------------------
// PROGRAM ENROLLMENT HELPERS
// -----------------------------
export async function createProgramEnrollment(enrollment) {
  const { data, error } = await supabase
    .from('program_enrolments')
    .insert(enrollment)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserProgramEnrollments(userId) {
  const { data, error } = await supabase
    .from('program_enrolments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// -----------------------------
// EMAIL & SMS PLACEHOLDERS
// -----------------------------
export async function sendEmailConfirmation(appointmentId) {
  console.log('Email confirmation sent for appointment:', appointmentId)
}

export async function sendEmailReminder(appointmentId) {
  console.log('Email reminder sent for appointment:', appointmentId)
}

export async function sendSMSReminder(appointmentId, phoneNumber) {
  console.log('SMS reminder sent to:', phoneNumber, 'for appointment:', appointmentId)
}