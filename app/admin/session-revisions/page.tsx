'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth-helpers'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Edit, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Clock,
  User,
  Mail,
  Search,
  Filter,
  ArrowUpDown
} from 'lucide-react'

export default function SessionRevisionsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [sessions, setSessions] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [editingSession, setEditingSession] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await getCurrentUser()
        const adminStatus = await isAdmin()
        
        if (!currentUser || !adminStatus) {
          router.replace('/admin/login')
          return
        }

        setUser(currentUser)
        // Load sessions data
        await loadSessions()
      } catch (error) {
        console.error('Session revisions: Error checking access:', error)
        router.replace('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  const loadSessions = async () => {
    try {
      // This would fetch from your database
      const mockSessions = [
        {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com',
          date: '2024-02-20',
          time: '10:00 AM',
          session_type: 'Initial Consultation',
          status: 'confirmed',
          notes: 'First time client',
          created_at: '2024-02-19T10:00:00Z'
        },
        {
          id: '2',
          full_name: 'Jane Smith',
          email: 'jane@example.com',
          date: '2024-02-20',
          time: '2:00 PM',
          session_type: 'Follow-up Session',
          status: 'pending',
          notes: 'Regular check-in',
          created_at: '2024-02-19T14:00:00Z'
        },
        {
          id: '3',
          full_name: 'Bob Johnson',
          email: 'bob@example.com',
          date: '2024-02-21',
          time: '11:00 AM',
          session_type: 'Initial Consultation',
          status: 'cancelled',
          notes: 'Client cancelled',
          created_at: '2024-02-18T16:00:00Z'
        }
      ]
      setSessions(mockSessions)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    }
  }

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.session_type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const handleDateChange = async (sessionId: string, newDate: string) => {
    try {
      setSaving(true)
      // This would update the database
      console.log('Updating session date:', sessionId, 'to', newDate)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update local state
      setSessions(prev => prev.map(session => 
        session.id === sessionId 
          ? { ...session, date: newDate }
          : session
      ))
      
      setEditingSession(null)
      console.log('Session date updated successfully')
    } catch (error) {
      console.error('Failed to update session date:', error)
    } finally {
      setSaving(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400'
      case 'pending':
        return 'text-amber-400'
      case 'cancelled':
        return 'text-red-400'
      default:
        return 'text-softwhite/60'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'cancelled':
        return <X className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading session revisions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      {/* Header */}
      <div className="border-b border-graphite bg-charcoal/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-softwhite">Session Date Revisions</h1>
              <p className="text-softwhite/60 text-sm mt-1">
                Modify and manage appointment dates
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/admin')}
            >
              ← Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-softwhite/40" />
                <input
                  type="text"
                  placeholder="Search by name, email, or session type..."
                  className="w-full pl-10 pr-4 py-2 bg-slate/20 border border-graphite rounded-lg text-softwhite placeholder-softwhite/40 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                size="sm"
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('confirmed')}
                size="sm"
              >
                Confirmed
              </Button>
              <Button
                variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('cancelled')}
                size="sm"
              >
                Cancelled
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate/20 border border-graphite rounded-xl p-4">
            <p className="text-softwhite/60 text-sm">Total Sessions</p>
            <p className="text-2xl font-bold text-softwhite">{sessions.length}</p>
          </div>
          <div className="bg-slate/20 border border-graphite rounded-xl p-4">
            <p className="text-softwhite/60 text-sm">Confirmed</p>
            <p className="text-2xl font-bold text-green-400">
              {sessions.filter(s => s.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-slate/20 border border-graphite rounded-xl p-4">
            <p className="text-softwhite/60 text-sm">Pending</p>
            <p className="text-2xl font-bold text-amber-400">
              {sessions.filter(s => s.status === 'pending').length}
            </p>
          </div>
          <div className="bg-slate/20 border border-graphite rounded-xl p-4">
            <p className="text-softwhite/60 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-red-400">
              {sessions.filter(s => s.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-slate/20 border border-graphite rounded-xl">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-softwhite mb-4">Sessions</h2>
            
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-softwhite/40 mx-auto mb-4" />
                <p className="text-softwhite/60">No sessions found</p>
                <p className="text-softwhite/40 text-sm mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSessions.map((session) => (
                  <div key={session.id} className="border border-graphite rounded-lg p-4">
                    {editingSession?.id === session.id ? (
                      /* Edit Mode */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-softwhite">Edit Session</h3>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingSession(null)}
                              disabled={saving}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleDateChange(session.id, session.date)}
                              disabled={saving}
                            >
                              {saving ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-softwhite" />
                              ) : (
                                <Save className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-softwhite/80 text-sm mb-2">Client Name</label>
                            <input
                              type="text"
                              value={session.full_name}
                              disabled
                              className="w-full px-3 py-2 bg-slate/10 border border-graphite rounded text-softwhite"
                            />
                          </div>
                          <div>
                            <label className="block text-softwhite/80 text-sm mb-2">Email</label>
                            <input
                              type="email"
                              value={session.email}
                              disabled
                              className="w-full px-3 py-2 bg-slate/10 border border-graphite rounded text-softwhite"
                            />
                          </div>
                          <div>
                            <label className="block text-softwhite/80 text-sm mb-2">Session Date</label>
                            <input
                              type="date"
                              value={session.date}
                              onChange={(e) => {
                                setEditingSession({
                                  ...session,
                                  date: e.target.value
                                })
                              }}
                              className="w-full px-3 py-2 bg-slate/10 border border-graphite rounded text-softwhite focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-softwhite/80 text-sm mb-2">Session Time</label>
                            <input
                              type="time"
                              value={session.time}
                              disabled
                              className="w-full px-3 py-2 bg-slate/10 border border-graphite rounded text-softwhite"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <User className="w-5 h-5 text-softwhite/60" />
                            <div>
                              <p className="font-medium text-softwhite">{session.full_name}</p>
                              <p className="text-sm text-softwhite/60">{session.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-softwhite/60" />
                            <div>
                              <p className="font-medium text-softwhite">{session.date}</p>
                              <p className="text-sm text-softwhite/60">{session.time}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className={`flex items-center gap-1 ${getStatusColor(session.status)}`}>
                              {getStatusIcon(session.status)}
                              <span className="font-medium">{session.status}</span>
                            </div>
                            <p className="text-sm text-softwhite/60">{session.session_type}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingSession(session)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
