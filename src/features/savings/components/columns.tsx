import { ColumnDef } from '@tanstack/react-table';
import { formatDateTime } from '@/utils/globals';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Savings } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';


export const columns: ColumnDef<Savings>[] = [
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
  },
  {
    accessorKey: 'savingsAccountName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Savings Account Name' />
    ),
  },
  {
    accessorKey: 'savingsAccountNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Savings Account Number' />
    ),
  },
  {
    header: 'User Email',
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {row?.original?.user?.email}
      </div>
    ),
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Currency' />
    ),
  },
  {
    accessorKey: 'bookedBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Booked Balance' />
    ),
    cell: ({ row }) => (
      <div className='text-primary font-medium'>
        ₦{Number(row.getValue('bookedBalance')).toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>('status')

      const statusStyles =
        status === 'ACTIVE'
          ? 'bg-green-100 text-green-800 border-green-600'
          : status === 'PENDING'
            ? 'bg-yellow-100 text-yellow-800 border-yellow-600'
            : status === 'FAILED'
              ? 'bg-red-100 text-red-800 border-red-600'
              : 'bg-gray-100 text-gray-700 border-gray-400'

      return (
        <Badge
          variant='outline'
          className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${statusStyles}`}
          title={`Wallet is ${status}`}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {formatDateTime(row?.getValue('createdAt'))}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]