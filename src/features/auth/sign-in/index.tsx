import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-center text-lg tracking-tight'>
            Login
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your email and password below to Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        {/* <CardFooter> */}
        {/*   <p className='text-muted-foreground px-8 text-center text-sm'> */}
        {/*     Don't have Account? */}
        {/*     <a */}
        {/*       href='/sign-up' */}
        {/*       className='hover:text-blue-900 ml-1 underline underline-offset-4 text-blue-700' */}
        {/*     > */}
        {/*       Sign up */}
        {/*     </a> */}
        {/*   </p> */}
        {/* </CardFooter> */}
      </Card>
    </AuthLayout>
  )
}
