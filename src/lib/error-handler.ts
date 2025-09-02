import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useAdminStore } from '@/stores/adminStore'

interface ApiErrorResponse {
  message?: string
  errors?: Record<string, string[]>
}

export class ApiErrorHandler {
  static handle(error: unknown): void {
    // Check if it's an axios error with response
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      (error as AxiosError).response
    ) {
      const axiosError = error as AxiosError<ApiErrorResponse>
      const status = axiosError.response!.status
      const message = axiosError.response!.data?.message || 'An error occurred'
      const data = axiosError.response!.data

      switch (status) {
        case 401:
          this.handleUnauthorized(message)
          break
        case 403:
          this.handleForbidden(message)
          break
        case 404:
          this.handleNotFound(message)
          break
        case 422:
          this.handleValidationError(data)
          break
        case 429:
          this.handleRateLimit()
          break
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
          this.handleServerError()
          break
        default:
          this.handleGenericError(message)
      }
    } else if (error && typeof error === 'object' && 'request' in error) {
      // Network error
      this.handleNetworkError()
    } else {
      // Something else happened
      const message =
        error instanceof Error ? error.message : 'An unexpected error occurred'
      this.handleGenericError(message)
    }
  }

  private static handleUnauthorized(message: string): void {
    // Check if this is an admin login failure vs general auth failure
    if (
      message.toLowerCase().includes('invalid credentials') ||
      message.toLowerCase().includes('login')
    ) {
      // This is a login failure, show the error but don't redirect
      toast.error(message)
    } else {
      // This is a general auth failure, logout and redirect
      toast.error('Your session has expired. Please login again.')
      useAdminStore.getState().reset()
      window.location.href = '/sign-in'
    }
  }

  private static handleForbidden(message: string): void {
    toast.error(message || 'You do not have permission to perform this action.')
  }

  private static handleNotFound(message: string): void {
    toast.error(message || 'The requested resource was not found.')
  }

  private static handleValidationError(data?: ApiErrorResponse): void {
    if (data?.errors) {
      // Handle validation errors object
      Object.entries(data.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          messages.forEach((msg: string) => toast.error(`${field}: ${msg}`))
        }
      })
    } else {
      toast.error(data?.message || 'Validation failed')
    }
  }

  private static handleRateLimit(): void {
    toast.error('Too many requests. Please try again later.')
  }

  private static handleServerError(): void {
    toast.error('Server error. Please try again later.')
  }

  private static handleNetworkError(): void {
    toast.error('Network error. Please check your connection.')
  }

  private static handleGenericError(message: string): void {
    toast.error(message)
  }
}

// Utility function for handling API errors in hooks
export const handleApiError = (error: unknown) => {
  ApiErrorHandler.handle(error)
}

// Custom hook for error handling
export const useErrorHandler = () => {
  return {
    handleError: handleApiError,
  }
}
