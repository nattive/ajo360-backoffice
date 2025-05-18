import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  allSavings,
  createSavings,
  deleteSavings,
  updateSavings,
} from '@/api/savings-api'

export const useGetSavings = () => {
  return useQuery({
    queryKey: ['allSavings'],
    queryFn: async () => {
      const data = await allSavings()
      return data
    },
  })
}

export const useCreateSavings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createSavings,
    onSuccess: () => {
      // Refresh allSavings list after creating
      toast.success('Savings created successfully')
      queryClient.invalidateQueries({ queryKey: ['allSavings'] })
    },
  })
}

export const useUpdateSavings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSavings,
    onSuccess: () => {
      toast.success('Savings updated successfully')
      queryClient.invalidateQueries({ queryKey: ['allSavings'] })
    },
  })
}

export const useDeleteSavings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteSavings,
    onSuccess: () => {
      toast.success('Savings deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['allSavings'] })
    },
  })
}
