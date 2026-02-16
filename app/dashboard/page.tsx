import DashboardLayout from '@/components/layout/DashboardLayout'
import ClientDashboard from '@/components/dashboard/ClientDashboard'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ClientDashboard />
    </DashboardLayout>
  )
}
