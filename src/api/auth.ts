import {
  LoginFormSchemaType,
  RegisterFormSchemaType,
} from '@/schemas/authSchemas.ts'
import { axi } from '@/lib/axios.ts'

export const registerUser = async (formData: RegisterFormSchemaType) => {
  const response = await axi.post('/auth/register', formData)
  return response.data
}

export const loginUser = async (formData: LoginFormSchemaType) => {
  const response = await axi.post('/auth/login', formData)
  return response.data
}

export const logoutUser = async () => {
  const response = await axi.delete('/auth/logout')
  return response.data
}

// ======================= USER ===============================
export const getUsers = async () => {
  const response = await axi.get('/user')
  return response.data
}

export const getUserById = async (id: string) => {
  const response = await axi.get(`/user/${id}`)
  return response.data
}
