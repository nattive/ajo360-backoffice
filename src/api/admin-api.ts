import axi from '@/lib/axios'

// ======================= ADMIN AUTHENTICATION ===============================

export const adminLogin = async (email: string, password: string) => {
  const response = await axi.post('/admin/auth/login', { email, password })
  return response.data
}

// ======================= ADMIN DASHBOARD ===============================

export const getAdminDashboard = async () => {
  const response = await axi.get('/admin/dashboard')
  return response.data
}

// ======================= USER MANAGEMENT ===============================

export interface GetUsersParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  verified?: boolean
}

export const getAllUsers = async (params: GetUsersParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.verified !== undefined) queryParams.append('verified', params.verified.toString())
  
  const response = await axi.get(`/admin/users?${queryParams.toString()}`)
  return response.data
}

export const getUserById = async (userId: string) => {
  const response = await axi.get(`/admin/users/${userId}`)
  return response.data
}

export interface UpdateUserData {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  dateOfBirth?: string
  address?: string
  city?: string
  state?: string
  country?: string
  emailVerified?: boolean
  phoneVerified?: boolean
}

export const updateUser = async (userId: string, userData: UpdateUserData) => {
  const response = await axi.patch(`/admin/users/${userId}`, userData)
  return response.data
}

export interface UpdateUserStatusData {
  status: 'active' | 'suspended'
  reason?: string
}

export const updateUserStatus = async (userId: string, statusData: UpdateUserStatusData) => {
  const response = await axi.patch(`/admin/users/${userId}/status`, statusData)
  return response.data
}

export const retriggerWalletCreation = async (userId: string) => {
  const response = await axi.post(`/admin/users/${userId}/retrigger-wallet`)
  return response.data
}

// ======================= TRANSACTION MANAGEMENT ===============================

export interface GetTransactionsParams {
  page?: number
  limit?: number
  type?: string
  status?: string
  startDate?: string
  endDate?: string
}

export const getAllTransactions = async (params: GetTransactionsParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.type) queryParams.append('type', params.type)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  
  const response = await axi.get(`/admin/transactions?${queryParams.toString()}`)
  return response.data
}

export const getTransactionById = async (transactionId: string) => {
  const response = await axi.get(`/admin/transactions/${transactionId}`)
  return response.data
}

// ======================= WITHDRAWAL MANAGEMENT ===============================

export const getAllWithdrawals = async (status?: string) => {
  const queryParams = new URLSearchParams()
  
  if (status) queryParams.append('status', status)
  
  const response = await axi.get(`/admin/withdrawals?${queryParams.toString()}`)
  return response.data
}

export interface UpdateWithdrawalStatusData {
  status: 'approved' | 'rejected'
  reason?: string
  adminNotes?: string
}

export const updateWithdrawalStatus = async (
  withdrawalId: string, 
  statusData: UpdateWithdrawalStatusData
) => {
  const response = await axi.patch(`/admin/withdrawals/${withdrawalId}/status`, statusData)
  return response.data
}

export interface BulkWithdrawalActionData {
  withdrawalIds: string[]
  action: 'approve' | 'reject'
  reason: string
  processorReference?: string
}

export const bulkWithdrawalAction = async (actionData: BulkWithdrawalActionData) => {
  const response = await axi.post('/admin/withdrawals/bulk-action', actionData)
  return response.data
}

// ======================= SAVINGS PLAN MANAGEMENT ===============================

export interface GetSavingsParams {
  page?: number
  limit?: number
  search?: string
  is_visible?: boolean
  is_enabled?: boolean
}

export const getAllSavings = async (params: GetSavingsParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.is_visible !== undefined) queryParams.append('is_visible', params.is_visible.toString())
  if (params.is_enabled !== undefined) queryParams.append('is_enabled', params.is_enabled.toString())
  
  const response = await axi.get(`/admin/savings-plans?${queryParams.toString()}`)
  return response.data
}

export const getSavingById = async (savingId: string) => {
  const response = await axi.get(`/admin/savings-plans/${savingId}`)
  return response.data
}

export interface CreateSavingData {
  name: string
  slug: string
  icon?: string
  color: string
  bgColor: string
  description: string
  is_visible: boolean
  is_enabled: boolean
  config: {
    interest_rate: string
    minimum_days: number
    maximum_days?: number
    interest_style: 'simple' | 'compound'
    allow_break: boolean
    minimum_percentage_amount: number
    user_can_auto_save: boolean
    break_penalty: string
    allow_interest_withdrawal: boolean
    use_main_wallet_balance: boolean
    is_group_savings: boolean
    keep_interest_on_break: boolean
    keep_interest_record: boolean
  }
}

