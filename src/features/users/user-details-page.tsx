// src/features/users/pages/user-detail-page.tsx
import { Route } from '@/routes/_authenticated/users/$userId'
import { Loader2 } from 'lucide-react'
import { useGetUserById } from '@/hooks/api-hooks/useAuth'

// Import the route if needed
// or useRouteContext if you define your route contextually

export function UserDetailPage() {
  const { userId } = Route.useParams()
  const { data: userDetails, isLoading } = useGetUserById(userId)

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <h1>{userDetails?.firstName}</h1>
    </div>
  )
}
