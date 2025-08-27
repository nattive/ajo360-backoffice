import { z } from 'zod'

// ======================= ADMIN AUTHENTICATION SCHEMAS ===============================

export const AdminLoginInitiateSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const AdminLoginVerifySchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export type AdminLoginInitiateType = z.infer<typeof AdminLoginInitiateSchema>
export type AdminLoginVerifyType = z.infer<typeof AdminLoginVerifySchema>

// ======================= ADMIN DASHBOARD SCHEMAS ===============================

export const AdminDashboardParamsSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type AdminDashboardParamsType = z.infer<
  typeof AdminDashboardParamsSchema
>

// ======================= ADMIN WITHDRAWAL SCHEMAS ===============================

export const WithdrawalStatusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
  'completed',
])

export const WithdrawalUpdateSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  reason: z.string().optional(),
  adminNotes: z.string().optional(),
})

export type WithdrawalStatusType = z.infer<typeof WithdrawalStatusSchema>
export type WithdrawalUpdateType = z.infer<typeof WithdrawalUpdateSchema>

// ======================= ADMIN SAVINGS MANAGEMENT SCHEMAS ===============================

export const InterestCalculationTriggerSchema = z.object({
  forceRecalculation: z.boolean().optional(),
  planIds: z.array(z.string()).optional(),
})

export const InterestPayoutTriggerSchema = z.object({
  payoutDate: z.string().optional(),
  planIds: z.array(z.string()).optional(),
  dryRun: z.boolean().optional(),
})

// ======================= ADMIN SAVINGS PLAN SCHEMAS ===============================

export const SavingsPlanCreateSchema = z.object({
  name: z.string().min(1, 'Plan name is required'),
  description: z.string().optional(),
  interestRate: z.number().min(0, 'Interest rate must be positive'),
  minimumAmount: z.number().min(0, 'Minimum amount must be positive'),
  maximumAmount: z.number().min(0, 'Maximum amount must be positive'),
  duration: z.number().min(1, 'Duration must be at least 1'),
  durationUnit: z.string().optional(),
  isActive: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  terms: z.string().optional(),
  eligibilityCriteria: z
    .object({
      minimumAge: z.number().optional(),
      kycRequired: z.boolean().optional(),
      bvnRequired: z.boolean().optional(),
    })
    .optional(),
})

export const SavingsPlanUpdateSchema = SavingsPlanCreateSchema.partial()

export type InterestCalculationTriggerType = z.infer<
  typeof InterestCalculationTriggerSchema
>
export type InterestPayoutTriggerType = z.infer<
  typeof InterestPayoutTriggerSchema
>
export type SavingsPlanCreateType = z.infer<typeof SavingsPlanCreateSchema>
export type SavingsPlanUpdateType = z.infer<typeof SavingsPlanUpdateSchema>

// ======================= ADMIN FORM FIELD SCHEMAS ===============================

export const FormFieldTypeSchema = z.enum([
  'text',
  'number',
  'select',
  'date',
  'email',
  'phone',
  'textarea',
])

export const FormFieldValidationSchema = z.object({
  required: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
})

export const FormFieldCreateSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  fieldName: z.string().min(1, 'Field name is required'),
  fieldLabel: z.string().min(1, 'Field label is required'),
  fieldType: FormFieldTypeSchema,
  isRequired: z.boolean().optional(),
  displayOrder: z.number().optional(),
  validationRules: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(),
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  options: z.array(z.string()).optional(),
  placeholder: z.string().optional(),
})

export const FormFieldUpdateSchema = FormFieldCreateSchema.partial()

export type FormFieldType = z.infer<typeof FormFieldTypeSchema>
export type FormFieldValidationType = z.infer<typeof FormFieldValidationSchema>
export type FormFieldCreateType = z.infer<typeof FormFieldCreateSchema>
export type FormFieldUpdateType = z.infer<typeof FormFieldUpdateSchema>

// ======================= ADMIN FORM SELECT OPTIONS SCHEMAS ===============================

export const FormOptionCreateSchema = z.object({
  formId: z.string().min(1, 'Form ID is required'),
  value: z.string().min(1, 'Option value is required'),
  label: z.string().min(1, 'Option label is required'),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
})

