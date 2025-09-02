import { ColumnDef } from '@tanstack/react-table';
import { formatDateTime } from '@/utils/globals';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Wallet } from '../data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { formatCurrency } from '@/lib/currency';


export const columns: ColumnDef<Wallet>[] = [
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
    accessorKey: 'accountNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account Number' />
    ),
  },
  {
    accessorKey: 'accountName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account Name' />
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'bookedBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Booked Balance' />
    ),
    cell: ({ row }) => (
      <div className='text-primary font-medium'>
        {formatCurrency(row.getValue('bookedBalance'))}
      </div>
    ),
  },
  {
    accessorKey: 'availableBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Available Balance' />
    ),
    cell: ({ row }) => (
      <div className='text-primary font-medium'>
        {formatCurrency(row.getValue('availableBalance'))}
      </div>
    ),
    filterFn: (row, id, value) => {
      const balance = parseFloat(row.getValue(id) as string) || 0
      const minBalance = parseFloat(value) || 0
      return balance >= minBalance
    },
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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