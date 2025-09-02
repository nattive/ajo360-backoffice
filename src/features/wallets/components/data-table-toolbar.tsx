import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

const statuses = [
  {
    value: 'ACTIVE',
    label: 'Active',
  },
  {
    value: 'INACTIVE',
    label: 'Inactive',
  },
  {
    value: 'LOCKED',
    label: 'Locked',
  },
  {
    value: 'SUSPENDED',
    label: 'Suspended',
  },
]

const currencies = [
  {
    value: 'NGN',
    label: 'NGN',
  },
]

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search wallets...'
          value={
            (table.getColumn('accountNumber')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('accountNumber')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        
        <Input
          placeholder='Search by account name...'
          value={
            (table.getColumn('accountName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('accountName')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        
        {table.getColumn('currency') && (
          <DataTableFacetedFilter
            column={table.getColumn('currency')}
            title='Currency'
            options={currencies}
          />
        )}
        
        <Input
          placeholder='Min balance...'
          value={
            (table.getColumn('availableBalance')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('availableBalance')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[120px] lg:w-[150px]'
          type='number'
        />

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
      <DataTableViewOptions table={table} />
    </div>
  )
}
