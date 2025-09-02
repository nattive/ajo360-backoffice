import { format } from 'date-fns'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return format(date, formatStr)
}
import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { User } from '../data/schema'

// Extended type to include status property that's available in API responses
type UserWithStatus = User & { status?: 'active' | 'suspended' }
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { EmailCell } from './email-cell'

export const columns: ColumnDef<User>[] = [
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
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: 'w-12',
    },
  },
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('firstName')}</div>
    ),
    meta: {
      className: 'min-w-[120px]',
    },
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('lastName')}</div>,
    meta: {
      className: 'min-w-[120px] hidden sm:table-cell',
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <EmailCell user={row.original} />,
    meta: {
      className: 'min-w-[200px]',
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phone Number' />
    ),
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    meta: {
      className: 'min-w-[140px] hidden md:table-cell',
    },
  },
  {
    id: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const userWithStatus = row.original as UserWithStatus
      const status = userWithStatus.status || 'active'
      const isActive = status.toLowerCase() === 'active'
      return (
        <Badge
          variant={isActive ? 'default' : 'destructive'}
          className={cn(
            isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
    filterFn: (row, _id, value) => {
      const userWithStatus = row.original as UserWithStatus
      const status = userWithStatus.status || 'active'
      return value.includes(status.toLowerCase())
    },
    meta: {
      className: 'min-w-[100px] hidden md:table-cell',
    },
  },
  {
    id: 'emailVerified',
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email Verified' />
    ),
    cell: ({ row }) => {
      const emailVerified = row.original.emailVerified
      return (
        <Badge
          variant={emailVerified ? 'default' : 'secondary'}
          className={cn(
            emailVerified
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-red-100 text-red-800 hover:bg-red-200'
          )}
        >
          {emailVerified ? 'Verified' : 'Not Verified'}
        </Badge>
      )
    },
    filterFn: (row, _id, value) => {
      const emailVerified = row.original.emailVerified
      const verifiedString = emailVerified ? 'true' : 'false'
      return value.includes(verifiedString)
    },
    meta: {
      className: 'min-w-[120px] hidden lg:table-cell',
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      return formatSafeDate(row.getValue('createdAt') as string)
    },
    meta: {
      className: 'min-w-[120px] hidden xl:table-cell',
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Updated At' />
    ),
    cell: ({ row }) => {
      return formatSafeDate(row.getValue('updatedAt') as string)
    },
    meta: {
      className: 'min-w-[120px] hidden xl:table-cell',
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: {
      className: 'w-16',
    },
  },
]
