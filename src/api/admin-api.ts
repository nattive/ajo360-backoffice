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
import axi from '@/lib/axios'

// ======================= ADMIN AUTHENTICATION ===============================

export const initiateAdminLogin = async (email: string) => {
  const response = await axi.post('/admin/login/initiate', { email })
  return response.data
}

export const verifyAdminLogin = async (email: string, otp: string) => {
  const response = await axi.post('/admin/login', { email, otp })
  return response.data
}

// ======================= ADMIN DASHBOARD ===============================

export const getAdminDashboard = async (
  dateRange?: AdminDashboardParamsType
) => {
  const params = dateRange ? { ...dateRange } : {}
  const response = await axi.get('/admin/dashboard', { params })
  return response.data
}

// ======================= ADMIN WITHDRAWAL MANAGEMENT ===============================

export const getAllWithdrawals = async (status?: WithdrawalStatusType) => {
  const params = status ? { status } : {}
  const response = await axi.get('/admin/withdrawals', { params })
  return response.data
}

export const getWithdrawalById = async (withdrawalId: string) => {
  const response = await axi.get(`/admin/withdrawals/${withdrawalId}`)
  return response.data
}

export const updateWithdrawalStatus = async (
  withdrawalId: string,
  status: 'approved' | 'rejected',
  reason?: string,
  adminNotes?: string
) => {
  const response = await axi.patch(
    `/admin/withdrawals/${withdrawalId}/status`,
    {
      status,
      reason,
      adminNotes,
    }
  )
  return response.data
}

// ======================= ADMIN SAVINGS MANAGEMENT ===============================

export const triggerInterestCalculation = async (
  payload?: InterestCalculationTriggerType
) => {
  const response = await axi.post(
    '/savings/admin/trigger-interest-calculation',
    payload || {}
  )
  return response.data
}

export const triggerInterestPayout = async (
  payload?: InterestPayoutTriggerType
) => {
  const response = await axi.post(
    '/savings/admin/trigger-interest-payout',
    payload || {}
  )
  return response.data
}

// ======================= ADMIN SAVINGS PLAN MANAGEMENT ===============================

export const getAllSavingsPlans = async () => {
  const response = await axi.get('/savings-plan')
  return response.data
}

export const getActiveSavingsPlans = async () => {
  const response = await axi.get('/savings-plan/active')
  return response.data
}

export const getSavingsPlanById = async (planId: string) => {
  const response = await axi.get(`/savings-plan/${planId}`)
  return response.data
}

export const createSavingsPlan = async (planData: SavingsPlanCreateType) => {
  const response = await axi.post('/savings-plan', planData)
  return response.data
}

export const updateSavingsPlan = async (
  planId: string,
  planData: SavingsPlanUpdateType
) => {
  const response = await axi.patch(`/savings-plan/${planId}`, planData)
  return response.data
}

export const deleteSavingsPlan = async (planId: string) => {
  const response = await axi.delete(`/savings-plan/${planId}`)
  return response.data
}

// ======================= ADMIN FORM MANAGEMENT ===============================

export const getPlanForms = async (planId: string) => {
  const response = await axi.get(`/savings-plan/forms/plan/${planId}`)
  return response.data
}

export const getFormFieldById = async (fieldId: string) => {
  const response = await axi.get(`/savings-plan/forms/${fieldId}`)
  return response.data
}

export const createFormField = async (fieldData: FormFieldCreateType) => {
  const response = await axi.post('/savings-plan/forms', fieldData)
  return response.data
}

export const updateFormField = async (
  fieldId: string,
  fieldData: FormFieldUpdateType
) => {
  const response = await axi.patch(`/savings-plan/forms/${fieldId}`, fieldData)
  return response.data
}

export const deleteFormField = async (fieldId: string) => {
  const response = await axi.delete(`/savings-plan/forms/${fieldId}`)
  return response.data
}

// ======================= ADMIN FORM SELECT OPTIONS ===============================

export const getFormOptions = async (formId: string) => {
  const response = await axi.get(
    `/savings-plan/form-select-options/form/${formId}`
  )
  return response.data
}

export const getFormOptionById = async (optionId: string) => {
  const response = await axi.get(
    `/savings-plan/form-select-options/${optionId}`
  )
  return response.data
}

export const createFormOption = async (optionData: FormOptionCreateType) => {
  const response = await axi.post(
    '/savings-plan/form-select-options',
    optionData
  )
  return response.data
}

export const createMultipleFormOptions = async (
  formId: string,
  options: FormOptionsBatchCreateType['options']
) => {
  const response = await axi.post(
    `/savings-plan/form-select-options/batch/${formId}`,
    { options }
  )
  return response.data
}

export const updateFormOption = async (
  optionId: string,
  optionData: FormOptionUpdateType
) => {
  const response = await axi.patch(
    `/savings-plan/form-select-options/${optionId}`,
    optionData
  )
  return response.data
}

export const deleteFormOption = async (optionId: string) => {
  const response = await axi.delete(
    `/savings-plan/form-select-options/${optionId}`
  )
  return response.data
}

// ======================= ADMIN CONFIGURATION MANAGEMENT ===============================

export const getAllConfigurations = async () => {
  const response = await axi.get('/savings-plan/configs')
  return response.data
}

export const getConfigurationById = async (configId: string) => {
  const response = await axi.get(`/savings-plan/configs/${configId}`)
  return response.data
}

export const createConfiguration = async (
  configData: ConfigurationCreateType
) => {
  const response = await axi.post('/savings-plan/configs', configData)
  return response.data
}

export const updateConfiguration = async (
  configId: string,
  configData: ConfigurationUpdateType
) => {
  const response = await axi.patch(
    `/savings-plan/configs/${configId}`,
    configData
  )
  return response.data
}

export const deleteConfiguration = async (configId: string) => {
  const response = await axi.delete(`/savings-plan/configs/${configId}`)
  return response.data
}

// ======================= ADMIN ATTRIBUTES MANAGEMENT ===============================

export const getAllAttributes = async () => {
  const response = await axi.get('/savings-plan/attributes')
  return response.data
}

export const getAttributeById = async (attributeId: string) => {
  const response = await axi.get(`/savings-plan/attributes/${attributeId}`)
  return response.data
}

export const createAttribute = async (attributeData: AttributeCreateType) => {
  const response = await axi.post('/savings-plan/attributes', attributeData)
  return response.data
}

export const updateAttribute = async (
  attributeId: string,
  attributeData: AttributeUpdateType
) => {
  const response = await axi.patch(
    `/savings-plan/attributes/${attributeId}`,
    attributeData
  )
  return response.data
}

export const deleteAttribute = async (attributeId: string) => {
  const response = await axi.delete(`/savings-plan/attributes/${attributeId}`)
  return response.data
}

// ======================= ADMIN USER FORM RESPONSES ===============================

export const getAllUserFormResponses = async () => {
  const response = await axi.get('/user-form-responses')
  return response.data
}

export const getUserFormResponseById = async (responseId: string) => {
  const response = await axi.get(`/user-form-responses/${responseId}`)
  return response.data
}

export const createUserFormResponse = async (
  responseData: UserFormResponseCreateType
) => {
  const response = await axi.post('/user-form-responses', responseData)
  return response.data
}

export const updateUserFormResponse = async (
  responseId: string,
  responseData: UserFormResponseUpdateType
) => {
  const response = await axi.patch(
    `/user-form-responses/${responseId}`,
    responseData
  )
  return response.data
}

export const deleteUserFormResponse = async (responseId: string) => {
  const response = await axi.delete(`/user-form-responses/${responseId}`)
  return response.data
}
