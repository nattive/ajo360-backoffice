// import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { SignUpForm } from './components/sign-up-form'

export default function SignUp() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight text-center'>Register</CardTitle>
          <CardDescription className="text-center">
            Welcome!, Enter details below to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
           Already have an Account?
            <a
              href='/sign-in'
              className='hover:text-blue-900 ml-1 underline underline-offset-4 text-blue-700'
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
  </AuthLayout>
  )
}
