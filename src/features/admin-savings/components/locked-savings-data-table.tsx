import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MoreHorizontal, Eye, Edit, Trash2, Loader2, Lock, User } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AdminLockedSavingDto, PaginationMeta, SavingsQueryParams } from '@/api/admin-api'
import { formatCurrency } from '@/lib/currency'
import { format, isAfter } from 'date-fns'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return format(date, formatStr)
}

interface LockedSavingsDataTableProps {
  data: AdminLockedSavingDto[]
  meta?: PaginationMeta
  loading: boolean
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function LockedSavingsDataTable({ 
  data, 
  meta, 
  loading, 
  filters: _filters, 
  onFilterChange 
}: LockedSavingsDataTableProps) {
  const navigate = useNavigate()
  
  const handlePageChange = (page: number) => {
    onFilterChange({ page })
  }

  const isMatured = (maturityDate: string) => {
    return !isAfter(new Date(maturityDate), new Date())
  }
  
  const handleViewUser = (userId: string) => {
    navigate({ to: '/users/$userId', params: { userId } })
  }
  
  const handleViewSaving = (savingId: string) => {
    navigate({ to: '/savings/$savingId', params: { savingId } })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-32'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <span className='ml-2'>Loading locked savings...</span>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-32'>
          <p className='text-muted-foreground'>No locked savings found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Locked Savings ({meta?.totalItems || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Lock Duration</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Maturity Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className='w-[50px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((lockedSaving) => {
              const matured = isMatured(lockedSaving.maturityDate)
              return (
                <TableRow key={lockedSaving.id}>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {lockedSaving.user.firstName} {lockedSaving.user.lastName}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        {lockedSaving.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {formatCurrency(lockedSaving.saving.balance)}
                  </TableCell>
                  <TableCell className='text-center'>
                    <div className='flex items-center gap-1'>
                      <Lock className='h-4 w-4 text-muted-foreground' />
                      <span>{lockedSaving.lockDuration} days</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    {lockedSaving.interestRate}%
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatSafeDate(lockedSaving.maturityDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={matured ? 'secondary' : 'default'}>
                      {matured ? 'Matured' : 'Locked'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatSafeDate(lockedSaving.saving.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                          <span className='sr-only'>Open menu</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewUser(lockedSaving.user.id)}
                        >
                          <User className='mr-2 h-4 w-4' />
                          View User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewSaving(lockedSaving.id)}
                        >
                          <Eye className='mr-2 h-4 w-4' />
                          View Savings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(lockedSaving.id)}
                        >
                          Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className='mr-2 h-4 w-4' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-destructive'>
                          <Trash2 className='mr-2 h-4 w-4' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        
        {/* Simple Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-muted-foreground'>
              Page {meta.page} of {meta.totalPages} ({meta.totalItems} total)
            </p>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(meta.page - 1)}
                disabled={meta.page <= 1}
              >
                Previous
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handlePageChange(meta.page + 1)}
                disabled={meta.page >= meta.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}