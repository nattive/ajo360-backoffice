import AuthLayout from '../auth-layout'
import { AdminAuthForm } from './components/admin-auth-form'

export default function AdminSignIn() {
  return (
    <AuthLayout>
      <div className='flex min-h-screen items-center justify-center'>
        <AdminAuthForm />
      </div>
    </AuthLayout>
  )
}
