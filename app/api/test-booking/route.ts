import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test database connection
    const { data: testSlots, error: slotsError } = await supabase
      .from('availability_slots')
      .select('*')
      .limit(1)

    if (slotsError) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Database connection failed',
        details: slotsError.message 
      }, { status: 500 })
    }

    // Test appointments table
    const { data: testAppointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .limit(1)

    if (appointmentsError) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Appointments table error',
        details: appointmentsError.message 
      }, { status: 500 })
    }

    // Get counts
    const { count: slotsCount } = await supabase
      .from('availability_slots')
      .select('*', { count: 'exact', head: true })

    const { count: appointmentsCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ 
      ok: true, 
      message: 'Booking system is working',
      stats: {
        availabilitySlots: slotsCount || 0,
        appointments: appointmentsCount || 0
      }
    })

  } catch (error: any) {
    console.error('Booking test error:', error)
    return NextResponse.json({ 
      ok: false, 
      error: 'System error',
      details: error?.message || 'Unknown error'
    }, { status: 500 })
  }
}
