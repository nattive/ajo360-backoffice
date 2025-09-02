import Cookies from 'js-cookie'
import { create } from 'zustand'
import type { AdminType } from '@/schemas/adminSchemas'

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'
export const ADMIN_DATA = 'admin_data'

interface AuthState {
  auth: {
    admin: AdminType | null
    setAdmin: (admin: AdminType | null) => void
    accessToken: string
    refreshToken: string
    setAccessToken: (accessToken: string) => void
    setRefreshToken: (refreshToken: string) => void
    resetAccessToken: () => void
    reset: () => void
    isAuthenticated: boolean
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN)
  const refreshToken = Cookies.get(REFRESH_TOKEN)
  const adminData = Cookies.get(ADMIN_DATA)

  const initToken = cookieState ? cookieState : ''
  const initRefreshToken = refreshToken ? refreshToken : ''
  let initAdmin = null
  
  // Safely parse admin data from cookies
  if (adminData) {
    try {
      initAdmin = JSON.parse(adminData)
    } catch {
      // Remove corrupted cookie silently
      Cookies.remove(ADMIN_DATA)
    }
  }

  return {
    auth: {
      admin: initAdmin,
      setAdmin: (admin) =>
        set((state) => {
          if (admin) {
            Cookies.set(ADMIN_DATA, JSON.stringify(admin))
          } else {
            Cookies.remove(ADMIN_DATA)
          }
          return { 
            ...state, 
            auth: { 
              ...state.auth, 
              admin,
              isAuthenticated: !!state.auth.accessToken && !!admin
            } 
          }
        }),
      accessToken: initToken,
      refreshToken: initRefreshToken,
      isAuthenticated: !!initToken && !!initAdmin,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, accessToken)
          return { 
            ...state, 
            auth: { 
              ...state.auth, 
              accessToken,
              isAuthenticated: !!accessToken && !!state.auth.admin
            } 
          }
        }),
      setRefreshToken: (refreshToken) =>
        set((state) => {
          Cookies.set(REFRESH_TOKEN, refreshToken)
          return { ...state, auth: { ...state.auth, refreshToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          return { 
            ...state, 
            auth: { 
              ...state.auth, 
              accessToken: '',
              isAuthenticated: false
            } 
          }
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN)
          Cookies.remove(REFRESH_TOKEN)
          Cookies.remove(ADMIN_DATA)
          return {
            ...state,
            auth: {
              ...state.auth,
              admin: null,
              accessToken: '',
              refreshToken: '',
              isAuthenticated: false,
            },
          }
        }),
    },
  }
})

export const useAuth = () => useAuthStore((state) => state.auth)
export const getAuth = () => useAuthStore.getState().auth
