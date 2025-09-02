import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUpdateUserStatus } from '@/hooks/api-hooks/useAdmin'
import { UserType } from '@/schemas/adminSchemas'

// Extended user type that includes status from API response
type UserWithStatus = UserType & {
  status?: string
}
import { toast } from 'sonner'
import { AlertTriangleIcon, CheckCircleIcon, Loader2Icon } from 'lucide-react'

const statusUpdateSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
})

type StatusUpdateFormData = z.infer<typeof statusUpdateSchema>

interface UserStatusDialogProps {
  user: UserWithStatus
  open: boolean
  onOpenChange: (open: boolean) => void
  action: 'suspend' | 'activate'
  onSuccess?: () => void
}

export function UserStatusDialog({
  user,
  open,
  onOpenChange,
  action,
  onSuccess,
}: UserStatusDialogProps) {
  const updateUserStatusMutation = useUpdateUserStatus()
  
  const form = useForm<StatusUpdateFormData>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: {
      reason: '',
    },
  })

  const onSubmit = async (data: StatusUpdateFormData) => {
    try {
      await updateUserStatusMutation.mutateAsync({
        userId: user.id,
        statusData: {
          status: action === 'suspend' ? 'suspended' : 'active',
          reason: data.reason,
        },
      })
      
      toast.success(
        `User ${action === 'suspend' ? 'suspended' : 'activated'} successfully`
      )
      onOpenChange(false)
      form.reset()
      onSuccess?.()
    } catch (_error) {
      toast.error(`Failed to ${action} user`)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    form.reset()
  }

  const isSuspending = action === 'suspend'
  const currentStatus = user.status?.toLowerCase()
  
  // Don't show dialog if trying to suspend already suspended user or activate already active user
  if ((isSuspending && currentStatus === 'suspended') || 
      (!isSuspending && currentStatus === 'active')) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isSuspending ? (
              <>
                <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                Suspend User
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                Activate User
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isSuspending
              ? `Are you sure you want to suspend ${user.firstName} ${user.lastName}? This will prevent them from accessing their account.`
              : `Are you sure you want to activate ${user.firstName} ${user.lastName}? This will restore their account access.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Alert variant={isSuspending ? 'destructive' : 'default'}>
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                {isSuspending
                  ? 'Suspending this user will immediately revoke their access to the platform and all associated services.'
                  : 'Activating this user will restore their full access to the platform and all associated services.'}
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Enter reason for ${action}ing this user...`}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updateUserStatusMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={isSuspending ? 'destructive' : 'default'}
                disabled={updateUserStatusMutation.isPending}
              >
                {updateUserStatusMutation.isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSuspending ? 'Suspend User' : 'Activate User'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}