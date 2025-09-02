import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { 
  getAllWallets, 
  getWalletById, 
  createWallet, 
  updateWallet, 
  deleteWallet,
  lockWallet,
  unlockWallet,
  getWalletTransactions,
  GetWalletsParams,
  CreateWalletData,
  UpdateWalletData
} from '@/api/wallet-api'

export const useGetWallets = (params: GetWalletsParams = {}) => {
  return useQuery({
    queryKey: ['wallets', params],
    queryFn: () => getAllWallets(params),
  })
}

export const useGetUserWallet = (params: GetWalletsParams = {}) => {
  return useQuery({
    queryKey: ['allWallet', 'users', 'wallete', params],
    queryFn: async () => {
      const data = await getAllWallets(params)

      // Filter invalid/incomplete wallets
      const filtered = data?.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (wallet: any) =>
          wallet.accountNumber &&
          wallet.availableBalance &&
          wallet.accountName
      )

      return filtered
    },
  })
}

export const useGetWalletById = (walletId: string) => {
  return useQuery({
    queryKey: ['wallets', walletId],
    queryFn: () => getWalletById(walletId),
    enabled: !!walletId,
  })
}

export const useCreateWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (walletData: CreateWalletData) => createWallet(walletData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
    },
  })
}

export const useUpdateWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ walletId, walletData }: { walletId: string; walletData: UpdateWalletData }) => 
      updateWallet(walletId, walletData),
    onSuccess: (_, { walletId }) => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallets', walletId] })
    },
  })
}

export const useDeleteWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (walletId: string) => deleteWallet(walletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
    },
  })
}

export const useLockWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (walletId: string) => lockWallet(walletId),
    onSuccess: (_, walletId) => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallets', walletId] })
    },
  })
}

export const useUnlockWallet = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (walletId: string) => unlockWallet(walletId),
    onSuccess: (_, walletId) => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallets', walletId] })
    },
  })
}

export const useGetWalletTransactions = (walletId: string, params: { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: ['wallets', walletId, 'transactions', params],
    queryFn: () => getWalletTransactions(walletId, params),
    enabled: !!walletId,
  })
}
