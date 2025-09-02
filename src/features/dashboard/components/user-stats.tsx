import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, UserCheck, UserPlus } from 'lucide-react'

interface UserStatsProps {
  userStats: {
    totalCount: number
    verifiedCount: number
    unverifiedCount: number
    activeCount: number
    suspendedCount: number
  }
}

export function UserStats({ userStats }: UserStatsProps) {
  const {
    totalCount,
    verifiedCount,
    unverifiedCount,
    activeCount,
    suspendedCount
  } = userStats

  const verificationRate = totalCount > 0 ? (verifiedCount / totalCount * 100) : 0
  const activeRate = totalCount > 0 ? (activeCount / totalCount * 100) : 0
  const suspendedRate = totalCount > 0 ? (suspendedCount / totalCount * 100) : 0

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {/* Total Users */}
      <Card className="bg-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-900">
            Total Users
          </CardTitle>
          <Users className="h-4 w-4 text-indigo-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-indigo-900">
            {totalCount.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Verified Users */}
      <Card className="bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-900">
            Verified Users
          </CardTitle>
          <UserCheck className="h-4 w-4 text-green-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {verifiedCount.toLocaleString()}
          </div>
          <p className="text-xs text-green-600">
            {verificationRate.toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-900">
            Active Users
          </CardTitle>
          <Users className="h-4 w-4 text-blue-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">
            {activeCount.toLocaleString()}
          </div>
          <p className="text-xs text-blue-600">
            {activeRate.toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      {/* Suspended Users */}
      <Card className="bg-red-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-900">
            Suspended Users
          </CardTitle>
          <UserCheck className="h-4 w-4 text-red-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">
            {suspendedCount.toLocaleString()}
          </div>
          <p className="text-xs text-red-600">
            {suspendedRate.toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      {/* Unverified Users */}
      <Card className="bg-yellow-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-yellow-900">
            Unverified Users
          </CardTitle>
          <UserPlus className="h-4 w-4 text-yellow-700" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-900">
            {unverifiedCount.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}