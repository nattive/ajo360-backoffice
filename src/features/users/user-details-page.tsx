import { useParams, Link } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useGetUserById, useRetriggerWalletCreation } from '@/hooks/api-hooks/useAdmin'
import { 
  ArrowLeftIcon, 
  CopyIcon, 
  EditIcon, 
  MailIcon, 
  PhoneIcon, 
  MapPinIcon,
  CalendarIcon,
  WalletIcon,
  TrendingUpIcon,
  ActivityIcon,
  RefreshCwIcon
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

// Safe date formatting function
const formatSafeDate = (dateString: string | null | undefined, formatStr: string = 'PPP'): string => {
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
import { useState } from 'react'
import { UserEditForm } from './components/user-edit-form'
import { UserStatusDialog } from './components/user-status-dialog'
import { UserType } from '@/schemas/adminSchemas'
import { formatCurrency } from '@/lib/currency'

// Extended user type that includes status from API response
type UserWithStatus = UserType & {
  status?: string
}

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 hover:bg-green-100'
    case 'suspended':
      return 'bg-red-100 text-red-800 hover:bg-red-100'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
  }
}

export function UserDetailPage() {
  const { userId } = useParams({ from: '/_authenticated/users/$userId' })
  const { data: response, isLoading, error: _error, refetch } = useGetUserById(userId)
  const retriggerWalletMutation = useRetriggerWalletCreation()
  const [isRetriggering, setIsRetriggering] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [statusAction, setStatusAction] = useState<'suspend' | 'activate'>('suspend')
  
  const user = response?.data

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const handleRetriggerWallet = async () => {
    if (!user) return
    
    setIsRetriggering(true)
    try {
      await retriggerWalletMutation.mutateAsync(user.id)
      toast.success('Wallet creation retriggered successfully')
    } catch (_error) {
      toast.error('Failed to retrigger wallet creation')
    } finally {
      setIsRetriggering(false)
    }
  }

  // Helper function to determine if retrigger wallet button should be shown
  const shouldShowRetriggerWallet = () => {
    if (!user) return false
    // Show retrigger wallet button if user has BVN and wallet status is not active
    return user.bvn && (!user.wallet?.isActive || user.wallet?.isActive === false)
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
              <p className="text-muted-foreground">Loading user details...</p>
            </div>
          </div>
        </Main>
      </>
    )
  }

  if (_error || !user) {
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
              <p className="text-red-600 mb-2">User not found</p>
              <p className="text-muted-foreground text-sm mb-4">
                The user you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/users">
                <Button variant="outline">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Users
                </Button>
              </Link>
            </div>
          </div>
        </Main>
      </>
    )
  }

  const fullName = `${user.firstName} ${user.lastName}`
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
            <Link to="/users">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>{fullName}</h2>
              <p className='text-muted-foreground'>
                Complete profile information and account details
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <EditIcon className="h-4 w-4 mr-2" />
                Edit User
              </Button>
              
              {shouldShowRetriggerWallet() && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRetriggerWallet}
                  disabled={isRetriggering}
                >
                  <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRetriggering ? 'animate-spin' : ''}`} />
                  Retrigger Wallet
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ActivityIcon className="h-5 w-5" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.profilePicture || undefined} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-xl font-semibold">{fullName}</h3>
                      {user.otherName && (
                        <p className="text-sm text-muted-foreground">Also known as: {user.otherName}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className={getStatusColor(user.status || 'active')}
                      >
                        {user.status || 'Active'}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                          Email {user.emailVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge variant={user.phoneNumberVerified ? 'default' : 'secondary'}>
                          Phone {user.phoneNumberVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    {user.phoneNumber && (
                      <div className="flex items-center gap-3">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
                        </div>
                      </div>
                    )}
                    
                    {user.dateOfBirth && (
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-muted-foreground">
                            {formatSafeDate(user.dateOfBirth)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {user.address && (
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">
                            {user.address}
                            {user.state && `, ${user.state}`}
                            {user.country && `, ${user.country}`}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {user.bvn && (
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-muted-foreground rounded-sm" />
                        <div>
                          <p className="text-sm font-medium">BVN</p>
                          <p className="text-sm text-muted-foreground font-mono">{user.bvn}</p>
                        </div>
                      </div>
                    )}
                    
                    {user.uniqueCode && (
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-muted-foreground rounded-sm" />
                        <div>
                          <p className="text-sm font-medium">Unique Code</p>
                          <p className="text-sm text-muted-foreground font-mono">{user.uniqueCode}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Created</span>
                    <p className="font-medium">{formatSafeDate(user.createdAt, 'PPP p')}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSafeDistanceToNow(user.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-muted-foreground">Last Updated</span>
                    <p className="font-medium">{formatSafeDate(user.updatedAt, 'PPP p')}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSafeDistanceToNow(user.updatedAt, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-muted-foreground">User ID</span>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {user.id}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(user.id, 'User ID')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Statistics */}
            {user.statistics && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5" />
                    Account Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(user.statistics.totalSavingsBalance)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Savings</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(user.statistics.totalDeposited)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Deposited</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {formatCurrency(user.statistics.totalWithdrawn)}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Withdrawn</p>
                    </div>
                    
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {user.statistics.totalTransactions}
                      </p>
                      <p className="text-sm text-muted-foreground">Transactions</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active Savings</span>
                      <p className="font-medium">{user.statistics.activeSavingsCount} plans</p>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Account Age</span>
                      <p className="font-medium">{user.statistics.accountAge} days</p>
                    </div>
                    
                    {user.statistics.lastLoginAt && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Last Login</span>
                        <p className="font-medium">
                          {formatSafeDate(user.statistics.lastLoginAt, 'PPP p')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatSafeDistanceToNow(user.statistics.lastLoginAt, { addSuffix: true })}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Information */}
            {user.wallet && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5" />
                    Wallet Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(user.wallet.balance)}
                    </p>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Account Name</span>
                      <p className="font-medium">{user.wallet.accountName}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Account Number</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {user.wallet.accountNumber}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(user.wallet!.accountNumber, 'Account Number')}
                        >
                          <CopyIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Bank</span>
                      <p className="font-medium">{user.wallet.bankName}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Wallet ID</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {user.wallet.id}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(user.wallet!.id, 'Wallet ID')}
                        >
                          <CopyIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {user.wallet.isActive !== undefined && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Status</span>
                        <div className="mt-1">
                          <Badge variant={user.wallet.isActive ? 'default' : 'secondary'}>
                            {user.wallet.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    {user.wallet.createdAt && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Created</span>
                        <p className="text-sm">{formatSafeDate(user.wallet.createdAt)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <EditIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <ActivityIcon className="h-4 w-4 mr-2" />
                  View Transactions
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUpIcon className="h-4 w-4 mr-2" />
                  View Savings
                </Button>
                
                {shouldShowRetriggerWallet() && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleRetriggerWallet}
                    disabled={isRetriggering}
                  >
                    <RefreshCwIcon className={`h-4 w-4 mr-2 ${isRetriggering ? 'animate-spin' : ''}`} />
                    Retrigger Wallet
                  </Button>
                )}
                
                <Separator className="my-2" />
                
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => {
                    const currentStatus = (user as UserWithStatus).status?.toLowerCase()
                    if (currentStatus === 'suspended') {
                      setStatusAction('activate')
                    } else {
                      setStatusAction('suspend')
                    }
                    setStatusDialogOpen(true)
                  }}
                >
                  {(user as UserWithStatus).status?.toLowerCase() === 'suspended' ? 'Activate User' : 'Suspend User'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
      
      {user && (
        <>
          <UserEditForm
            user={user}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSuccess={() => {
              refetch()
              toast.success('User updated successfully')
            }}
          />
          
          <UserStatusDialog
            user={user as UserWithStatus}
            open={statusDialogOpen}
            onOpenChange={setStatusDialogOpen}
            action={statusAction}
            onSuccess={() => {
              refetch()
            }}
          />
        </>
      )}
    </>
  )
}
