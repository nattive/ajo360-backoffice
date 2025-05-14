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
