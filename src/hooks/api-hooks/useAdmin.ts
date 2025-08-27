import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import {
  AdminDashboardParamsType,
  WithdrawalStatusType,
  InterestCalculationTriggerType,
  InterestPayoutTriggerType,
  SavingsPlanCreateType,
  SavingsPlanUpdateType,
  FormFieldCreateType,
  FormFieldUpdateType,
  FormOptionCreateType,
  FormOptionUpdateType,
  FormOptionsBatchCreateType,
  ConfigurationCreateType,
  ConfigurationUpdateType,
  AttributeCreateType,
  AttributeUpdateType,
  UserFormResponseCreateType,
  UserFormResponseUpdateType,
} from '@/schemas/adminSchemas'
import { toast } from 'sonner'
import {
  initiateAdminLogin,
  verifyAdminLogin,
  getAdminDashboard,
  getAllWithdrawals,
  getWithdrawalById,
  updateWithdrawalStatus,
  triggerInterestCalculation,
  triggerInterestPayout,
  getAllSavingsPlans,
  getActiveSavingsPlans,
  getSavingsPlanById,
  createSavingsPlan,
  updateSavingsPlan,
  deleteSavingsPlan,
  getPlanForms,
  getFormFieldById,
  createFormField,
  updateFormField,
  deleteFormField,
  getFormOptions,
  getFormOptionById,
  createFormOption,
  createMultipleFormOptions,
  updateFormOption,
  deleteFormOption,
  getAllConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
  getAllAttributes,
  getAttributeById,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAllUserFormResponses,
  getUserFormResponseById,
  createUserFormResponse,
  updateUserFormResponse,
  deleteUserFormResponse,
} from '@/api/admin-api'
import { useAuth } from '@/stores/authStore'

// ======================= ADMIN AUTHENTICATION HOOKS ===============================

export const useInitiateAdminLogin = () => {
  return useMutation({
    mutationFn: (email: string) => initiateAdminLogin(email),
    onSuccess: () => {
      toast.success('OTP sent to your email')
    },
    onError: () => {
      toast.error('Failed to send OTP')
    },
  })
}

export const useVerifyAdminLogin = () => {
  const { setAccessToken, setRefreshToken, setUser } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyAdminLogin(email, otp),
    onSuccess: (data) => {
      const token = data.accessToken
      const refreshToken = data.refreshToken
      setAccessToken(token)
      setRefreshToken(refreshToken)
      setUser(data.admin)
      toast.success('Admin login successful')
      router.navigate({ to: '/' })
    },
    onError: (_error) => {
      toast.error('Invalid OTP')
    },
  })
}

// ======================= ADMIN DASHBOARD HOOKS ===============================

export const useGetAdminDashboard = (dateRange?: AdminDashboardParamsType) => {
  return useQuery({
    queryKey: ['adminDashboard', dateRange],
    queryFn: () => getAdminDashboard(dateRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ======================= ADMIN WITHDRAWAL HOOKS ===============================

export const useGetAllWithdrawals = (status?: WithdrawalStatusType) => {
  return useQuery({
    queryKey: ['adminWithdrawals', status],
    queryFn: () => getAllWithdrawals(status),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useGetWithdrawalById = (withdrawalId: string) => {
  return useQuery({
    queryKey: ['adminWithdrawal', withdrawalId],
    queryFn: () => getWithdrawalById(withdrawalId),
    enabled: !!withdrawalId,
  })
}

export const useUpdateWithdrawalStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      withdrawalId,
      status,
      reason,
      adminNotes,
    }: {
      withdrawalId: string
      status: 'approved' | 'rejected'
      reason?: string
      adminNotes?: string
    }) => updateWithdrawalStatus(withdrawalId, status, reason, adminNotes),
    onSuccess: () => {
      toast.success('Withdrawal status updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminWithdrawals'] })
    },
    onError: (_error) => {
      toast.error('Failed to update withdrawal status')
    },
  })
}

// ======================= ADMIN SAVINGS MANAGEMENT HOOKS ===============================

export const useTriggerInterestCalculation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload?: InterestCalculationTriggerType) =>
      triggerInterestCalculation(payload),
    onSuccess: () => {
      toast.success('Interest calculation triggered successfully')
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] })
    },
    onError: (_error) => {
      toast.error('Failed to trigger interest calculation')
    },
  })
}

