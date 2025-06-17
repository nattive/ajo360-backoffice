import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { toast } from 'sonner'
import axios from 'axios'
import { useSearch } from '@tanstack/react-router'
import { useAuth } from '@/stores/authStore'
import { jwtDecode } from 'jwt-decode'

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, 'OTP must be exactly 6 characters'),
})

export type OtpFormType = z.infer<typeof otpSchema>

interface AuthTokenPayload {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

export function VerifyOtpForm() {
  const navigate = useNavigate()
  const { email } = useSearch({ from: '/(auth)/verify-otp' })

  const { setAccessToken, setRefreshToken, setUser } = useAuth()

  const form = useForm<OtpFormType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: email || '',
      otp: '',
    },
  })

  const handleVerify = async (data: OtpFormType) => {
    try {
      const response = await axios.post('https://api.myajo360.com/admin/login', {
        email: data.email,
        otp: data.otp,
      })

      const { accessToken, refreshToken } = response.data

      // Store tokens using Zustand + cookies
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)

    // Decode and set user info in store
    const decodedUser = jwtDecode<AuthTokenPayload>(accessToken)
    setUser(decodedUser)

      toast.success('Login successful!')
      navigate({ to: '/', replace: true })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Invalid OTP or login failed.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f0e8]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-2xl font-semibold mb-1">Ajo360</div>
          <h2 className="text-lg font-medium">Verify OTP</h2>
          <p className="text-sm text-gray-500">Enter the OTP sent to your email</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleVerify)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the OTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-700 hover:bg-blue-900 mt-2">
              Verify OTP
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
