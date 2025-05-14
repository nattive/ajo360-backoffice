import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN, getAuth } from '@/stores/authStore.ts'

export const axi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true,
})

// refresh token instance

export const refreshTokenInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

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

// RESPONSE interceptor = handle 401 error
axi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const auth = getAuth()

    const status = error?.response?.status
    const isAuthEndpoint = originalRequest?.url?.includes('/auth')

    // logout case
    if (isAuthEndpoint && status === 401) {
      auth.reset()
      return Promise.reject(error)
    }

    //Token refresh case
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        // Wait for the current refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axi(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      //get refresh token from cookies
      const refreshToken = Cookies.get(REFRESH_TOKEN)

      if (!refreshToken) {
        auth.reset()
        isRefreshing = false
        processQueue(new Error('No refresh token'), null)
        return Promise.reject(error)
      }

      try {
        const response = await refreshTokenInstance.post(`/auth/refresh`, {
          refreshToken,
        })

        const newToken = response.data.accessToken
        auth.setAccessToken(newToken)
        processQueue(null, newToken)

        // update and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axi(originalRequest)
      } catch (rerefreshError) {
        processQueue(rerefreshError, null)
        auth.reset()
        return Promise.reject(rerefreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default axi
