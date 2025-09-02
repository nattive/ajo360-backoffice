import { useParams, Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useGetTransactionById } from '@/hooks/api-hooks/useAdmin'
import { z } from 'zod'
import type { TransactionLogSchema } from '@/schemas/adminSchemas'
import { ArrowLeftIcon, CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import { toast } from 'sonner'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'PPP p'): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return format(date, formatStr)
}

// Safe distance formatting function
const formatSafeDistanceToNow = (dateString: string | null | undefined, options?: { addSuffix?: boolean }): string => {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 'Invalid Date'
  
  return formatDistanceToNow(date, options)
}
import { formatCurrency } from '@/lib/currency'

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800 hover:bg-green-100'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    case 'failed':
      return 'bg-red-100 text-red-800 hover:bg-red-100'
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
}

function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case 'credit':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
    case 'debit':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
}

export function TransactionDetail() {
  const { transactionId } = useParams({ from: '/_authenticated/transactions/$transactionId' })
  const { data: response, isLoading, error } = useGetTransactionById(transactionId)
  
  const transaction = response?.data

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  if (isLoading) {
    return (
      <>
        <Header>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading transaction details...</p>
            </div>
          </div>
        </Main>
      </>
    )
  }

  if (error || !transaction) {
    return (
      <>
        <Header>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-red-600 mb-2">Transaction not found</p>
              <p className="text-muted-foreground text-sm mb-4">
                The transaction you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/transactions">
                <Button variant="outline">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Transactions
                </Button>
              </Link>
            </div>
          </div>
        </Main>
      </>
    )
  }

  const fullName = `${transaction.user.firstName} ${transaction.user.lastName}`
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/transactions">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Transactions
              </Button>
            </Link>
          </div>
          
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Transaction Details</h2>
            <p className='text-muted-foreground'>
              Complete information for transaction {transaction.reference}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Transaction Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Amount</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {transaction.type.toLowerCase() === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Type</span>
                    <div className="mt-1">
                      <Badge
                        variant="secondary"
                        className={getTypeColor(transaction.type)}
                      >
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                    <div className="mt-1">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(transaction.status)}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Description</span>
                  <p className="mt-1">{transaction.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Reference</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {transaction.reference}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.reference, 'Reference')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Created</span>
                    <div className="mt-1">
                      <p className="text-sm">{formatSafeDate(transaction.createdAt)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSafeDistanceToNow(transaction.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Updated</span>
                    <div className="mt-1">
                      <p className="text-sm">{formatSafeDate(transaction.updatedAt)}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSafeDistanceToNow(transaction.updatedAt, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Logs */}
            {transaction.logs && transaction.logs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transaction.logs.map((log: z.infer<typeof TransactionLogSchema>, index: number) => (
                      <div key={log.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {index < transaction.logs!.length - 1 && (
                            <div className="w-px h-8 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{log.action}</h4>
                            <span className="text-xs text-muted-foreground">
                              {formatSafeDate(log.createdAt, 'MMM d, HH:mm')}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{fullName}</h3>
                    <p className="text-sm text-muted-foreground">{transaction.user.email}</p>
                    {transaction.user.phoneNumber && (
                      <p className="text-sm text-muted-foreground">{transaction.user.phoneNumber}</p>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">User ID</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {transaction.user.id}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.user.id, 'User ID')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <Link to="/users/$userId" params={{ userId: transaction.user.id }}>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLinkIcon className="h-3 w-3 mr-2" />
                    View User Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wallet Information */}
            <Card>
              <CardHeader>
                <CardTitle>Wallet Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Account Name</span>
                  <p className="mt-1">{transaction.wallet.accountName}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Account Number</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {transaction.wallet.accountNumber}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.wallet.accountNumber, 'Account Number')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {transaction.wallet.bankName && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Bank</span>
                    <p className="mt-1">{transaction.wallet.bankName}</p>
                  </div>
                )}
                
                {transaction.wallet.balance !== undefined && (
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Current Balance</span>
                    <p className="mt-1 font-medium">
                      {formatCurrency(transaction.wallet.balance)}
                    </p>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Wallet ID</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {transaction.wallet.id}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.wallet.id, 'Wallet ID')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}