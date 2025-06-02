import axi from '@/lib/axios'
import { SavingsPlan } from '@/features/savings-plan/data/schema'

export const allSavings = async () => {
  const response = await axi.get('/savings-plan')
  return response.data
}

export const createSavings = async (formData: unknown) => {
  const response = await axi.post('/savings-plan', formData)
  return response?.data
}

export const activeSavings = async () => {
  const response = await axi.get('/savings/active-savings')
  return response?.data
}

export const activeSavingsById = async (id: string) => {
  const response = await axi.get(`/savings/active-savings/${id}`)
  return response?.data
}

export const gatSavingsById = async (id: string) => {
  const response = await axi.get(`/savings-plan/${id}`)
  return response?.data
}

export const updateSavings = async ({
  id,
  formData,
}: {
  id: string
  formData: Partial<Omit<SavingsPlan, 'config'>>
}) => {
  const response = await axi.patch(`/savings-plan/${id}`, formData)
  return response?.data
}

export const deleteSavings = async (id : string ) => {
  const response = await axi.delete(`/savings-plan/${id}`)
  return response?.data
}


