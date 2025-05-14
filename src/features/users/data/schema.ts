import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().nullable(),
  email: z.string().email(),
  phoneNumber: z.string(),
  bvn: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  profilePicture: z.string().nullable(),
  deviceId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  emailVerified: z.boolean(),
  phoneNumberVerified: z.boolean(),
  address: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  fullName: z.string(),
  accountInfo: z.string().nullable(),
})

export type User = z.infer<typeof userSchema>
export const userListSchema = z.array(userSchema)
