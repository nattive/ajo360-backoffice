 import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { loginFormSchema, LoginFormSchemaType } from '@/schemas/authSchemas'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { toast } from 'sonner' 
import axios from 'axios'

export function UserAuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const navigate = useNavigate()

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginSubmit = async (data: LoginFormSchemaType) => {
    try {
      // Step 1: Send OTP to email
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post('https://api.myajo360.com/admin/login/initiate', {
        email: data.email,
      })

      toast.success('OTP sent successfully to your email.')

      // Step 2: Redirect to verify-otp with email
      navigate({ to: '/verify-otp', search: { email: data.email } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      toast.error('Failed to send OTP. Please try again.')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLoginSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />

        <Button
          className='mt-2 bg-blue-700 hover:bg-blue-900'
          type='submit'
        >
          Login
        </Button>
      </form>
    </Form>
  )
}  