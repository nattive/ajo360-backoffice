import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().nullable().optional(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string().optional(), // Allow missing password in some contexts
  bvn: z.string().nullable().optional(),
  dateOfBirth: z.string().nullable().optional(), // Allow null or missing
  profilePicture: z.string().url().nullable().optional(),
  deviceId: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  emailVerified: z.boolean(),
  phoneNumberVerified: z.boolean(),
  address: z.string().nullable().optional(), // Allow null or missing
  state: z.string().nullable().optional(),   // Allow null or missing
  country: z.string().nullable().optional(), // Allow null or missing
});

export const walletSchema = z.object({
  id: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string().nullable().optional(),
  accountReference: z.string().nullable().optional(),
  bankCode: z.string().nullable().optional(),
  bookedBalance: z.string(),
  availableBalance: z.string(),
  currency: z.string(),
  createdAt: z.string(),
  status: z.string(),
  providerWalletId: z.string().nullable().optional(),
  metadata: z.unknown().nullable().optional(),
  isLocked: z.boolean(),
  isDeleted: z.boolean(),
  isPND: z.boolean(),
  updatedAt: z.string(),
  user: userSchema,
});

export type Wallet = z.infer<typeof walletSchema>;
