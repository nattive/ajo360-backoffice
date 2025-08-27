# Ajo365 Admin API Implementation

This document provides a comprehensive overview of the admin API implementation for the Ajo365 platform, including all endpoints, hooks, schemas, and usage patterns.

## 📁 File Structure

```
src/
├── api/
│   └── admin-api.ts                    # All admin API endpoints
├── schemas/
│   └── adminSchemas.ts                 # TypeScript schemas for admin data
├── hooks/api-hooks/
│   └── useAdmin.ts                     # React Query hooks for admin operations
├── stores/
│   └── adminStore.ts                   # Admin state management
└── features/admin-dashboard/
    ├── index.tsx                       # Main admin dashboard
    └── components/
        └── withdrawals-management.tsx  # Example management component
```

## 🔐 Admin Authentication

### API Endpoints
- `POST /admin/login/initiate` - Send OTP to admin email
- `POST /admin/login` - Verify OTP and login

### Usage Example
```typescript
import { useInitiateAdminLogin, useVerifyAdminLogin } from '@/hooks/api-hooks/useAdmin'

// Initiate login
const initiateLogin = useInitiateAdminLogin()
initiateLogin.mutate('admin@ajo365.com')

// Verify login
const verifyLogin = useVerifyAdminLogin()
verifyLogin.mutate({ email: 'admin@ajo365.com', otp: '123456' })
```

## 📊 Admin Dashboard

### API Endpoint
- `GET /admin/dashboard` - Get comprehensive dashboard data

### Usage Example
```typescript
import { useGetAdminDashboard } from '@/hooks/api-hooks/useAdmin'

const { data: dashboardData, isLoading, error } = useGetAdminDashboard()
```

### Dashboard Data Structure
```typescript
{
  userStats: {
    totalUsers: number
    activeUsers: number
    newUsers: number
  }
  transactionStats: {
    totalTransactions: number
    totalAmount: number
    pendingTransactions: number
  }
  savingsStats: {
    totalSavings: number
    activeSavings: number
    totalInterest: number
  }
}
```

## 💸 Withdrawal Management

### API Endpoints
- `GET /admin/withdrawals` - Get all withdrawals (with optional status filter)
- `GET /admin/withdrawals/{id}` - Get specific withdrawal details
- `PATCH /admin/withdrawals/{id}/status` - Update withdrawal status

### Usage Example
```typescript
import { useGetAllWithdrawals, useUpdateWithdrawalStatus } from '@/hooks/api-hooks/useAdmin'

// Get all withdrawals
const { data: withdrawals } = useGetAllWithdrawals('pending')

// Update withdrawal status
const updateStatus = useUpdateWithdrawalStatus()
updateStatus.mutate({
  withdrawalId: 'withdrawal-id',
  status: 'approved',
  reason: 'Approved after verification',
  adminNotes: 'All documents verified'
})
```

## 🏦 Savings Management

### API Endpoints
- `POST /savings/admin/trigger-interest-calculation` - Trigger interest calculation
- `POST /savings/admin/trigger-interest-payout` - Trigger interest payout

### Usage Example
```typescript
import { useTriggerInterestCalculation, useTriggerInterestPayout } from '@/hooks/api-hooks/useAdmin'

const triggerCalculation = useTriggerInterestCalculation()
const triggerPayout = useTriggerInterestPayout()

// Trigger interest calculation
triggerCalculation.mutate()

// Trigger interest payout
triggerPayout.mutate()
```

## 📋 Savings Plans Management

### API Endpoints
- `GET /savings-plan` - Get all savings plans
- `GET /savings-plan/active` - Get active savings plans
- `GET /savings-plan/{id}` - Get specific plan details
- `POST /savings-plan` - Create new savings plan
- `PATCH /savings-plan/{id}` - Update savings plan
- `DELETE /savings-plan/{id}` - Delete savings plan

### Usage Example
```typescript
import { 
  useGetAllSavingsPlans, 
  useCreateSavingsPlan, 
  useUpdateSavingsPlan 
} from '@/hooks/api-hooks/useAdmin'

// Get all plans
const { data: plans } = useGetAllSavingsPlans()

// Create new plan
const createPlan = useCreateSavingsPlan()
createPlan.mutate({
  name: 'Premium Savings',
  description: 'High-yield savings plan',
  interestRate: 12.5,
  minimumAmount: 10000,
  maximumAmount: 1000000,
  duration: 12,
  isActive: true
})

// Update plan
const updatePlan = useUpdateSavingsPlan()
updatePlan.mutate({
  planId: 'plan-id',
  planData: { interestRate: 15.0 }
})
```

## 📝 Form Management

### API Endpoints
- `GET /savings-plan/forms/plan/{planId}` - Get plan forms
- `GET /savings-plan/forms/{fieldId}` - Get specific form field
- `POST /savings-plan/forms` - Create form field
- `PATCH /savings-plan/forms/{fieldId}` - Update form field
- `DELETE /savings-plan/forms/{fieldId}` - Delete form field

