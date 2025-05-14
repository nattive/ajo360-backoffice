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

export const walletSchema = z.object({
  id: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string().nullable(),
  accountReference: z.string().nullable(),
  bankCode: z.string().nullable(),
  bookedBalance: z.string(),
  availableBalance: z.string(),
  currency: z.string(),
  createdAt: z.string(),
  status: z.string(),
  providerWalletId: z.string().nullable(),
  metadata: z.unknown().nullable(),
  isLocked: z.boolean(),
  isDeleted: z.boolean(),
  isPND: z.boolean(),
  updatedAt: z.string(),
  user: userSchema,
})

export type Wallet = z.infer<typeof walletSchema>
