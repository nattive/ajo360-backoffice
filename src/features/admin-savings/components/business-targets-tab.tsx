import React from 'react'
import { useGetBusinessTargets } from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { BusinessTargetsDataTable } from './business-targets-data-table'
import { SavingsFilters } from './savings-filters'

interface BusinessTargetsTabProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function BusinessTargetsTab({ filters, onFilterChange }: BusinessTargetsTabProps) {
  const { data: businessTargets, isLoading, error } = useGetBusinessTargets(filters)

  if (error) {
    return (
      <div className='flex items-center justify-center h-32'>
        <p className='text-destructive'>Error loading business targets data</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Business Target Savings</h3>
          <p className='text-sm text-muted-foreground'>
            Manage business target savings with specific goals and deadlines
          </p>
        </div>
      </div>

      <SavingsFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
        showMaturityDate={false}
      />

      <BusinessTargetsDataTable 
        data={businessTargets?.data || []}
        meta={businessTargets?.meta}
        loading={isLoading}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}