import { useState } from 'react'
import { SavingsQueryParams } from '@/api/admin-api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { BusinessLocksTab } from './components/business-locks-tab'
import { BusinessTargetsTab } from './components/business-targets-tab'
import { GroupSavingsTab } from './components/group-savings-tab'
import { LockedSavingsTab } from './components/locked-savings-tab'
import { SavingsSummaryCards } from './components/savings-summary-cards'
import { TargetSavingsTab } from './components/target-savings-tab'

export default function AdminSavingsDashboard() {
  const [activeTab, setActiveTab] = useState('business-locks')
  const [globalFilters, setGlobalFilters] = useState<SavingsQueryParams>({
    page: 1,
    limit: 10,
  })

  const handleFilterChange = (newFilters: Partial<SavingsQueryParams>) => {
    setGlobalFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        {/* Page Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Savings Management
          </h1>
          <p className='text-muted-foreground'>
            Comprehensive admin dashboard for managing all types of savings
            accounts
          </p>
        </div>

        {/* Summary Cards */}
        <SavingsSummaryCards activeTab={activeTab} filters={globalFilters} />

        {/* Tabs for Different Savings Types */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='space-y-6'
        >
          <TabsList className='grid w-full grid-cols-5'>
            <TabsTrigger value='business-locks'>Business Locks</TabsTrigger>
            <TabsTrigger value='business-targets'>Business Targets</TabsTrigger>
            <TabsTrigger value='group-savings'>Group Savings</TabsTrigger>
            <TabsTrigger value='locked-savings'>Locked Savings</TabsTrigger>
            <TabsTrigger value='target-savings'>Target Savings</TabsTrigger>
          </TabsList>

          <TabsContent value='business-locks' className='space-y-4'>
            <BusinessLocksTab
              filters={globalFilters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>

          <TabsContent value='business-targets' className='space-y-4'>
            <BusinessTargetsTab
              filters={globalFilters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>

          <TabsContent value='group-savings' className='space-y-4'>
            <GroupSavingsTab
              filters={globalFilters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>

          <TabsContent value='locked-savings' className='space-y-4'>
            <LockedSavingsTab
              filters={globalFilters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>

          <TabsContent value='target-savings' className='space-y-4'>
            <TargetSavingsTab
              filters={globalFilters}
              onFilterChange={handleFilterChange}
            />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
