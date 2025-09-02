import { useState } from 'react'
import {
  WithdrawalStatusType,
  WithdrawalResponseType,
} from '@/schemas/adminSchemas'
import {
  useGetAllWithdrawals,
  useUpdateWithdrawalStatus,
} from '@/hooks/api-hooks/useAdmin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LoadingButton, LoadingWrapper } from '@/components/ui/loading-spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrency } from '@/lib/currency'

export function WithdrawalsManagement() {
  const [statusFilter, setStatusFilter] = useState<
    WithdrawalStatusType | undefined
  >()
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<WithdrawalResponseType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [action, setAction] = useState<'approve' | 'reject'>('approve')
  const [reason, setReason] = useState('')
  const [adminNotes, setAdminNotes] = useState('')

  const { data: withdrawals, isLoading } = useGetAllWithdrawals(statusFilter)
  const updateWithdrawalMutation = useUpdateWithdrawalStatus()

  const handleStatusUpdate = async () => {
    if (!selectedWithdrawal) return

    try {
      await updateWithdrawalMutation.mutateAsync({
        withdrawalId: selectedWithdrawal.id,
        status: action === 'approve' ? 'approved' : 'rejected',
        reason: reason || undefined,
        adminNotes: adminNotes || undefined,
      })

      setIsDialogOpen(false)
      setReason('')
      setAdminNotes('')
      setSelectedWithdrawal(null)
    } catch (_error) {
      // Error handled by toast
    }
  }

  const getStatusBadgeVariant = (status: WithdrawalStatusType) => {
    switch (status) {
      case 'pending':
        return 'secondary'
      case 'approved':
        return 'default'
      case 'rejected':
        return 'destructive'
      case 'completed':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const filteredWithdrawals =
    withdrawals?.filter(
      (withdrawal: WithdrawalResponseType) =>
        !statusFilter || withdrawal.status === statusFilter
    ) || []

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Withdrawals Management
          </h2>
          <p className='text-muted-foreground'>
            Review and manage withdrawal requests from users
          </p>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as WithdrawalStatusType)
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=''>All Statuses</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='approved'>Approved</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
            <SelectItem value='completed'>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LoadingWrapper 
        isLoading={isLoading}
        fallback={<div className="text-center py-8">Loading withdrawals...</div>}
      >
        <div className='grid gap-4'>
          {filteredWithdrawals.length === 0 ? (
            <Card>
              <CardContent className='flex h-32 items-center justify-center'>
                <p className='text-muted-foreground'>No withdrawals found</p>
              </CardContent>
            </Card>
          ) : (
            filteredWithdrawals.map((withdrawal: WithdrawalResponseType) => (
              <Card key={withdrawal.id}>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div>
                      <CardTitle className='text-lg'>
                        Withdrawal #{withdrawal.id.slice(-8)}
                      </CardTitle>
                      <CardDescription>
                        User ID: {withdrawal.userId} •{' '}
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(withdrawal.status)}>
                      {withdrawal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div>
                      <h4 className='mb-2 font-medium'>Amount</h4>
                      <p className='text-2xl font-bold'>
                        {formatCurrency(withdrawal.amount)}
                      </p>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium'>Bank Details</h4>
                      <p className='text-sm'>
                        {withdrawal.bankAccount?.bankName} -{' '}
                        {withdrawal.bankAccount?.accountNumber}
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        {withdrawal.bankAccount?.accountName}
                      </p>
                    </div>
                  </div>

                  {withdrawal.reason && (
                    <div className='mt-4'>
                      <h4 className='mb-2 font-medium'>Reason</h4>
                      <p className='text-muted-foreground text-sm'>
                        {withdrawal.reason}
                      </p>
                    </div>
                  )}

                  {withdrawal.adminNotes && (
                    <div className='mt-4'>
                      <h4 className='mb-2 font-medium'>Admin Notes</h4>
                      <p className='text-muted-foreground text-sm'>
                        {withdrawal.adminNotes}
                      </p>
                    </div>
                  )}

                  {withdrawal.status === 'pending' && (
                    <div className='mt-4 flex gap-2'>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='default'
                            size='sm'
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal)
                              setAction('approve')
                            }}
                          >
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Approve Withdrawal</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to approve this withdrawal
                              request?
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-4'>
                            <div>
                              <label className='text-sm font-medium'>
                                Admin Notes (Optional)
                              </label>
                              <Textarea
                                placeholder='Add any notes about this approval...'
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant='outline'
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <LoadingButton
                              onClick={handleStatusUpdate}
                              isLoading={updateWithdrawalMutation.isPending}
                              loadingText='Approving...'
                            >
                              Approve
                            </LoadingButton>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal)
                              setAction('reject')
                            }}
                          >
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Withdrawal</DialogTitle>
                            <DialogDescription>
                              Please provide a reason for rejecting this
                              withdrawal request.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='space-y-4'>
                            <div>
                              <label className='text-sm font-medium'>
                                Reason *
                              </label>
                              <Textarea
                                placeholder='Reason for rejection...'
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className='text-sm font-medium'>
                                Admin Notes (Optional)
                              </label>
                              <Textarea
                                placeholder='Add any additional notes...'
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant='outline'
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <LoadingButton
                              onClick={handleStatusUpdate}
                              isLoading={updateWithdrawalMutation.isPending}
                              disabled={!reason.trim()}
                              loadingText='Rejecting...'
                            >
                              Reject
                            </LoadingButton>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </LoadingWrapper>
    </div>
  )
}
