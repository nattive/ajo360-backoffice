import { useMutation, useQuery } from '@tanstack/react-query'
import { createWallet, getWallets } from '@/api/wallet-api'

export const useGetUserWallet = () => {
  return useQuery({
    queryKey: ['allWallet', 'users', 'wallete'],
    queryFn: async () => {
      // const [_group, _resource, userId] = queryKey
      // if (!userId) return null
      const data = await getWallets()
      return data
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
