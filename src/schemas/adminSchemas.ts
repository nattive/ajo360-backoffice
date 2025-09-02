import { z } from 'zod'

// ======================= ADMIN AUTHENTICATION SCHEMAS ===============================

export const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type AdminLoginType = z.infer<typeof AdminLoginSchema>

// ======================= ADMIN RESPONSE SCHEMAS ===============================

export const AdminSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const AdminLoginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    admin: AdminSchema,
  }),
})

// ======================= DASHBOARD SCHEMAS ===============================

export const DashboardDataSchema = z.object({
  withdrawals: z.object({
    totalAmount: z.number(),
    totalCount: z.number(),
    pendingAmount: z.number(),
    pendingCount: z.number(),
    completedAmount: z.number(),
    completedCount: z.number(),
  }),
  savings: z.object({
    totalAmount: z.number(),
    totalCount: z.number(),
    activeAmount: z.number(),
    activeCount: z.number(),
    completedAmount: z.number(),
    completedCount: z.number(),
  }),
  users: z.object({
    totalCount: z.number(),
    verifiedCount: z.number(),
    unverifiedCount: z.number(),
    activeCount: z.number(),
    suspendedCount: z.number(),
  }),
  transactions: z.object({
    totalAmount: z.number(),
    totalCount: z.number(),
    creditAmount: z.number(),
    creditCount: z.number(),
    debitAmount: z.number(),
    debitCount: z.number(),
  }),
  revenue: z.object({
    totalRevenue: z.number(),
    monthlyRevenue: z.number(),
    dailyRevenue: z.number(),
  }),
  systemStatus: z.object({
    isHealthy: z.boolean(),
    lastUpdated: z.string(),
  }),
})

export const DashboardResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: DashboardDataSchema,
})

// ======================= USER SCHEMAS ===============================

export const WalletSchema = z.object({
  id: z.string(),
  balance: z.number(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.string().optional(),
})

export const UserStatisticsSchema = z.object({
  totalSavings: z.number(),
  totalSavingsBalance: z.union([z.number(), z.string()]),
  totalTransactions: z.number(),
  totalDeposited: z.number(),
  totalWithdrawn: z.number(),
  activeSavingsCount: z.number(),
  lastLoginAt: z.string().nullable(),
  accountAge: z.number(),
})

export const RecentTransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  type: z.string(),
  status: z.string(),
  description: z.string(),
  createdAt: z.string(),
})

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().nullable().optional(),
  email: z.string(),
  uniqueCode: z.string().optional(),
  phoneNumber: z.string(),
  bvn: z.string().nullable().optional(),
  dateOfBirth: z.string().nullable().optional(),
  profilePicture: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  emailVerified: z.boolean(),
  phoneNumberVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  wallet: WalletSchema.nullable().optional(),
  bankAccounts: z.array(z.unknown()).optional(),
  statistics: UserStatisticsSchema.optional(),
})

export const UsersMetadataSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
})

export const UsersSummarySchema = z.object({
  totalUsers: z.number(),
  verifiedUsers: z.number(),
  totalSavingsBalance: z.number(),
})

export const UsersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(UserSchema),
  metadata: UsersMetadataSchema,
  summary: UsersSummarySchema,
})

export const UserDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: UserSchema,
})

export const UpdateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
})

export const UpdateUserStatusSchema = z.object({
  status: z.enum(['active', 'suspended']),
  reason: z.string().optional(),
})

// ======================= TRANSACTION SCHEMAS ===============================

export const TransactionUserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
})

export const TransactionWalletSchema = z.object({
  id: z.string(),
  balance: z.number().optional(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string().optional(),
})

export const TransactionLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  details: z.string(),
  createdAt: z.string(),
})

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  type: z.string(),
  status: z.string(),
  description: z.string(),
  reference: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: TransactionUserSchema,
  wallet: TransactionWalletSchema,
  logs: z.array(TransactionLogSchema).optional(),
})

export const TransactionsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(TransactionSchema),
  metadata: UsersMetadataSchema, // Same pagination structure
})

export const TransactionDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: TransactionSchema,
})

// ======================= WITHDRAWAL SCHEMAS ===============================

export const BankAccountSchema = z.object({
  id: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  bankName: z.string(),
  bankCode: z.string().optional(),
})

export const WithdrawalSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']),
  reason: z.string().nullable().optional(),
  adminNotes: z.string().nullable().optional(),
  bankAccount: BankAccountSchema.nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const WithdrawalsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(WithdrawalSchema),
})

export const UpdateWithdrawalStatusSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  reason: z.string().optional(),
  adminNotes: z.string().optional(),
})

// ======================= GENERIC RESPONSE SCHEMAS ===============================

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})

// ======================= TYPE EXPORTS ===============================

export type AdminType = z.infer<typeof AdminSchema>
export type AdminLoginResponseType = z.infer<typeof AdminLoginResponseSchema>
export type DashboardDataType = z.infer<typeof DashboardDataSchema>
export type DashboardResponseType = z.infer<typeof DashboardResponseSchema>
export type UserType = z.infer<typeof UserSchema>
export type WalletType = z.infer<typeof WalletSchema>
export type UsersResponseType = z.infer<typeof UsersResponseSchema>
export type UserDetailResponseType = z.infer<typeof UserDetailResponseSchema>
export type UpdateUserType = z.infer<typeof UpdateUserSchema>
export type UpdateUserStatusType = z.infer<typeof UpdateUserStatusSchema>
export type TransactionType = z.infer<typeof TransactionSchema>
export type TransactionsResponseType = z.infer<typeof TransactionsResponseSchema>
export type TransactionDetailResponseType = z.infer<typeof TransactionDetailResponseSchema>
export type BankAccountType = z.infer<typeof BankAccountSchema>
export type WithdrawalType = z.infer<typeof WithdrawalSchema>
export type WithdrawalsResponseType = z.infer<typeof WithdrawalsResponseSchema>
export type UpdateWithdrawalStatusType = z.infer<typeof UpdateWithdrawalStatusSchema>
export type WithdrawalStatusType = 'pending' | 'approved' | 'rejected' | 'completed'
export type WithdrawalResponseType = WithdrawalType
export type SuccessResponseType = z.infer<typeof SuccessResponseSchema>
