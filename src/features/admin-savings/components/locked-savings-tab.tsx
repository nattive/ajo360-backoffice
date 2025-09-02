import React from 'react'
import { useGetLockedSavings } from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { LockedSavingsDataTable } from './locked-savings-data-table'
import { SavingsFilters } from './savings-filters'

interface LockedSavingsTabProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function LockedSavingsTab({ filters, onFilterChange }: LockedSavingsTabProps) {
  const { data: lockedSavings, isLoading, error } = useGetLockedSavings(filters)

  if (error) {
    return (
      <div className='flex items-center justify-center h-32'>
        <p className='text-destructive'>Error loading locked savings data</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Locked Savings</h3>
          <p className='text-sm text-muted-foreground'>
            Manage locked savings with fixed terms and maturity dates
          </p>
        </div>
      </div>

      <SavingsFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
        showMaturityDate={true}
      />

      <LockedSavingsDataTable 
        data={lockedSavings?.data || []}
        meta={lockedSavings?.meta}
        loading={isLoading}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}