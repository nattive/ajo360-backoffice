import { UserType } from '@/schemas/adminSchemas'

// Re-export the admin user type for consistency
export type User = UserType

// For backward compatibility, create a schema that matches the admin API
export const userSchema = {
  // This is now just a placeholder since we're using the admin schema
}

export const userListSchema = {
  // This is now just a placeholder since we're using the admin schema
}
