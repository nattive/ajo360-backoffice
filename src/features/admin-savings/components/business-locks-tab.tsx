import React from 'react'
import { useGetBusinessLocks } from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { BusinessLocksDataTable } from './business-locks-data-table'
import { SavingsFilters } from './savings-filters'

interface BusinessLocksTabProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function BusinessLocksTab({ filters, onFilterChange }: BusinessLocksTabProps) {
  const { data: businessLocks, isLoading, error } = useGetBusinessLocks(filters)

  if (error) {
    return (
      <div className='flex items-center justify-center h-32'>
        <p className='text-destructive'>Error loading business locks data</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Business Lock Savings</h3>
          <p className='text-sm text-muted-foreground'>
            Manage business lock savings with fixed durations and interest rates
          </p>
        </div>
      </div>

      <SavingsFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
        showMaturityDate={true}
      />

      <BusinessLocksDataTable 
        data={businessLocks?.data || []}
        meta={businessLocks?.meta}
        loading={isLoading}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}