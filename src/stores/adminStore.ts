import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  otherName: string | null
  phoneNumber: string | null
  profilePicture: string | null
  lastLoginAt: string
  permissions: string[]
}

interface AdminState {
  admin: AdminUser | null
  isAdmin: boolean
  permissions: string[]
  setAdmin: (admin: AdminUser | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setPermissions: (permissions: string[]) => void
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
  reset: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      admin: null,
      isAdmin: false,
      permissions: [],
      setAdmin: (admin) =>
        set((state) => ({
          ...state,
          admin,
          isAdmin: !!admin,
          permissions: admin?.permissions || [],
        })),
      setIsAdmin: (isAdmin) =>
        set((state) => ({
          ...state,
          isAdmin,
        })),
      setPermissions: (permissions) =>
        set((state) => ({
          ...state,
          permissions,
        })),
      hasPermission: (permission) => {
        const { permissions } = get()
        return permissions.includes(permission)
      },
      hasAnyPermission: (permissions) => {
        const { permissions: userPermissions } = get()
        return permissions.some((permission) =>
          userPermissions.includes(permission)
        )
      },
      hasAllPermissions: (permissions) => {
        const { permissions: userPermissions } = get()
        return permissions.every((permission) =>
          userPermissions.includes(permission)
        )
      },
      reset: () =>
        set({
          admin: null,
          isAdmin: false,
          permissions: [],
        }),
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        admin: state.admin,
        isAdmin: state.isAdmin,
        permissions: state.permissions,
      }),
    }
  )
)

export const useAdmin = () => useAdminStore((state) => state)
export const getAdmin = () => useAdminStore.getState()

// Permission constants
export const ADMIN_PERMISSIONS = {
  // Dashboard permissions
  VIEW_DASHBOARD: 'view_dashboard',

  // Withdrawal permissions
  VIEW_WITHDRAWALS: 'view_withdrawals',
  APPROVE_WITHDRAWALS: 'approve_withdrawals',
  REJECT_WITHDRAWALS: 'reject_withdrawals',

  // Savings permissions
  VIEW_SAVINGS: 'view_savings',
  MANAGE_SAVINGS: 'manage_savings',
  TRIGGER_INTEREST_CALCULATION: 'trigger_interest_calculation',
  TRIGGER_INTEREST_PAYOUT: 'trigger_interest_payout',

  // Savings plan permissions
  VIEW_SAVINGS_PLANS: 'view_savings_plans',
  CREATE_SAVINGS_PLANS: 'create_savings_plans',
  UPDATE_SAVINGS_PLANS: 'update_savings_plans',
  DELETE_SAVINGS_PLANS: 'delete_savings_plans',

  // Form permissions
  VIEW_FORMS: 'view_forms',
  CREATE_FORMS: 'create_forms',
  UPDATE_FORMS: 'update_forms',
  DELETE_FORMS: 'delete_forms',

  // Configuration permissions
  VIEW_CONFIGURATIONS: 'view_configurations',
  CREATE_CONFIGURATIONS: 'create_configurations',
  UPDATE_CONFIGURATIONS: 'update_configurations',
  DELETE_CONFIGURATIONS: 'delete_configurations',

  // Attribute permissions
  VIEW_ATTRIBUTES: 'view_attributes',
  CREATE_ATTRIBUTES: 'create_attributes',
  UPDATE_ATTRIBUTES: 'update_attributes',
  DELETE_ATTRIBUTES: 'delete_attributes',

  // User form response permissions
  VIEW_USER_FORM_RESPONSES: 'view_user_form_responses',
  CREATE_USER_FORM_RESPONSES: 'create_user_form_responses',
  UPDATE_USER_FORM_RESPONSES: 'update_user_form_responses',
  DELETE_USER_FORM_RESPONSES: 'delete_user_form_responses',

  // Super admin permissions
  SUPER_ADMIN: 'super_admin',
} as const

export type AdminPermission =
  (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS]
