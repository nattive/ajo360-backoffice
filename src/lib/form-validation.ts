import { z } from 'zod'
import { toast } from 'sonner'

// Common validation schemas
export const commonValidations = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  required: (fieldName: string) => z.string().min(1, `${fieldName} is required`),
  optionalString: z.string().optional(),
  positiveNumber: z.number().positive('Must be a positive number'),
  nonNegativeNumber: z.number().min(0, 'Must be zero or positive'),
  currency: z.number().min(0, 'Amount must be zero or positive').max(999999999, 'Amount is too large'),
}

// Form validation utilities
export class FormValidator {
  static validateField<T>(schema: z.ZodSchema<T>, value: unknown): { isValid: boolean; error?: string } {
    try {
      schema.parse(value)
      return { isValid: true }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          error: error.errors[0]?.message || 'Validation failed'
        }
      }
      return {
        isValid: false,
        error: 'Validation failed'
      }
    }
  }

  static validateForm<T>(schema: z.ZodSchema<T>, data: unknown): { isValid: boolean; errors?: Record<string, string>; data?: T } {
    try {
      const validatedData = schema.parse(data)
      return { isValid: true, data: validatedData }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          errors[path] = err.message
        })
        return { isValid: false, errors }
      }
      return {
        isValid: false,
        errors: { general: 'Validation failed' }
      }
    }
  }

  static showValidationErrors(errors: Record<string, string>) {
    Object.entries(errors).forEach(([field, message]) => {
      toast.error(`${field}: ${message}`)
    })
  }
}

// Custom validation rules
export const customValidations = {
  // Nigerian phone number validation
  nigerianPhone: z.string().regex(
    /^(\+234|234|0)?[789][01]\d{8}$/,
    'Please enter a valid Nigerian phone number'
  ),
  
  // BVN validation
  bvn: z.string().regex(
    /^\d{11}$/,
    'BVN must be exactly 11 digits'
  ),
  
  // Account number validation
  accountNumber: z.string().regex(
    /^\d{10}$/,
    'Account number must be exactly 10 digits'
  ),
  
  // Strong password validation
  strongPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[^\w\s]/, 'Password must contain at least one special character'),
  
  // Date validations
  pastDate: z.string().refine(
    (date) => new Date(date) < new Date(),
    'Date must be in the past'
  ),
  
  futureDate: z.string().refine(
    (date) => new Date(date) > new Date(),
    'Date must be in the future'
  ),
  
  // Age validation (18+)
  adultAge: z.string().refine(
    (dateOfBirth) => {
      const today = new Date()
      const birthDate = new Date(dateOfBirth)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18
      }
      return age >= 18
    },
    'Must be at least 18 years old'
  )
}

// Form state management utilities
export interface FormState<T> {
  data: T
  errors: Record<string, string>
  isValid: boolean
  isSubmitting: boolean
  isDirty: boolean
}

export const createInitialFormState = <T>(initialData: T): FormState<T> => ({
  data: initialData,
  errors: {},
  isValid: false,
  isSubmitting: false,
  isDirty: false
})

// Validation helpers for React Hook Form
export const createZodResolver = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown) => {
    const result = FormValidator.validateForm(schema, data)
    if (result.isValid) {
      return { values: result.data, errors: {} }
    }
    return { values: {}, errors: result.errors || {} }
  }
}