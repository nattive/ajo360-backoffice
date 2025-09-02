import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

const statusOptions = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
]

const emailVerifiedOptions = [
  {
    label: 'Verified',
    value: 'true',
  },
  {
    label: 'Not Verified',
    value: 'false',
  },
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-1 flex-col gap-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0'>
        <Input
          placeholder='Filter by name or email...'
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className='h-8 w-full sm:w-[150px] lg:w-[250px]'
        />
        <div className='flex flex-wrap gap-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={statusOptions}
            />
          )}
          {table.getColumn('emailVerified') && (
            <DataTableFacetedFilter
              column={table.getColumn('emailVerified')}
              title='Email Status'
              options={emailVerifiedOptions}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
      <div className='flex justify-end'>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