### Usage Example
```typescript
import { 
  useGetPlanForms, 
  useCreateFormField, 
  useUpdateFormField 
} from '@/hooks/api-hooks/useAdmin'

// Get plan forms
const { data: forms } = useGetPlanForms('plan-id')

// Create form field
const createField = useCreateFormField()
createField.mutate({
  name: 'employment_status',
  label: 'Employment Status',
  type: 'select',
  isRequired: true,
  planId: 'plan-id',
  validation: {
    required: true
  }
})
```

## 🔘 Form Select Options Management

### API Endpoints
- `GET /savings-plan/form-select-options/form/{formId}` - Get form options
- `GET /savings-plan/form-select-options/{optionId}` - Get specific option
- `POST /savings-plan/form-select-options` - Create option
- `POST /savings-plan/form-select-options/batch/{formId}` - Create multiple options
- `PATCH /savings-plan/form-select-options/{optionId}` - Update option
- `DELETE /savings-plan/form-select-options/{optionId}` - Delete option

### Usage Example
```typescript
import { 
  useGetFormOptions, 
  useCreateFormOption, 
  useCreateMultipleFormOptions 
} from '@/hooks/api-hooks/useAdmin'

// Get form options
const { data: options } = useGetFormOptions('form-id')

// Create single option
const createOption = useCreateFormOption()
createOption.mutate({
  value: 'employed',
  label: 'Employed',
  formId: 'form-id'
})

// Create multiple options
const createMultipleOptions = useCreateMultipleFormOptions()
createMultipleOptions.mutate({
  formId: 'form-id',
  options: [
    { value: 'employed', label: 'Employed' },
    { value: 'self_employed', label: 'Self Employed' },
    { value: 'unemployed', label: 'Unemployed' }
  ]
})
```

## ⚙️ Configuration Management

### API Endpoints
- `GET /savings-plan/configs` - Get all configurations
- `GET /savings-plan/configs/{configId}` - Get specific configuration
- `POST /savings-plan/configs` - Create configuration
- `PATCH /savings-plan/configs/{configId}` - Update configuration
- `DELETE /savings-plan/configs/{configId}` - Delete configuration

### Usage Example
```typescript
import { 
  useGetAllConfigurations, 
  useCreateConfiguration, 
  useUpdateConfiguration 
} from '@/hooks/api-hooks/useAdmin'

// Get configurations
const { data: configs } = useGetAllConfigurations()

// Create configuration
const createConfig = useCreateConfiguration()
createConfig.mutate({
  name: 'Interest Calculation',
  description: 'Settings for interest calculation',
  settings: {
    calculationFrequency: 'monthly',
    compounding: true,
    minimumBalance: 1000
  },
  isActive: true
})
```

## 🏷️ Attributes Management

### API Endpoints
- `GET /savings-plan/attributes` - Get all attributes
- `GET /savings-plan/attributes/{attributeId}` - Get specific attribute
- `POST /savings-plan/attributes` - Create attribute
- `PATCH /savings-plan/attributes/{attributeId}` - Update attribute
- `DELETE /savings-plan/attributes/{attributeId}` - Delete attribute

### Usage Example
```typescript
import { 
  useGetAllAttributes, 
  useCreateAttribute, 
  useUpdateAttribute 
} from '@/hooks/api-hooks/useAdmin'

// Get attributes
const { data: attributes } = useGetAllAttributes()

// Create attribute
const createAttribute = useCreateAttribute()
createAttribute.mutate({
  name: 'risk_level',
  label: 'Risk Level',
  type: 'string',
  values: ['low', 'medium', 'high'],
  isRequired: true,
  isActive: true
})
```

## 📋 User Form Responses Management

### API Endpoints
- `GET /user-form-responses` - Get all form responses
- `GET /user-form-responses/{responseId}` - Get specific response
- `POST /user-form-responses` - Create response
- `PATCH /user-form-responses/{responseId}` - Update response
- `DELETE /user-form-responses/{responseId}` - Delete response

### Usage Example
```typescript
import { 
  useGetAllUserFormResponses, 
  useCreateUserFormResponse, 
  useUpdateUserFormResponse 
} from '@/hooks/api-hooks/useAdmin'

// Get form responses
const { data: responses } = useGetAllUserFormResponses()

// Create response
const createResponse = useCreateUserFormResponse()
createResponse.mutate({
  userId: 'user-id',
  formId: 'form-id',
  responses: {
    employment_status: 'employed',
    monthly_income: 500000,
    savings_goal: 1000000
  }
})
```

## 🔐 Admin State Management

### Admin Store Features
- Admin user data persistence
- Permission-based access control
- Role-based functionality
- Automatic state synchronization

