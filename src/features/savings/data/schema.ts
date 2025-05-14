import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().nullable(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string(),
  bvn: z.string().nullable(),
  dateOfBirth: z.string(),
  profilePicture: z.string().url().nullable(),
  deviceId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  emailVerified: z.boolean(),
  phoneNumberVerified: z.boolean(),
  address: z.string(),
  state: z.string(),
  country: z.string(),
})

export const savingsSchema = z.object({
  id: z.string(),
  savingsAccountNumber: z.string(),
  savingsAccountName: z.string(),
  targetAmount: z.string(),
  balance: z.string(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
  nextWithdrawalDate: z.string(),
  status: z.enum(['ACTIVE', 'PENDING', 'FAILED', 'CLOSED']),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: userSchema,
})

export type Savings = z.infer<typeof savingsSchema>
