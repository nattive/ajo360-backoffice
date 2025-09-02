import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, CheckCircle, XCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'
import { Link } from '@tanstack/react-router'

export interface WithdrawalRequest {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  reason: string
  processorReference: string
}

export const columns: ColumnDef<WithdrawalRequest>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'userName',
    header: 'User',
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.getValue('userName')}</span>
        <span className='text-sm text-muted-foreground'>{row.original.userEmail}</span>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span className='font-mono font-medium'>
        {formatCurrency(row.getValue('amount'))}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <Badge
          variant={
            status === 'approved'
              ? 'default'
              : status === 'rejected'
              ? 'destructive'
              : 'secondary'
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <span className='text-sm'>
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      const reason = row.getValue('reason') as string
      return reason ? (
        <span className='text-sm'>{reason}</span>
      ) : (
        <span className='text-sm text-muted-foreground'>-</span>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const withdrawal = row.original
      
      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            asChild
          >
            <Link to='/users/$userId' params={{ userId: withdrawal.userId }}>
              <Eye className='h-4 w-4' />
            </Link>
          </Button>
          
          {withdrawal.status === 'pending' && (
            <>
              <Button
                variant='ghost'
                size='sm'
                className='text-green-600 hover:text-green-700'
                onClick={() => {
                  // TODO: Approve single withdrawal
                }}
              >
                <CheckCircle className='h-4 w-4' />
              </Button>
              
              <Button
                variant='ghost'
                size='sm'
                className='text-red-600 hover:text-red-700'
                onClick={() => {
                  // TODO: Reject single withdrawal
                }}
              >
                <XCircle className='h-4 w-4' />
              </Button>
            </>
          )}
        </div>
      )
    },
  },
]