### Usage Example
```typescript
import { useAdmin, ADMIN_PERMISSIONS } from '@/stores/adminStore'

const { 
  admin, 
  isAdmin, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions 
} = useAdmin()

// Check permissions
if (hasPermission(ADMIN_PERMISSIONS.APPROVE_WITHDRAWALS)) {
  // Show withdrawal approval UI
}

if (hasAnyPermission([
  ADMIN_PERMISSIONS.VIEW_SAVINGS_PLANS,
  ADMIN_PERMISSIONS.CREATE_SAVINGS_PLANS
])) {
  // Show savings plan management UI
}
```

## 🛡️ Permission System

### Available Permissions
```typescript
ADMIN_PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Withdrawals
  VIEW_WITHDRAWALS: 'view_withdrawals',
  APPROVE_WITHDRAWALS: 'approve_withdrawals',
  REJECT_WITHDRAWALS: 'reject_withdrawals',
  
  // Savings
  VIEW_SAVINGS: 'view_savings',
  MANAGE_SAVINGS: 'manage_savings',
  TRIGGER_INTEREST_CALCULATION: 'trigger_interest_calculation',
  TRIGGER_INTEREST_PAYOUT: 'trigger_interest_payout',
  
  // Savings Plans
  VIEW_SAVINGS_PLANS: 'view_savings_plans',
  CREATE_SAVINGS_PLANS: 'create_savings_plans',
  UPDATE_SAVINGS_PLANS: 'update_savings_plans',
  DELETE_SAVINGS_PLANS: 'delete_savings_plans',
  
  // Forms
  VIEW_FORMS: 'view_forms',
  CREATE_FORMS: 'create_forms',
  UPDATE_FORMS: 'update_forms',
  DELETE_FORMS: 'delete_forms',
  
  // Configurations
  VIEW_CONFIGURATIONS: 'view_configurations',
  CREATE_CONFIGURATIONS: 'create_configurations',
  UPDATE_CONFIGURATIONS: 'update_configurations',
  DELETE_CONFIGURATIONS: 'delete_configurations',
  
  // Attributes
  VIEW_ATTRIBUTES: 'view_attributes',
  CREATE_ATTRIBUTES: 'create_attributes',
  UPDATE_ATTRIBUTES: 'update_attributes',
  DELETE_ATTRIBUTES: 'delete_attributes',
  
  // User Form Responses
  VIEW_USER_FORM_RESPONSES: 'view_user_form_responses',
  CREATE_USER_FORM_RESPONSES: 'create_user_form_responses',
  UPDATE_USER_FORM_RESPONSES: 'update_user_form_responses',
  DELETE_USER_FORM_RESPONSES: 'delete_user_form_responses',
  
  // Super Admin
  SUPER_ADMIN: 'super_admin',
}
```

## 🎯 Best Practices

### 1. Error Handling
All hooks include proper error handling with toast notifications:
```typescript
const mutation = useCreateSavingsPlan()
// Errors are automatically handled and displayed to users
```

### 2. Loading States
All queries and mutations provide loading states:
```typescript
const { data, isLoading, error } = useGetAllWithdrawals()
const mutation = useUpdateWithdrawalStatus()

if (isLoading) return <LoadingSpinner />
if (mutation.isPending) return <ProcessingSpinner />
```

### 3. Data Invalidation
Mutations automatically invalidate related queries:
```typescript
// After creating a savings plan, all savings plans queries are refreshed
const createPlan = useCreateSavingsPlan()
createPlan.mutate(planData) // Automatically refreshes useGetAllSavingsPlans
```

### 4. Type Safety
All API calls are fully typed with Zod schemas:
```typescript
// TypeScript will catch errors at compile time
const createPlan = useCreateSavingsPlan()
createPlan.mutate({
  name: 'Plan Name', // ✅ Valid
  interestRate: 'invalid', // ❌ Type error
})
```

## 🚀 Getting Started

1. **Import the hooks**:
```typescript
import { useGetAdminDashboard, useGetAllWithdrawals } from '@/hooks/api-hooks/useAdmin'
```

2. **Use in components**:
```typescript
function AdminComponent() {
  const { data: dashboardData } = useGetAdminDashboard()
  const { data: withdrawals } = useGetAllWithdrawals()
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Use the data */}
    </div>
  )
}
```

3. **Check permissions**:
```typescript
import { useAdmin, ADMIN_PERMISSIONS } from '@/stores/adminStore'

function ProtectedComponent() {
  const { hasPermission } = useAdmin()
  
  if (!hasPermission(ADMIN_PERMISSIONS.VIEW_WITHDRAWALS)) {
    return <AccessDenied />
  }
  
  return <WithdrawalsManagement />
}
```

## 📝 Notes

- All admin endpoints require proper authentication
- Admin tokens are automatically managed by the axios interceptor
- Failed requests are automatically retried with token refresh
- All mutations include optimistic updates and proper error handling
- The admin store persists data across browser sessions
- Permission checks are enforced at the component level

This implementation provides a complete, type-safe, and user-friendly admin interface for managing all aspects of the Ajo365 platform. 