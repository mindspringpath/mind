'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Target, Video, Phone, Mail, ChevronRight, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUserAppointments, getUserProgramEnrollments, cancelAppointment } from '@/lib/auth-helpers'
import { getCurrentUser } from '@/lib/auth-helpers'

interface Appointment {
  id: string
  date: string
  time: string
  session_type: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

interface ProgramEnrollment {
  id: string
  program_name: string
  start_date: string
  created_at: string
}

export default function ClientDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [enrollments, setEnrollments] = useState<ProgramEnrollment[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          window.location.href = '/auth/login'
          return
        }

        setUser(currentUser)

        // Fetch appointments and enrollments
        const [appointmentsData, enrollmentsData] = await Promise.all([
          getUserAppointments(currentUser.id),
          getUserProgramEnrollments(currentUser.id)
        ])

        setAppointments(appointmentsData)
        setEnrollments(enrollmentsData)
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId)
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, status: 'cancelled' as const }
            : apt
        )
      )
    } catch (err: any) {
      setError(err.message || 'Failed to cancel appointment')
    }
  }

  const upcomingAppointments = appointments
    .filter(apt => apt.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getSessionTypeDisplay = (type: string) => {
    switch (type) {
      case 'coaching-session':
        return 'Evidence-Based Coaching Session'
      case '12-week-program':
        return '12-Week Mindful Momentum Program'
      default:
        return type
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-softwhite bg-primary/15'
      case 'pending':
        return 'text-softwhite bg-primary/10'
      case 'cancelled':
        return 'text-softwhite bg-slate'
      default:
        return 'text-softwhite/70 bg-slate'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-softwhite mb-2 tracking-tight">
          Welcome back, {user?.user_metadata?.full_name || 'Client'}.
        </h1>
        <p className="text-softwhite/70">
          Manage your MindSpring Path appointments and track your progress.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-slate border border-graphite rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-softwhite/80 text-sm">{error}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-softwhite/70">
              Upcoming Sessions
            </CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-softwhite">
              {upcomingAppointments.length}
            </div>
            <p className="text-xs text-softwhite/60">
              Next session in {upcomingAppointments.length > 0 ? 'few days' : 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-softwhite/70">
              Active Programs
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-softwhite">
              {enrollments.length}
            </div>
            <p className="text-xs text-softwhite/60">
              {enrollments.length > 0 ? 'Currently enrolled' : 'No active programs'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-softwhite/70">
              Total Sessions
            </CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-softwhite">
              {appointments.length}
            </div>
            <p className="text-xs text-softwhite/60">
              All time sessions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Upcoming Sessions
            </div>
            <Link href="/booking">
              <Button variant="mindspring-secondary" size="sm">
                Book New Session
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>
            Your scheduled coaching sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-softwhite/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-softwhite mb-2">No upcoming sessions</h3>
              <p className="text-softwhite/70 mb-4">
                You don't have any scheduled appointments. Book a session to get started.
              </p>
              <Link href="/booking">
                <Button variant="mindspring-primary">
                  Book Your First Session
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-graphite rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-softwhite">
                          {getSessionTypeDisplay(appointment.session_type)}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-softwhite/70">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {appointment.status === 'confirmed' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Video className="w-4 h-4 mr-1" />
                            Join Session
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === 'pending' && (
                        <Button variant="ghost" size="sm">
                          Reschedule
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Program Enrollments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Your Programs
          </CardTitle>
          <CardDescription>
            Active program enrollments and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-softwhite/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-softwhite mb-2">No active programs</h3>
              <p className="text-softwhite/70 mb-4">
                Enroll in a program to start your structured coaching journey.
              </p>
              <Link href="/program">
                <Button variant="mindspring-primary">
                  View Programs
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div key={enrollment.id} className="border border-graphite rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-softwhite mb-2">
                        {enrollment.program_name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-softwhite/70">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Started: {new Date(enrollment.start_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Progress
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/booking">
              <Button variant="mindspring-primary" className="w-full">
                Book Session
              </Button>
            </Link>
            <Link href="/program">
              <Button variant="mindspring-secondary" className="w-full">
                View Programs
              </Button>
            </Link>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Contact Coach
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="w-4 h-4 mr-2" />
              Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
