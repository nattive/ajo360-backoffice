import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AdminLoginSchema } from '@/schemas/adminSchemas'
import { cn } from '@/lib/utils'
import { useAdminLogin } from '@/hooks/api-hooks/useAdmin'

import { LoadingButton } from '@/components/ui/loading-spinner'
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

export function AdminAuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const adminLogin = useAdminLogin()

  const form = useForm({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: { email: string; password: string }) => {
    adminLogin.mutate(data)
  }

  return (
    <div className={cn('w-full max-w-md', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-center text-lg tracking-tight'>
            Ajo365 Admin Login
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your admin credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-4'
            >
              <FormField
                control={form.control}
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

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Enter password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                type='submit'
                className='w-full bg-blue-700 hover:bg-blue-900'
                isLoading={adminLogin.isPending}
                loadingText='Signing in...'
              >
                Sign In
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
