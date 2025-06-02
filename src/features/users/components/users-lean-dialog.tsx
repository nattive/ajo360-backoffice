'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersLeanDialog({ open, onOpenChange, currentRow }: Props) {
  const [reason, setReason] = useState('')
  const [amount, setAmount] = useState('')
  const [username, setUsername] = useState('')

  const handleLean = () => {
    if (username.trim() !== currentRow.email) return

    onOpenChange(false)
    showSubmittedData(
      {
        ...currentRow,
        reason,
        amount,
        username,
      },
      'The following user has been placed on LEAN:'
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleLean}
      disabled={username.trim() !== currentRow.email || !reason.trim() || !amount.trim()}
      title={
        <span className='text-orange-700'>
          <IconAlertTriangle className='stroke-orange-700 mr-1 inline-block' size={18} /> Put User on LEAN
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p>
            Are you sure you want to place{' '}
            <span className='font-bold'>{currentRow.email}</span> on LEAN?
            This may affect their account availability.
          </p>

          <Label>
            Reason:
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for action."
            />
          </Label>

          <Label>
            Amount:
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount."
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Heads Up!</AlertTitle>
            <AlertDescription>
              Placing a user on LEAN restricts account access in compliance with regulations.
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
      confirmText='Place on Lean'
    />
  )
}
