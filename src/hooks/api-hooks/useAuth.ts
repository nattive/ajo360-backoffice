import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import {
  LoginFormSchemaType,
  RegisterFormSchemaType,
} from '@/schemas/authSchemas.ts'
import {
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from '@/api/auth'
import { useAuth } from '@/stores/authStore'

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (formData: RegisterFormSchemaType) => registerUser(formData),
  })

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

export const useLogin = () => {
  // token state
  const { setAccessToken, setRefreshToken, setUser } = useAuth()

  const mutation = useMutation({
    mutationFn: (formData: LoginFormSchemaType) => loginUser(formData),
    onSuccess: (data) => {
      const token = data.tokens.accessToken
      const refreshToken = data.tokens.refreshToken
      setAccessToken(token)
      setRefreshToken(refreshToken)
      setUser(data.user)
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

export const useLogout = () => {
  const { reset } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await logoutUser()
    },
    onSuccess: () => {
      reset()
      router.navigate({ to: '/sign-in' })
    },
  })
}

// ========================= USERS =======================

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const data = await getUsers()
      return data ?? []
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ['allUsers', 'users', id],
    queryFn: async ({ queryKey }) => {
      const [_group, _resource, userId] = queryKey
      if (!userId) return null
      const data = await getUserById(userId)
      return data
    },
    enabled: !!id,
  })
}
