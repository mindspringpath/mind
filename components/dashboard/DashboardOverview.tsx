import Link from 'next/link'
import { Calendar, Target, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardOverview() {
  const stats = [
    {
      title: "Focus Score",
      value: "87%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Target,
      description: "Your current focus performance"
    },
    {
      title: "Sessions Completed",
      value: "12",
      change: "+3",
      changeType: "positive" as const,
      icon: Calendar,
      description: "Coaching sessions this month"
    },
    {
      title: "Productivity Gain",
      value: "34%",
      change: "+8%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Improvement since starting"
    },
    {
      title: "Program Progress",
      value: "65%",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "12-week program completion"
    }
  ]

  const upcomingSessions = [
    {
      date: "Tomorrow, 2:00 PM",
      type: "Focus Training",
      coach: "Dr. Sarah Mitchell"
    },
    {
      date: "Friday, 10:00 AM",
      type: "Productivity Review",
      coach: "Dr. James Chen"
    },
    {
      date: "Monday, 3:00 PM",
      type: "Goal Setting Session",
      coach: "Dr. Emma Thompson"
    }
  ]

  const recentAchievements = [
    "Completed 7-day focus streak",
    "Achieved weekly productivity target",
    "Mastered time blocking technique",
    "Improved sleep quality by 25%"
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-softwhite mb-2 tracking-tight">
          Welcome back, John.
        </h1>
        <p className="text-softwhite/70">
          Here's your progress overview and upcoming activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="mindspring-card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-softwhite/70">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-softwhite">{stat.value}</div>
              <p className="text-xs text-softwhite/60 mt-1">
                <span className={`inline-flex items-center ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change}
                </span>
                {' '}from last month
              </p>
              <p className="text-xs text-softwhite/60 mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>
              Your next coaching appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-charcoal border border-graphite rounded-xl">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="font-medium text-softwhite">{session.type}</div>
                    <div className="text-sm text-softwhite/70">{session.date}</div>
                    <div className="text-sm text-primary">{session.coach}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/appointments">
                <Button variant="mindspring-secondary" size="sm" className="w-full">
                  View All Sessions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Your latest milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-softwhite/80">{achievement}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dashboard/progress">
                <Button variant="mindspring-secondary" size="sm" className="w-full">
                  View Progress Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/booking">
              <Button variant="mindspring-primary" className="w-full">
                Book New Session
              </Button>
            </Link>
            <Link href="/dashboard/programs">
              <Button variant="mindspring-secondary" className="w-full">
                View Program Materials
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full">
                Update Goals
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
