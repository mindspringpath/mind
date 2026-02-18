'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react'

interface TimeSlot {
  id: string
  date: string
  time: string
  is_available: boolean
}

export default function AvailabilityManager() {
  const [loading, setLoading] = useState(false)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    is_available: true
  })

  // Fetch existing time slots
  const fetchTimeSlots = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('availability_slots')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: true })

      if (error) throw error
      setTimeSlots(data || [])
    } catch (error: any) {
      console.error('Error fetching time slots:', error)
      setTimeSlots([])
    } finally {
      setLoading(false)
    }
  }

  // Add new time slot
  const addTimeSlot = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newSlot.date || !newSlot.time) {
      alert('Please fill in both date and time')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('availability_slots')
        .insert({
          coach_id: '00000000-0000-0000-0000-0000-0000-0001',
          date: newSlot.date,
          time: newSlot.time,
          is_available: newSlot.is_available
        })
        .select()
        .single()

      if (error) throw error

      console.log('Time slot added successfully')
      setNewSlot({ date: '', time: '', is_available: true })
      await fetchTimeSlots() // Refresh the list
    } catch (error: any) {
      console.error('Error adding time slot:', error)
      alert('Failed to add time slot')
    } finally {
      setLoading(false)
    }
  }

  // Delete time slot
  const deleteTimeSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this time slot?')) {
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('availability_slots')
        .delete()
        .eq('id', slotId)

      if (error) throw error

      console.log('Time slot deleted successfully')
      await fetchTimeSlots() // Refresh the list
    } catch (error: any) {
      console.error('Error deleting time slot:', error)
      alert('Failed to delete time slot')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTimeSlots()
  }, [])

  // Group time slots by date
  const groupedSlots = timeSlots.reduce((acc, slot) => {
    const date = slot.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(slot)
    return acc
  }, {} as Record<string, TimeSlot[]>)

  return (
    <div className="bg-charcoal p-6 rounded-xl border border-graphite">
      <h2 className="text-2xl font-bold text-softwhite mb-6 flex items-center">
        <Calendar className="w-6 h-6 mr-2" />
        Manage Time Slots
      </h2>

      {/* Add New Time Slot Form */}
      <div className="mb-8 p-4 bg-slate/20 rounded-lg border border-graphite">
        <h3 className="text-lg font-semibold text-softwhite mb-4">Add New Time Slot</h3>
        <form onSubmit={addTimeSlot} className="space-y-4">
          <div>
            <label className="block text-softwhite/80 mb-2">Date</label>
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot(prev => ({ ...prev, date: e.target.value }))}
              className="mindspring-input w-full"
              required
            />
          </div>
          <div>
            <label className="block text-softwhite/80 mb-2">Time</label>
            <input
              type="time"
              value={newSlot.time}
              onChange={(e) => setNewSlot(prev => ({ ...prev, time: e.target.value }))}
              className="mindspring-input w-full"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-softwhite/80 mb-2">
              <input
                type="checkbox"
                checked={newSlot.is_available}
                onChange={(e) => setNewSlot(prev => ({ ...prev, is_available: e.target.checked }))}
                className="mr-2"
              />
              Available
            </label>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Adding...' : 'Add Time Slot'}
          </Button>
        </form>
      </div>

      {/* Existing Time Slots */}
      <div>
        <h3 className="text-lg font-semibold text-softwhite mb-4">Existing Time Slots</h3>
        {loading ? (
          <div className="text-softwhite/60 text-center py-8">
            Loading time slots...
          </div>
        ) : Object.keys(groupedSlots).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date} className="bg-slate/20 rounded-lg p-4">
                <h4 className="font-semibold text-softwhite mb-3">{date}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded border text-center ${
                        slot.is_available
                          ? 'bg-green-500/20 border-green-500/40 text-green-300'
                          : 'bg-red-500/20 border-red-500/40 text-red-300'
                      }`}
                    >
                      <div className="font-medium">{slot.time}</div>
                      <div className="text-xs mt-1">
                        {slot.is_available ? 'Available' : 'Booked'}
                      </div>
                      <Button
                        onClick={() => deleteTimeSlot(slot.id)}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-softwhite/60 text-center py-8">
            No time slots found. Add your first time slot above.
          </div>
        )}
      </div>

      <div className="mt-6 text-xs text-softwhite/50">
        <p>• Time slots created here will be available for booking on the main booking page</p>
        <p>• Booked slots are automatically marked as unavailable</p>
      </div>
    </div>
  )
}
