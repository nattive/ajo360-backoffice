import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Search, X } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { SavingsQueryParams } from '@/api/admin-api'

interface SavingsFiltersProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
  showMaturityDate?: boolean
}

export function SavingsFilters({ filters, onFilterChange, showMaturityDate = false }: SavingsFiltersProps) {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value || undefined })
  }

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value === 'all' ? undefined : value as 'active' | 'inactive' | 'completed' | 'cancelled' })
  }

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-')
    onFilterChange({ 
      sortBy: sortBy as 'createdAt' | 'balance' | 'maturityDate', 
      sortOrder: sortOrder as 'ASC' | 'DESC' 
    })
  }

  const handleDateRangeChange = () => {
    onFilterChange({
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
    })
  }

  const clearFilters = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    onFilterChange({
      search: undefined,
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      sortBy: undefined,
      sortOrder: undefined
    })
  }

  useEffect(() => {
    if (startDate || endDate) {
      handleDateRangeChange()
    }
  }, [startDate, endDate])

  return (
    <div className='flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg'>
      {/* Search */}
      <div className='flex-1 min-w-0'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by user name, email...'
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      {/* Status Filter */}
      <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
        <SelectTrigger className='w-[140px]'>
          <SelectValue placeholder='Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Status</SelectItem>
          <SelectItem value='active'>Active</SelectItem>
          <SelectItem value='inactive'>Inactive</SelectItem>
          <SelectItem value='completed'>Completed</SelectItem>
          <SelectItem value='cancelled'>Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Options */}
      <Select 
        value={filters.sortBy && filters.sortOrder ? `${filters.sortBy}-${filters.sortOrder}` : 'createdAt-DESC'} 
        onValueChange={handleSortChange}
      >
        <SelectTrigger className='w-[160px]'>
          <SelectValue placeholder='Sort by' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='createdAt-DESC'>Newest First</SelectItem>
          <SelectItem value='createdAt-ASC'>Oldest First</SelectItem>
          <SelectItem value='balance-DESC'>Highest Balance</SelectItem>
          <SelectItem value='balance-ASC'>Lowest Balance</SelectItem>
          {showMaturityDate && (
            <>
              <SelectItem value='maturityDate-ASC'>Maturity (Soon)</SelectItem>
              <SelectItem value='maturityDate-DESC'>Maturity (Later)</SelectItem>
            </>
          )}
        </SelectContent>
      </Select>

      {/* Date Range */}
      <div className='flex gap-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-[140px] justify-start text-left font-normal',
                !startDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {startDate ? format(startDate, 'MMM dd, yyyy') : 'Start date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'w-[140px] justify-start text-left font-normal',
                !endDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {endDate ? format(endDate, 'MMM dd, yyyy') : 'End date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Clear Filters */}
      <Button variant='outline' onClick={clearFilters} size='icon'>
        <X className='h-4 w-4' />
      </Button>
    </div>
  )
}