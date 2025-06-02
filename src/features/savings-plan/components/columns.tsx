import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { SavingsPlan } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<SavingsPlan>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Plan Name' />
    ),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Slug' />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {row.getValue('description')}
      </div>
    ),
  },
  {
    header: 'Interest Rate',
    cell: ({ row }) => (
      <div className='text-primary font-medium'>
        {row.original.config.interest_rate}%
      </div>
    ),
  },
  /* {
    header: 'Duration (days)',
    cell: ({ row }) => {
      const { minimum_days, maximum_days } = row.original.config
      return (
        <div className='text-sm'>
          {minimum_days} - {maximum_days}
        </div>
      )
    },
  }, */
  {
    header: 'Duration (months)',
    cell: ({ row }) => {
      const { minimum_days, maximum_days } = row.original.config

      const formatToMonths = (days: number | null) => {
        if (days === null) return 'N/A'
        return (days / 30).toFixed(1) // one decimal place
      }

      return (
        <div className='text-sm'>
          {formatToMonths(minimum_days)} - {formatToMonths(maximum_days)}
        </div>
      )
    },
  },
  {
    header: 'Interest Style',
    cell: ({ row }) => (
      <Badge className='text-xs capitalize'>
        {row.original.config.interest_style}
      </Badge>
    ),
  },
  {
    header: 'Auto Save',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={`text-xs ${row.original.config.user_can_auto_save ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-400 text-gray-600'}`}
      >
        {row.original.config.user_can_auto_save ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    accessorKey: 'is_visible',
    header: 'Visible',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={`text-xs ${row.getValue('is_visible') ? 'border-green-500 bg-green-50 text-green-600' : 'border-red-500 bg-red-50 text-red-600'}`}
      >
        {row.getValue('is_visible') ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    accessorKey: 'is_enabled',
    header: 'Enabled',
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={`text-xs ${row.getValue('is_enabled') ? 'border-green-500 bg-green-50 text-green-600' : 'border-red-500 bg-red-50 text-red-600'}`}
      >
        {row.getValue('is_enabled') ? 'Yes' : 'No'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
