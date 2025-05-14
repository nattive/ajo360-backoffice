import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { loginFormSchema, LoginFormSchemaType } from '@/schemas/authSchemas'
import { cn } from '@/lib/utils'
import { useLogin } from '@/hooks/api-hooks/useAuth'
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

export function UserAuthForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const { mutate: loginMutationFuncton, isLoading: loginIsLoading } = useLogin()

  const navigate = useNavigate()

  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginSubmit = async (data: LoginFormSchemaType) => {
    loginMutationFuncton(data, {
      onSuccess: () => {
        navigate({ to: '/' })
      },
    })
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
          disabled={loginIsLoading}
          isLoading={loginIsLoading}
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
