'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersPNDDialog({ open, onOpenChange, currentRow }: Props) {
  const [reason, setReason] = useState('')
  const [username, setUsername] = useState('')

  const handlePND = () => {
    if (username.trim() !== currentRow.email) return

    onOpenChange(false)
    showSubmittedData(
      {
        ...currentRow,
        reason,
        username,
      },
      'The following user has been placed on PND:'
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handlePND}
      disabled={username.trim() !== currentRow.email || !reason.trim()}
      title={
        <span className='text-yellow-600'>
          <IconAlertTriangle className='stroke-yellow-600 mr-1 inline-block' size={18} /> Put User on PND
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p>
            Are you sure you want to place{' '}
            <span className='font-bold'>{currentRow.email}</span> on PND (Post No Debit)? This will prevent them from making debits from their account.
          </p>

          <Label>
            Reason:
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for action."
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              This will block all debit transactions for the user until further notice.
            </AlertDescription>
          </Alert>

          <Label>
            Username:
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username to confirm.'
            />
          </Label>
        </div>
      }
      confirmText='Place on PND'
    />
  )
}
