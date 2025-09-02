import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { AdminLoginType, DashboardDataType } from '@/schemas/adminSchemas'
import { toast } from 'sonner'
import {
  adminLogin,
  getAdminDashboard,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  retriggerWalletCreation,
  getAllTransactions,
  getTransactionById,
  getAllWithdrawals,
  updateWithdrawalStatus,
  bulkWithdrawalAction,
  UpdateUserData,
  UpdateUserStatusData,
  GetTransactionsParams,
  UpdateWithdrawalStatusData,
  BulkWithdrawalActionData,
} from '@/api/admin-api'
import { useAuth } from '@/stores/authStore'

// ======================= ADMIN AUTHENTICATION HOOKS ===============================

export const useCurrentAdmin = () => {
  const { admin } = useAuth()
  return admin
}

export const useAdminLogin = () => {
  const { setAccessToken, setRefreshToken, setAdmin } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: AdminLoginType) =>
      adminLogin(credentials.email, credentials.password),
    onSuccess: (response) => {
      const { accessToken, refreshToken, admin } = response
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setAdmin(admin)
      toast.success('Admin login successful')
      router.navigate({ to: '/' })
    },
    onError: () => {
      // Handle login error without causing page refresh
      toast.error('Login failed. Please check your credentials.')
    },
  })
}

export const useAdminLogout = () => {
  const { reset } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      // Perform any logout API call if needed
      return Promise.resolve()
    },
    onSuccess: () => {
      reset()
      toast.success('Logged out successfully')
      router.navigate({ to: '/sign-in' })
    },
    onError: () => {
      toast.error('Logout failed')
    },
  })
}

// ======================= ADMIN DASHBOARD HOOKS ===============================

export const useGetAdminDashboard = () => {
  return useQuery<DashboardDataType>({
    queryKey: ['adminDashboard'],
    queryFn: () => getAdminDashboard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ======================= USER MANAGEMENT HOOKS ===============================

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserData }) =>
      updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('User updated successfully')
    },
    // Error handling is now done by axios interceptor
  })
}

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      statusData,
    }: {
      userId: string
      statusData: UpdateUserStatusData
    }) => updateUserStatus(userId, statusData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('User status updated successfully')
    },
    // Error handling is now done by axios interceptor
  })
}

export const useRetriggerWalletCreation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => retriggerWalletCreation(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User wallet retriggered successfully')
    },
  })
}

// ======================= TRANSACTION MANAGEMENT HOOKS ===============================

export const useGetAllTransactions = (params?: GetTransactionsParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => getAllTransactions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetTransactionById = (transactionId: string) => {
  return useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ======================= WITHDRAWAL MANAGEMENT HOOKS ===============================

export const useGetAllWithdrawals = (status?: string) => {
  return useQuery({
    queryKey: ['withdrawals', status],
    queryFn: () => getAllWithdrawals(status),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useUpdateWithdrawalStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ withdrawalId, ...statusData }: { withdrawalId: string } & UpdateWithdrawalStatusData) => 
      updateWithdrawalStatus(withdrawalId, statusData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
      toast.success('Withdrawal status updated successfully')
    },
    // Error handling is now done by axios interceptor
  })
}

export const useBulkWithdrawalAction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (actionData: BulkWithdrawalActionData) => bulkWithdrawalAction(actionData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] })
      toast.success(`Successfully ${variables.action}ed ${variables.withdrawalIds.length} withdrawal(s)`)
    },
    // Error handling is now done by axios interceptor
  })
}