export const useTriggerInterestPayout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload?: InterestPayoutTriggerType) =>
      triggerInterestPayout(payload),
    onSuccess: () => {
      toast.success('Interest payout triggered successfully')
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] })
    },
    onError: (_error) => {
      toast.error('Failed to trigger interest payout')
    },
  })
}

// ======================= ADMIN SAVINGS PLAN HOOKS ===============================

export const useGetAllSavingsPlans = () => {
  return useQuery({
    queryKey: ['adminSavingsPlans'],
    queryFn: getAllSavingsPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetActiveSavingsPlans = () => {
  return useQuery({
    queryKey: ['adminActiveSavingsPlans'],
    queryFn: getActiveSavingsPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetSavingsPlanById = (planId: string) => {
  return useQuery({
    queryKey: ['adminSavingsPlan', planId],
    queryFn: () => getSavingsPlanById(planId),
    enabled: !!planId,
  })
}

export const useCreateSavingsPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (planData: SavingsPlanCreateType) =>
      createSavingsPlan(planData),
    onSuccess: () => {
      toast.success('Savings plan created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminSavingsPlans'] })
    },
    onError: (_error) => {
      toast.error('Failed to create savings plan')
    },
  })
}

export const useUpdateSavingsPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      planId,
      planData,
    }: {
      planId: string
      planData: SavingsPlanUpdateType
    }) => updateSavingsPlan(planId, planData),
    onSuccess: () => {
      toast.success('Savings plan updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminSavingsPlans'] })
    },
    onError: (_error) => {
      toast.error('Failed to update savings plan')
    },
  })
}

export const useDeleteSavingsPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (planId: string) => deleteSavingsPlan(planId),
    onSuccess: () => {
      toast.success('Savings plan deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminSavingsPlans'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete savings plan')
    },
  })
}

// ======================= ADMIN FORM MANAGEMENT HOOKS ===============================

export const useGetPlanForms = (planId: string) => {
  return useQuery({
    queryKey: ['adminPlanForms', planId],
    queryFn: () => getPlanForms(planId),
    enabled: !!planId,
  })
}

export const useGetFormFieldById = (fieldId: string) => {
  return useQuery({
    queryKey: ['adminFormField', fieldId],
    queryFn: () => getFormFieldById(fieldId),
    enabled: !!fieldId,
  })
}

export const useCreateFormField = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fieldData: FormFieldCreateType) => createFormField(fieldData),
    onSuccess: () => {
      toast.success('Form field created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminPlanForms'] })
    },
    onError: (_error) => {
      toast.error('Failed to create form field')
    },
  })
}

export const useUpdateFormField = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      fieldId,
      fieldData,
    }: {
      fieldId: string
      fieldData: FormFieldUpdateType
    }) => updateFormField(fieldId, fieldData),
    onSuccess: () => {
      toast.success('Form field updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminPlanForms'] })
    },
    onError: (_error) => {
      toast.error('Failed to update form field')
    },
  })
}

export const useDeleteFormField = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fieldId: string) => deleteFormField(fieldId),
    onSuccess: () => {
      toast.success('Form field deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminPlanForms'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete form field')
    },
  })
}

// ======================= ADMIN FORM SELECT OPTIONS HOOKS ===============================

export const useGetFormOptions = (formId: string) => {
  return useQuery({
    queryKey: ['adminFormOptions', formId],
    queryFn: () => getFormOptions(formId),
    enabled: !!formId,
  })
}

export const useGetFormOptionById = (optionId: string) => {
  return useQuery({
    queryKey: ['adminFormOption', optionId],
    queryFn: () => getFormOptionById(optionId),
    enabled: !!optionId,
  })
}

export const useCreateFormOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (optionData: FormOptionCreateType) =>
      createFormOption(optionData),
    onSuccess: () => {
      toast.success('Form option created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminFormOptions'] })
    },
    onError: (_error) => {
      toast.error('Failed to create form option')
    },
  })
}

export const useCreateMultipleFormOptions = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      formId,
      options,
    }: {
      formId: string
      options: FormOptionsBatchCreateType['options']
    }) => createMultipleFormOptions(formId, options),
    onSuccess: () => {
      toast.success('Form options created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminFormOptions'] })
    },
    onError: (_error) => {
      toast.error('Failed to create form options')
    },
  })
}

export const useUpdateFormOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      optionId,
      optionData,
    }: {
      optionId: string
      optionData: FormOptionUpdateType
    }) => updateFormOption(optionId, optionData),
    onSuccess: () => {
      toast.success('Form option updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminFormOptions'] })
    },
    onError: (_error) => {
      toast.error('Failed to update form option')
    },
  })
}

