import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, getAuth } from '@/stores/authStore.ts'
import { ApiErrorHandler } from './error-handler'

export const axi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})



//  Request interceptor: attach access token
axi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// RESPONSE interceptor = handle errors and auth
axi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const auth = getAuth()

    const status = error?.response?.status
    const isAuthEndpoint = originalRequest?.url?.includes('/auth')
    const isAdminLoginEndpoint = originalRequest?.url?.includes('/admin/auth/login')

    // Handle auth-specific logic first
    if (status === 401) {
      // For admin login failures, don't reset auth or show error toast
      if (isAdminLoginEndpoint) {
        return Promise.reject(error)
      }
      
      // For other auth endpoints, reset auth but don't show error toast
      if (isAuthEndpoint) {
        auth.reset()
        return Promise.reject(error)
      }
      
      // For any other 401 errors (expired tokens), reset auth and handle error
      auth.reset()
      ApiErrorHandler.handle(error)
      return Promise.reject(error)
    }

    // For non-401 errors, use the centralized error handler
    // But skip error handling for login endpoints to let components handle them
    if (!isAdminLoginEndpoint && !isAuthEndpoint) {
      ApiErrorHandler.handle(error)
    }

    return Promise.reject(error)
  }
)

export default axi
