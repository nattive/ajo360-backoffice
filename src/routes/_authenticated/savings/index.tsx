import { createFileRoute } from '@tanstack/react-router'
import AdminSavingsDashboard from '@/features/admin-savings'

export const Route = createFileRoute('/_authenticated/savings/')({  
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminSavingsDashboard />
}