// export const useGetSavings = () => {
//   // token state
//   // // const { setAccessToken, setRefreshToken, setUser } = useAuth()
//
//   const mutation = useMutation({
//     mutationFn: (formData: LoginFormSchemaType) => loginUser(formData),
//     onSuccess: (data) => {
//       const token = data.tokens.accessToken
//       const refreshToken = data.tokens.refreshToken
//       setAccessToken(token)
//       setRefreshToken(refreshToken)
//       setUser(data.user)
//     },
//   })
//
//   return {
//     mutate: mutation.mutate,
//     mutateAsync: mutation.mutateAsync,
//     isLoading: mutation.isPending,
//     isError: mutation.isError,
//     error: mutation.error,
//   }
// }
import { useQuery } from '@tanstack/react-query'
import { allServices } from '@/api/savings-api'

export const useGetSavings = () => {
  return useQuery({
    queryKey: ['allSavings'],
    queryFn: async () => {
      const response = await allServices()
      return response?.data
    },
  })
}
