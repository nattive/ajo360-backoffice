import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { 
  getAllSavings, 
  getSavingById, 
  createSaving, 
  updateSaving, 
  deleteSaving,
  GetSavingsParams,
  CreateSavingData,
  // Comprehensive savings endpoints
  getBusinessLocks,
  getBusinessTargets,
  getGroupSavings,
  getLockedSavings,
  getTargetSavings,
  SavingsQueryParams
} from '@/api/admin-api'

export const useGetSavings = (params: GetSavingsParams = {}) => {
  return useQuery({
    queryKey: ['savings', params],
    queryFn: () => getAllSavings(params),
  })
}

export const useGetSavingById = (savingId: string) => {
  return useQuery({
    queryKey: ['savings', savingId],
    queryFn: () => getSavingById(savingId),
    enabled: !!savingId,
  })
}

export const useCreateSaving = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (savingData: CreateSavingData) => createSaving(savingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings'] })
    },
  })
}

export const useUpdateSaving = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ savingId, savingData }: { savingId: string; savingData: Partial<CreateSavingData> }) => 
      updateSaving(savingId, savingData),
    onSuccess: (_, { savingId }) => {
      queryClient.invalidateQueries({ queryKey: ['savings'] })
      queryClient.invalidateQueries({ queryKey: ['savings', savingId] })
    },
  })
}

export const useDeleteSaving = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (savingId: string) => deleteSaving(savingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savings'] })
    },
  })
}

// ======================= COMPREHENSIVE SAVINGS HOOKS ===============================

export const useGetBusinessLocks = (params: SavingsQueryParams = {}) => {
  return useQuery({
    queryKey: ['business-locks', params],
    queryFn: () => getBusinessLocks(params),
  })
}

export const useGetBusinessTargets = (params: SavingsQueryParams = {}) => {
  return useQuery({
    queryKey: ['business-targets', params],
    queryFn: () => getBusinessTargets(params),
  })
}

export const useGetGroupSavings = (params: SavingsQueryParams = {}) => {
  return useQuery({
    queryKey: ['group-savings', params],
    queryFn: () => getGroupSavings(params),
  })
}

export const useGetLockedSavings = (params: SavingsQueryParams = {}) => {
  return useQuery({
    queryKey: ['locked-savings', params],
    queryFn: () => getLockedSavings(params),
  })
}

export const useGetTargetSavings = (params: SavingsQueryParams = {}) => {
  return useQuery({
    queryKey: ['target-savings', params],
    queryFn: () => getTargetSavings(params),
  })
}