export const useDeleteFormOption = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (optionId: string) => deleteFormOption(optionId),
    onSuccess: () => {
      toast.success('Form option deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminFormOptions'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete form option')
    },
  })
}

// ======================= ADMIN CONFIGURATION HOOKS ===============================

export const useGetAllConfigurations = () => {
  return useQuery({
    queryKey: ['adminConfigurations'],
    queryFn: getAllConfigurations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetConfigurationById = (configId: string) => {
  return useQuery({
    queryKey: ['adminConfiguration', configId],
    queryFn: () => getConfigurationById(configId),
    enabled: !!configId,
  })
}

export const useCreateConfiguration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (configData: ConfigurationCreateType) =>
      createConfiguration(configData),
    onSuccess: () => {
      toast.success('Configuration created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminConfigurations'] })
    },
    onError: (_error) => {
      toast.error('Failed to create configuration')
    },
  })
}

export const useUpdateConfiguration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      configId,
      configData,
    }: {
      configId: string
      configData: ConfigurationUpdateType
    }) => updateConfiguration(configId, configData),
    onSuccess: () => {
      toast.success('Configuration updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminConfigurations'] })
    },
    onError: (_error) => {
      toast.error('Failed to update configuration')
    },
  })
}

export const useDeleteConfiguration = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (configId: string) => deleteConfiguration(configId),
    onSuccess: () => {
      toast.success('Configuration deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminConfigurations'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete configuration')
    },
  })
}

// ======================= ADMIN ATTRIBUTES HOOKS ===============================

export const useGetAllAttributes = () => {
  return useQuery({
    queryKey: ['adminAttributes'],
    queryFn: getAllAttributes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetAttributeById = (attributeId: string) => {
  return useQuery({
    queryKey: ['adminAttribute', attributeId],
    queryFn: () => getAttributeById(attributeId),
    enabled: !!attributeId,
  })
}

export const useCreateAttribute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (attributeData: AttributeCreateType) =>
      createAttribute(attributeData),
    onSuccess: () => {
      toast.success('Attribute created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminAttributes'] })
    },
    onError: (_error) => {
      toast.error('Failed to create attribute')
    },
  })
}

export const useUpdateAttribute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      attributeId,
      attributeData,
    }: {
      attributeId: string
      attributeData: AttributeUpdateType
    }) => updateAttribute(attributeId, attributeData),
    onSuccess: () => {
      toast.success('Attribute updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminAttributes'] })
    },
    onError: (_error) => {
      toast.error('Failed to update attribute')
    },
  })
}

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (attributeId: string) => deleteAttribute(attributeId),
    onSuccess: () => {
      toast.success('Attribute deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminAttributes'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete attribute')
    },
  })
}

// ======================= ADMIN USER FORM RESPONSES HOOKS ===============================

export const useGetAllUserFormResponses = () => {
  return useQuery({
    queryKey: ['adminUserFormResponses'],
    queryFn: getAllUserFormResponses,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useGetUserFormResponseById = (responseId: string) => {
  return useQuery({
    queryKey: ['adminUserFormResponse', responseId],
    queryFn: () => getUserFormResponseById(responseId),
    enabled: !!responseId,
  })
}

export const useCreateUserFormResponse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (responseData: UserFormResponseCreateType) =>
      createUserFormResponse(responseData),
    onSuccess: () => {
      toast.success('Form response created successfully')
      queryClient.invalidateQueries({ queryKey: ['adminUserFormResponses'] })
    },
    onError: (_error) => {
      toast.error('Failed to create form response')
    },
  })
}

export const useUpdateUserFormResponse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      responseId,
      responseData,
    }: {
      responseId: string
      responseData: UserFormResponseUpdateType
    }) => updateUserFormResponse(responseId, responseData),
    onSuccess: () => {
      toast.success('Form response updated successfully')
      queryClient.invalidateQueries({ queryKey: ['adminUserFormResponses'] })
    },
    onError: (_error) => {
      toast.error('Failed to update form response')
    },
  })
}

export const useDeleteUserFormResponse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (responseId: string) => deleteUserFormResponse(responseId),
    onSuccess: () => {
      toast.success('Form response deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['adminUserFormResponses'] })
    },
    onError: (_error) => {
      toast.error('Failed to delete form response')
    },
  })
}
