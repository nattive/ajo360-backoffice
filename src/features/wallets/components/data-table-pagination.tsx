import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GetWalletsParams } from '@/api/wallet-api'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  totalCount?: number
  params?: GetWalletsParams
  onParamsChange?: (params: Partial<GetWalletsParams>) => void
}

export function DataTablePagination<TData>({
  table,
  totalCount = 0,
  params,
  onParamsChange,
}: DataTablePaginationProps<TData>) {
  const currentPage = params?.page || 1
  const pageSize = params?.limit || 20
  const totalPages = Math.ceil(totalCount / pageSize)
  
  const handlePageChange = (newPage: number) => {
    if (onParamsChange) {
      onParamsChange({ page: newPage })
    } else {
      table.setPageIndex(newPage - 1)
    }
  }
  
  const handlePageSizeChange = (newPageSize: number) => {
    if (onParamsChange) {
      onParamsChange({ limit: newPageSize, page: 1 })
    } else {
      table.setPageSize(newPageSize)
    }
  }
  return (
    <div
      className='flex items-center justify-between overflow-clip px-2'
      style={{ overflowClipMargin: 1 }}
    >
      <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
        {onParamsChange ? (
          <>
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries
          </>
        ) : (
          <>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </>
        )}
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${onParamsChange ? pageSize : table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              handlePageSizeChange(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {onParamsChange ? currentPage : table.getState().pagination.pageIndex + 1} of{' '}
          {onParamsChange ? totalPages : table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onParamsChange ? handlePageChange(1) : table.setPageIndex(0)}
            disabled={onParamsChange ? currentPage <= 1 : !table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onParamsChange ? handlePageChange(currentPage - 1) : table.previousPage()}
            disabled={onParamsChange ? currentPage <= 1 : !table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onParamsChange ? handlePageChange(currentPage + 1) : table.nextPage()}
            disabled={onParamsChange ? currentPage >= totalPages : !table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onParamsChange ? handlePageChange(totalPages) : table.setPageIndex(table.getPageCount() - 1)}
            disabled={onParamsChange ? currentPage >= totalPages : !table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
