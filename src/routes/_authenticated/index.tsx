import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,

  beforeLoad: async () => {
    const token = useAuthStore.getState().auth.accessToken

    if (!token) {
      throw redirect({
        to: '/sign-in',
      })
    }
  },
})