export const createSaving = async (savingData: CreateSavingData) => {
  const response = await axi.post('/admin/savings-plans', savingData)
  return response.data
}

export const updateSaving = async (savingId: string, savingData: Partial<CreateSavingData>) => {
  const response = await axi.patch(`/admin/savings-plans/${savingId}`, savingData)
  return response.data
}

export const deleteSaving = async (savingId: string) => {
  const response = await axi.delete(`/admin/savings/${savingId}`)
  return response.data
}

// ======================= COMPREHENSIVE SAVINGS MANAGEMENT ===============================

export interface SavingsQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: 'active' | 'inactive' | 'completed' | 'cancelled'
  startDate?: string
  endDate?: string
  sortBy?: 'createdAt' | 'balance' | 'maturityDate'
  sortOrder?: 'ASC' | 'DESC'
}

export interface UserBasicInfo {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface SavingBasicInfo {
  id: string
  balance: number
  type: string
  createdAt: string
  updatedAt: string
}

export interface SavingsSummary {
  totalBalance: number
  totalSavings: number
  activeSavings: number
  inactiveSavings: number
  averageBalance: number
}

export interface PaginationMeta {
  page: number
  limit: number
  totalPages: number
  totalItems: number
}

// Business Locks
export interface AdminBusinessLockDto {
  id: string
  planTitle: string
  businessName: string
  businessType: string
  targetAmount: string
  lockAmount: string
  lockDuration: string
  lockStartDate: string
  lockEndDate: string
  lockStatus: string
  penaltyPercentage: string
  user: UserBasicInfo
  saving: SavingBasicInfo
  createdAt: string
  updatedAt: string
}

export interface BusinessLocksResponse {
  data: AdminBusinessLockDto[]
  meta: PaginationMeta
  summary: SavingsSummary
}

export const getBusinessLocks = async (params: SavingsQueryParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
  
  const response = await axi.get(`/admin/business-locks?${queryParams.toString()}`)
  return response.data
}

// Business Targets
export interface AdminBusinessTargetDto {
  id: string
  targetAmount: number
  targetDate: string
  currentAmount: number
  interestRate: number
  user: UserBasicInfo
  saving: SavingBasicInfo
}

export interface BusinessTargetsResponse {
  data: AdminBusinessTargetDto[]
  meta: PaginationMeta
  summary: SavingsSummary
}

export const getBusinessTargets = async (params: SavingsQueryParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
  
  const response = await axi.get(`/admin/business-targets?${queryParams.toString()}`)
  return response.data
}

// Group Savings
export interface AdminGroupSavingDto {
  id: string
  groupName: string
  contributionAmount: number
  minMembers: number
  maxMembers: number
  startDate: string
  endDate: string
  payoutFrequency: string
  isActive: boolean
  user: UserBasicInfo
  saving: SavingBasicInfo
}

export interface GroupSavingsResponse {
  data: AdminGroupSavingDto[]
  meta: PaginationMeta
  summary: SavingsSummary
}

export const getGroupSavings = async (params: SavingsQueryParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
  
  const response = await axi.get(`/admin/group-savings?${queryParams.toString()}`)
  return response.data
}

// Locked Savings
export interface AdminLockedSavingDto {
  id: string
  lockDuration: number
  maturityDate: string
  interestRate: number
  user: UserBasicInfo
  saving: SavingBasicInfo
}

export interface LockedSavingsResponse {
  data: AdminLockedSavingDto[]
  meta: PaginationMeta
  summary: SavingsSummary
}

export const getLockedSavings = async (params: SavingsQueryParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
  
  const response = await axi.get(`/admin/locked-savings?${queryParams.toString()}`)
  return response.data
}

// Target Savings
export interface AdminTargetSavingDto {
  id: string
  targetAmount: number
  targetDate: string
  currentAmount: number
  user: UserBasicInfo
  saving: SavingBasicInfo
}

export interface TargetSavingsResponse {
  data: AdminTargetSavingDto[]
  meta: PaginationMeta
  summary: SavingsSummary
}

export const getTargetSavings = async (params: SavingsQueryParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.startDate) queryParams.append('startDate', params.startDate)
  if (params.endDate) queryParams.append('endDate', params.endDate)
  if (params.sortBy) queryParams.append('sortBy', params.sortBy)
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
  
  const response = await axi.get(`/admin/target-savings?${queryParams.toString()}`)
  return response.data
}
