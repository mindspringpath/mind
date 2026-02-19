'use client'

import { useState, useEffect } from 'react'
import { getCurrentUser, isAdmin, getContactMessages, updateContactMessage } from '@/lib/auth-helpers'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all')
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          setAccessDenied(true)
          setLoading(false)
          return false
        }

        const adminCheck = await isAdmin()
        if (!adminCheck) {
          setAccessDenied(true)
          setLoading(false)
          return false
        }

        setAccessDenied(false)
        return true
      } catch (error) {
        console.error('Admin access check error:', error)
        setAccessDenied(true)
        setLoading(false)
        return false
      }
    }

    checkAdminAccess().then(isAdmin => {
      if (isAdmin) {
        loadMessages()
      }
    })
  }, [])

  const loadMessages = async () => {
    try {
      const data = await getContactMessages()
      setMessages(data)
      setLoading(false)
    } catch (err: any) {
      setError(err?.message || 'Failed to load contact messages')
      setLoading(false)
    }
  }

  const filteredMessages = messages.filter(msg => {
    if (filter === 'all') return true
    return msg.status === filter
  })

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateContactMessage(id, { status: 'read' })
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, status: 'read' } : msg
        )
      )
    } catch (err: any) {
      setError(err?.message || 'Failed to update message status')
    }
  }

  const handleArchive = async (id: string) => {
    try {
      await updateContactMessage(id, { status: 'archived' })
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, status: 'archived' } : msg
        )
      )
    } catch (err: any) {
      setError(err?.message || 'Failed to archive message')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-softwhite/70">{error}</p>
          <button
            onClick={() => setError('')}
            className="mt-4 bg-slate text-softwhite px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Admin Access Required</h1>
          <p className="text-softwhite/70 mb-6">
            You need administrator privileges to access this page.
          </p>
          <a
            href="/admin/login"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90"
          >
            Admin Login
          </a>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-charcoal text-softwhite flex items-center justify-center">
        <div className="text-center p-8">
          <div className="h-8 w-8 bg-softwhite rounded-full animate-pulse"></div>
          <span className="text-softwhite text-sm">Loading contact messages...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal text-softwhite">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-softwhite mb-2">Contact Messages</h1>
          <p className="text-softwhite/70">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex space-x-4">
          {['all', 'new', 'read', 'archived'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-slate text-softwhite hover:bg-slate/80'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2">
                {status === 'all' && messages.length}
                {status === 'new' && messages.filter(m => m.status === 'new').length}
                {status === 'read' && messages.filter(m => m.status === 'read').length}
                {status === 'archived' && messages.filter(m => m.status === 'archived').length}
              </span>
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-softwhite/70">No {filter} messages found.</p>
            </div>
          ) : (
            filteredMessages.map(message => (
              <div key={message.id} className="bg-charcoal border border-graphite rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        message.status === 'new' ? 'bg-blue-500 text-white' :
                        message.status === 'read' ? 'bg-green-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {message.status}
                      </span>
                      <span className="text-softwhite font-medium">{message.full_name}</span>
                      <span className="text-softwhite/70 text-sm">{message.email}</span>
                      {message.phone && (
                        <span className="text-softwhite/70 text-sm">{message.phone}</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {message.status === 'new' && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Mark as Read
                        </button>
                      )}
                      {message.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(message.id)}
                          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate rounded-lg">
                  <p className="text-softwhite whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
