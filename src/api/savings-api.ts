import axi from '@/lib/axios'

export const allServices = async () => {
  const response = await axi.post('/savings-plan')
  return response.data
}

export const createService = async (formData: unknown) => {
  const response = await axi.post('/savings/create-savings', formData)
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

export const updateSavings = async (id: string, formData: unknown) => {
  const response = await axi.put(`/savings/update-savings/${id}`, formData)
  return response?.data
}
//
// export const deleteSavings = async (id: string) => {
//   cosnt response = await axi.delete(`/savings/${id}`)
//   return response?.data
// }
//
//
