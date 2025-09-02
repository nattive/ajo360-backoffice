import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error('Server Error:', error)

  let errMsg = 'Something went wrong!'
  let shouldRedirect = false
  let redirectPath = ''

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  // Axios errors
  if (error instanceof AxiosError) {
    const responseData = error.response?.data
    const status = error.response?.status
    const message = responseData?.message || responseData?.title || responseData?.error
    
    // Handle specific HTTP status codes
    switch (status) {
      case 400:
        errMsg = message || 'Bad request. Please check your input.'
        break
      case 401:
        errMsg = 'Session expired. Please sign in again.'
        shouldRedirect = true
        redirectPath = '/sign-in'
        break
      case 403:
        errMsg = 'Access denied. You do not have permission to perform this action.'
        shouldRedirect = true
        redirectPath = '/403'
        break
      case 404:
        errMsg = message || 'The requested resource was not found.'
        break
      case 422:
        errMsg = message || 'Validation failed. Please check your input.'
        break
      case 429:
        errMsg = 'Too many requests. Please try again later.'
        break
      case 500:
        errMsg = 'Internal server error. Please try again later.'
        shouldRedirect = true
        redirectPath = '/500'
        break
      case 502:
      case 503:
      case 504:
        errMsg = 'Service temporarily unavailable. Please try again later.'
        shouldRedirect = true
        redirectPath = '/503'
        break
      default:
        // Network error
        if (error.message === 'Network Error' || !error.response) {
          errMsg = 'No internet connection. Please check your network.'
        } else if (message) {
          errMsg = message
        } else if (status) {
          errMsg = `Request failed with status ${status}`
        }
    }

    // Handle validation errors with multiple fields
    if (status === 422 && responseData?.errors) {
      const validationErrors = Object.values(responseData.errors).flat()
      if (validationErrors.length > 0) {
        errMsg = validationErrors?.[0] as string
      }
    }
  }

  // Show error toast
  toast.error(errMsg)

  // Handle redirects for specific errors
  if (shouldRedirect && redirectPath) {
    setTimeout(() => {
      window.location.href = redirectPath
    }, 2000) // Delay to allow user to see the error message
  }

  return {
    message: errMsg,
    status: error instanceof AxiosError ? error.response?.status : null,
    shouldRedirect,
    redirectPath
  }
}
