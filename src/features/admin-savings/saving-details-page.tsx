import React from 'react'
import { useParams } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User, CreditCard, Users } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { formatCurrency } from '@/lib/currency'
import { format } from 'date-fns'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'MMM dd, yyyy'): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return format(date, formatStr)
}

export function SavingDetailPage() {
  const { savingId } = useParams({ from: '/_authenticated/savings/$savingId' })
  const navigate = useNavigate()

  // TODO: Implement API call to fetch saving details
  // const { data: savingDetails, loading } = useSavingDetails(savingId)

  const handleBack = () => {
    navigate({ to: '/savings' })
  }

  // Mock data for now - will be replaced with actual API data
  const mockSavingData = {
    id: savingId,
    type: 'business_lock',
    planTitle: 'Business Growth Plan',
    businessName: 'Tech Startup Inc.',
    targetAmount: 50000,
    currentAmount: 25000,
    lockStatus: 'active',
    lockStartDate: '2024-01-15',
    lockEndDate: '2024-12-15',
    user: {
      id: 'user-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    },
    transactions: [
      {
        id: 'txn-1',
        amount: 10000,
        type: 'deposit',
        date: '2024-01-15',
        description: 'Initial deposit'
      },
      {
        id: 'txn-2',
        amount: 15000,
        type: 'deposit',
        date: '2024-02-15',
        description: 'Monthly contribution'
      }
    ],
    groupMembers: [] // For group savings
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='sm' onClick={handleBack}>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back to Savings
        </Button>
        <div>
          <h1 className='text-2xl font-bold'>Saving Details</h1>
          <p className='text-muted-foreground'>ID: {savingId}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Target Amount</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(mockSavingData.targetAmount)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Current Amount</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{formatCurrency(mockSavingData.currentAmount)}</div>
            <p className='text-xs text-muted-foreground'>
              {((mockSavingData.currentAmount / mockSavingData.targetAmount) * 100).toFixed(1)}% of target
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Status</CardTitle>
            <Badge variant={mockSavingData.lockStatus === 'active' ? 'default' : 'secondary'}>
              {mockSavingData.lockStatus}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className='text-sm'>
              <p>Start: {formatSafeDate(mockSavingData.lockStartDate)}</p>
                <p>End: {formatSafeDate(mockSavingData.lockEndDate)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue='details' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='details'>Saving Details</TabsTrigger>
          <TabsTrigger value='transactions'>Transactions</TabsTrigger>
          {mockSavingData.type === 'group_saving' && (
            <TabsTrigger value='members'>Group Members</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value='details' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Saving Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Plan Title</label>
                  <p className='text-sm'>{mockSavingData.planTitle}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Business Name</label>
                  <p className='text-sm'>{mockSavingData.businessName}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Saving Type</label>
                  <p className='text-sm capitalize'>{mockSavingData.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Owner</label>
                  <div className='flex items-center gap-2'>
                    <User className='h-4 w-4' />
                    <span className='text-sm'>{mockSavingData.user.firstName} {mockSavingData.user.lastName}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value='transactions' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {mockSavingData.transactions.map((transaction) => (
                  <div key={transaction.id} className='flex items-center justify-between p-4 border rounded-lg'>
                    <div>
                      <p className='font-medium'>{transaction.description}</p>
                      <p className='text-sm text-muted-foreground'>
                        {formatSafeDate(transaction.date)}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-green-600'>
                        +{formatCurrency(transaction.amount)}
                      </p>
                      <p className='text-sm text-muted-foreground capitalize'>{transaction.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {mockSavingData.type === 'group_saving' && (
          <TabsContent value='members' className='space-y-4'>
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='h-5 w-5' />
                  Group Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>Group member details will be displayed here.</p>
                {/* TODO: Implement group members list */}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}