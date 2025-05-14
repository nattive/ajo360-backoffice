import { z } from 'zod'

export const RegisterFormSchemaBase = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  phoneNumber: z.string().min(1, { message: 'Please enter your phone number' }),
  password: z
    .string()
    .min(7, { message: 'Password must be at least 7 characters long' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Please confirm your password' }),
  pin: z.string().min(4, { message: 'PIN must be at least 4 digits long' }),
  txnPin: z
    .string()
    .min(4, { message: 'Transaction PIN must be at least 4 digits long' }),
  dateOfBirth: z
    .string()
    .min(1, { message: 'Please enter your date of birth' }),
  gender: z.string().min(1, { message: 'Please select your gender' }),
  address: z.string().min(1, { message: 'Please enter your address' }),
  state: z.string().min(1, { message: 'Please enter your state' }),
  country: z.string().min(1, { message: 'Please enter your country' }),
})

export const RegisterFormSchema = RegisterFormSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  }
)

export type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>

// login
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>