export const FormOptionUpdateSchema = FormOptionCreateSchema.partial()

export const FormOptionsBatchCreateSchema = z.object({
  options: z.array(FormOptionCreateSchema),
})

export type FormOptionCreateType = z.infer<typeof FormOptionCreateSchema>
export type FormOptionUpdateType = z.infer<typeof FormOptionUpdateSchema>
export type FormOptionsBatchCreateType = z.infer<
  typeof FormOptionsBatchCreateSchema
>

// ======================= ADMIN CONFIGURATION SCHEMAS ===============================

export const ConfigurationCreateSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  configName: z.string().min(1, 'Configuration name is required'),
  configType: z.string().min(1, 'Configuration type is required'),
  settings: z
    .object({
      calculationFrequency: z.string().optional(),
      compoundingType: z.string().optional(),
      minimumBalanceForInterest: z.number().optional(),
      interestPayoutFrequency: z.string().optional(),
      earlyWithdrawalPenalty: z.number().optional(),
      maintenanceFee: z.number().optional(),
      transactionFee: z.number().optional(),
    })
    .optional(),
  isActive: z.boolean().optional(),
  effectiveDate: z.string().optional(),
  expiryDate: z.string().optional(),
})

export const ConfigurationUpdateSchema = ConfigurationCreateSchema.partial()

export type ConfigurationCreateType = z.infer<typeof ConfigurationCreateSchema>
export type ConfigurationUpdateType = z.infer<typeof ConfigurationUpdateSchema>

// ======================= ADMIN ATTRIBUTES SCHEMAS ===============================

export const AttributeTypeSchema = z.enum([
  'string',
  'number',
  'boolean',
  'array',
])

export const AttributeCreateSchema = z.object({
  name: z.string().min(1, 'Attribute name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  type: AttributeTypeSchema,
  description: z.string().optional(),
  possibleValues: z.array(z.string()).optional(),
  isRequired: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export const AttributeUpdateSchema = AttributeCreateSchema.partial()

export type AttributeType = z.infer<typeof AttributeTypeSchema>
export type AttributeCreateType = z.infer<typeof AttributeCreateSchema>
export type AttributeUpdateType = z.infer<typeof AttributeUpdateSchema>

// ======================= ADMIN USER FORM RESPONSE SCHEMAS ===============================

export const UserFormResponseCreateSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  formId: z.string().min(1, 'Form ID is required'),
  responses: z.record(z.unknown()),
  submittedAt: z.string().optional(),
})

export const UserFormResponseUpdateSchema =
  UserFormResponseCreateSchema.partial()

export type UserFormResponseCreateType = z.infer<
  typeof UserFormResponseCreateSchema
>
export type UserFormResponseUpdateType = z.infer<
  typeof UserFormResponseUpdateSchema
>

// ======================= RESPONSE SCHEMAS ===============================

export const AdminLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  admin: z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    otherName: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    profilePicture: z.string().nullable(),
    lastLoginAt: z.string(),
    permissions: z.array(z.string()),
  }),
})

export const DashboardResponseSchema = z.object({
  userStats: z.object({
    totalUsers: z.number(),
    activeUsers: z.number(),
    newUsers: z.number(),
  }),
  transactionStats: z.object({
    totalTransactions: z.number(),
    totalAmount: z.number(),
    pendingTransactions: z.number(),
  }),
  savingsStats: z.object({
    totalSavings: z.number(),
    activeSavings: z.number(),
    totalInterest: z.number(),
  }),
})

export const WithdrawalResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  status: WithdrawalStatusSchema,
  bankAccount: z.object({
    accountNumber: z.string(),
    accountName: z.string(),
    bankName: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  reason: z.string().optional(),
  adminNotes: z.string().optional(),
})

export type AdminLoginResponseType = z.infer<typeof AdminLoginResponseSchema>
export type DashboardResponseType = z.infer<typeof DashboardResponseSchema>
export type WithdrawalResponseType = z.infer<typeof WithdrawalResponseSchema>
