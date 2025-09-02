import React from 'react'
import { useGetTargetSavings } from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { TargetSavingsDataTable } from './target-savings-data-table'
import { SavingsFilters } from './savings-filters'

interface TargetSavingsTabProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function TargetSavingsTab({ filters, onFilterChange }: TargetSavingsTabProps) {
  const { data: targetSavings, isLoading, error } = useGetTargetSavings(filters)

  if (error) {
    return (
      <div className='flex items-center justify-center h-32'>
        <p className='text-destructive'>Error loading target savings data</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Target Savings</h3>
          <p className='text-sm text-muted-foreground'>
            Manage individual target savings with specific goals and deadlines
          </p>
        </div>
      </div>

      <SavingsFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
        showMaturityDate={false}
      />

      <TargetSavingsDataTable 
        data={targetSavings?.data || []}
        meta={targetSavings?.meta}
        loading={isLoading}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}