'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useUpdateUserStatus } from '@/hooks/api-hooks/useAdmin'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersFreezeDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const updateUserStatus = useUpdateUserStatus()

  const handleFreeze = () => {
    if (value.trim() !== currentRow.email) return

    updateUserStatus.mutate({
      userId: currentRow.id,
      statusData: {
        status: 'suspended',
        reason: 'User account frozen by admin'
      }
    })
    onOpenChange(false)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleFreeze}
      disabled={value.trim() !== currentRow.email}
      title={
        <span className='text-warning'>
          <IconAlertTriangle className='stroke-warning mr-1 inline-block' size={18} /> Freeze User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p>
            Are you sure you want to freeze{' '}
            <span className='font-bold'>{currentRow.email}</span>?
            This will temporarily disable the user's account access.
          </p>

          <Alert variant='destructive'>
            <AlertTitle>Caution!</AlertTitle>
            <AlertDescription>
              Freezing a user will prevent them from accessing their account until reactivated.
            </AlertDescription>
          </Alert>

          <Label>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter your username to confirm.'
            />
          </Label>
        </div>
      }
      confirmText='Freeze'
    />
  )
}
