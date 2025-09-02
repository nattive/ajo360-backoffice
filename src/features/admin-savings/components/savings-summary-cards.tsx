import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PiggyBank, Target, Lock, TrendingUp } from 'lucide-react'
import { 
  useGetBusinessLocks, 
  useGetBusinessTargets, 
  useGetGroupSavings, 
  useGetLockedSavings, 
  useGetTargetSavings 
} from '@/hooks/api-hooks/useSaving'
import { SavingsQueryParams } from '@/api/admin-api'
import { formatCurrency } from '@/lib/currency'

interface SavingsSummaryCardsProps {
  activeTab: string
  filters: SavingsQueryParams
}

export function SavingsSummaryCards({ activeTab, filters }: SavingsSummaryCardsProps) {
  const { data: businessLocks } = useGetBusinessLocks(filters)
  const { data: businessTargets } = useGetBusinessTargets(filters)
  const { data: groupSavings } = useGetGroupSavings(filters)
  const { data: lockedSavings } = useGetLockedSavings(filters)
  const { data: targetSavings } = useGetTargetSavings(filters)

  // Get summary data based on active tab
  const getSummaryData = () => {
    switch (activeTab) {
      case 'business-locks':
        return businessLocks?.summary
      case 'business-targets':
        return businessTargets?.summary
      case 'group-savings':
        return groupSavings?.summary
      case 'locked-savings':
        return lockedSavings?.summary
      case 'target-savings':
        return targetSavings?.summary
      default:
        return null
    }
  }

  const summary = getSummaryData()

  const cards = [
    {
      title: 'Total Savings',
      value: summary?.totalSavings || 0,
      icon: PiggyBank,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Balance',
      value: formatCurrency(summary?.totalBalance || 0),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Savings',
      value: summary?.activeSavings || 0,
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Average Balance',
      value: formatCurrency(summary?.averageBalance || 0),
      icon: Lock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={card.bgColor}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className={`text-sm font-medium ${card.color}`}>
                {card.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}