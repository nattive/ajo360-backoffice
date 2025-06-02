import { useMutation, useQuery } from '@tanstack/react-query'
import { createWallet, getAllWallets } from '@/api/wallet-api'

export const useGetUserWallet = () => {
  return useQuery({
    queryKey: ['allWallet', 'users', 'wallete'],
    queryFn: async () => {
      const data = await getAllWallets()

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

export const useCreateWallet = () => {
  return useMutation({
    mutationFn: async () => {
      const data = await createWallet()
      return data
    },
    onSuccess: () => {
      // console.log('Wallet created successfully')
    },
  })
}
