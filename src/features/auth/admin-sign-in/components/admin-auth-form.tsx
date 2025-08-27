import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import {
  AdminLoginInitiateSchema,
  AdminLoginVerifySchema,
} from '@/schemas/adminSchemas'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useInitiateAdminLogin,
  useVerifyAdminLogin,
} from '@/hooks/api-hooks/useAdmin'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type AdminLoginStep = 'email' | 'otp'

export function AdminAuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [step, setStep] = useState<AdminLoginStep>('email')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const initiateLogin = useInitiateAdminLogin()
  const verifyLogin = useVerifyAdminLogin()

  const emailForm = useForm({
    resolver: zodResolver(AdminLoginInitiateSchema),
    defaultValues: {
      email: '',
    },
  })

  const otpForm = useForm({
    resolver: zodResolver(AdminLoginVerifySchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  })

  const otp = otpForm.watch('otp')

  const handleEmailSubmit = async (data: { email: string }) => {
    initiateLogin.mutate(data.email, {
      onSuccess: () => {
        setEmail(data.email)
        setStep('otp')
        otpForm.setValue('email', data.email)
      },
    })
  }

  const handleOtpSubmit = async (data: { email: string; otp: string }) => {
    verifyLogin.mutate(data, {
      onSuccess: () => {
        navigate({ to: '/' })
      },
    })
  }

  const handleBackToEmail = () => {
    setStep('email')
    setEmail('')
  }

  if (step === 'otp') {
    return (
      <div className={cn('w-full max-w-md', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className='text-center text-lg tracking-tight'>
              Ajo365 Admin - OTP Verification
            </CardTitle>
            <CardDescription className='text-center'>
              Enter the 6-digit OTP sent to {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={otpForm.control}
                  name='otp'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='123456'
                          {...field}
                          maxLength={6}
                          className='text-center font-mono text-lg tracking-widest'
                          type='text'
                          inputMode='numeric'
                          pattern='[0-9]*'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert>
                  <Info className='h-4 w-4' />
                  <AlertDescription>
                    Check your email for the 6-digit OTP code. If you don't see
                    it, check your spam folder.
                  </AlertDescription>
                </Alert>

                <div className='flex gap-2'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleBackToEmail}
                    className='flex-1'
                  >
                    Back
                  </Button>
                  <Button
                    type='submit'
                    className='flex-1 bg-blue-700 hover:bg-blue-900'
                    disabled={verifyLogin.isPending || otp.length < 6}
                    isLoading={verifyLogin.isPending}
                  >
                    Verify OTP
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('w-full max-w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-center text-lg tracking-tight'>
            Ajo365 Admin Login
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your admin email to receive an OTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
              className='space-y-4'
            >
              <FormField
                control={emailForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input placeholder='admin@ajo365.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <Info className='h-4 w-4' />
                <AlertDescription>
                  Admin login uses OTP-based authentication for enhanced
                  security. You'll receive a 6-digit code via email.
                </AlertDescription>
              </Alert>

              <Button
                type='submit'
                className='w-full bg-blue-700 hover:bg-blue-900'
                disabled={initiateLogin.isPending}
                isLoading={initiateLogin.isPending}
              >
                Send OTP
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
