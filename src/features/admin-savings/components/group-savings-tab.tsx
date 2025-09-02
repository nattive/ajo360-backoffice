import { useGetGroupSavings } from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { GroupSavingsDataTable } from './group-savings-data-table'
import { SavingsFilters } from './savings-filters'

interface GroupSavingsTabProps {
  filters: SavingsQueryParams
  onFilterChange: (filters: Partial<SavingsQueryParams>) => void
}

export function GroupSavingsTab({ filters, onFilterChange }: GroupSavingsTabProps) {
  const { data: groupSavings, isLoading, error } = useGetGroupSavings(filters)

  if (error) {
    return (
      <div className='flex items-center justify-center h-32'>
        <p className='text-destructive'>Error loading group savings data</p>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
        <div>
          <h3 className='text-lg font-semibold'>Group Savings</h3>
          <p className='text-sm text-muted-foreground'>
            Manage collaborative group savings with multiple participants
          </p>
        </div>
      </div>

      <SavingsFilters 
        filters={filters} 
        onFilterChange={onFilterChange}
        showMaturityDate={false}
      />

      <GroupSavingsDataTable 
        data={groupSavings?.data || []}
        meta={groupSavings?.meta}
        loading={isLoading}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  )
}