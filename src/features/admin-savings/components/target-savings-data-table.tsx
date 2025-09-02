import React from 'react'
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
import { MoreHorizontal, Eye, Edit, Trash2, Loader2, User } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AdminTargetSavingDto, PaginationMeta, SavingsQueryParams } from '@/api/admin-api'
import { formatCurrency } from '@/lib/currency'
import { format } from 'date-fns'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return format(date, formatStr)
}

interface TargetSavingsDataTableProps {
  data: AdminTargetSavingDto[]
  meta?: PaginationMeta
  loading: boolean
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function TargetSavingsDataTable({ 
  data, 
  meta, 
  loading, 
  filters: _filters, 
  onFilterChange 
}: TargetSavingsDataTableProps) {
  const navigate = useNavigate()
  
  const handlePageChange = (page: number) => {
    onFilterChange({ page })
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
          <span className='ml-2'>Loading target savings...</span>
        </CardContent>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center h-32'>
          <p className='text-muted-foreground'>No target savings found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target Savings ({meta?.totalItems || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Target Amount</TableHead>
              <TableHead>Current Amount</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Target Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className='w-[50px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((targetSaving) => {
              const progress = (targetSaving.currentAmount / targetSaving.targetAmount) * 100
              return (
                <TableRow key={targetSaving.id}>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-medium'>
                        {targetSaving.user.firstName} {targetSaving.user.lastName}
                      </span>
                      <span className='text-sm text-muted-foreground'>
                        {targetSaving.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {formatCurrency(targetSaving.targetAmount)}
                  </TableCell>
                  <TableCell className='text-right font-medium'>
                    {formatCurrency(targetSaving.currentAmount)}
                  </TableCell>
                  <TableCell className='text-center'>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{progress.toFixed(1)}%</span>
                      <div className='w-16 h-2 bg-muted rounded-full overflow-hidden'>
                        <div 
                          className='h-full bg-primary transition-all' 
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>
                    {formatSafeDate(targetSaving.targetDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={progress >= 100 ? 'default' : 'outline'}>
                      {progress >= 100 ? 'Completed' : 'In Progress'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatSafeDate(targetSaving.saving.createdAt)}
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
                          onClick={() => handleViewUser(targetSaving.user.id)}
                        >
                          <User className='mr-2 h-4 w-4' />
                          View User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewSaving(targetSaving.id)}
                        >
                          <Eye className='mr-2 h-4 w-4' />
                          View Savings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(targetSaving.id)}
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