import axi from '@/lib/axios'

// ======================= WALLET MANAGEMENT ===============================

export interface GetWalletsParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  currency?: string
  minBalance?: number
}

export const getAllWallets = async (params: GetWalletsParams = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.status) queryParams.append('status', params.status)
  if (params.currency) queryParams.append('currency', params.currency)
  if (params.minBalance) queryParams.append('minBalance', params.minBalance.toString())
  
  const response = await axi.get(`/admin/wallets?${queryParams.toString()}`)
  return response.data
}

export const getWalletById = async (walletId: string) => {
  const response = await axi.get(`/admin/wallets/${walletId}`)
  return response.data
}

export interface CreateWalletData {
  userId: string
  currency?: string
}

export const createWallet = async (walletData: CreateWalletData) => {
  const response = await axi.post('/admin/wallets', walletData)
  return response.data
}

export interface UpdateWalletData {
  isLocked?: boolean
  status?: string
}

export const updateWallet = async (walletId: string, walletData: UpdateWalletData) => {
  const response = await axi.patch(`/admin/wallets/${walletId}`, walletData)
  return response.data
}

export const deleteWallet = async (walletId: string) => {
  const response = await axi.delete(`/admin/wallets/${walletId}`)
  return response.data
}

export const lockWallet = async (walletId: string) => {
  const response = await axi.patch(`/admin/wallets/${walletId}/lock`)
  return response.data
}

export const unlockWallet = async (walletId: string) => {
  const response = await axi.patch(`/admin/wallets/${walletId}/unlock`)
  return response.data
}

export const getWalletTransactions = async (walletId: string, params: { page?: number; limit?: number } = {}) => {
  const queryParams = new URLSearchParams()
  
  if (params.page) queryParams.append('page', params.page.toString())
  if (params.limit) queryParams.append('limit', params.limit.toString())
  
  const response = await axi.get(`/admin/wallets/${walletId}/transactions?${queryParams.toString()}`)
  return response.data
}