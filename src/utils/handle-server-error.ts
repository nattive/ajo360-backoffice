import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Something went wrong!'

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
    const message  = error.response?.data.title
    const status = error.response?.data.status
    const title = error.response?.data.title


    //   Network error
    if (error.message === 'Network Error' && !error.message) {
      errMsg = "No Internet connection. Please check your network."
    } else if(title) {
      errMsg = title
    } else if (message) {
      errMsg = message
    } else if (status) {
      errMsg = `Request failed with status ${status}`
    }
  }

  toast.error(errMsg)
}
