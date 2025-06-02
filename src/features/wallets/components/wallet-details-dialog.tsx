import {
  FaUserCircle,
  FaCalendarAlt,
  FaLock,
  FaSyncAlt,
  FaIdBadge,
} from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface WalletDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  wallet: {
    accountNumber: string
    accountName: string
    availableBalance: string
    createdAt: string
    updatedAt: string
    isLocked: boolean
    status: string
  } | null
}

export function WalletDetailsDialog({
  isOpen,
  onClose,
  wallet,
}: WalletDetailsDialogProps) {
  if (!wallet) return null

  const formatCurrency = (value: string) =>
  `${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side='bottom'
        className='max-h-[90vh] w-full max-w-none overflow-y-auto rounded-lg border border-indigo-300 bg-gradient-to-br from-indigo-100 via-blue-50 to-white p-10 shadow-lg'
      >
        <SheetHeader className='mb-10'>
          <SheetTitle className='text-4xl font-extrabold tracking-wide text-indigo-900'>
            Wallet Details
          </SheetTitle>
        </SheetHeader>

        {/* Top row: Account Number, Account Name & Available Balance side by side */}
        <div className='mb-14 grid grid-cols-1 gap-10 text-indigo-800 sm:grid-cols-3 sm:items-center'>
          {/* Account Number */}
          <div className='flex items-center space-x-4'>
            <FaIdBadge className='text-6xl text-indigo-700' />
            <div>
              <h4 className='mb-1 text-sm font-bold tracking-wide text-indigo-800 uppercase'>
                Account Number
              </h4>
              <p className='text-3xl font-bold text-indigo-900'>
                {wallet.accountNumber}
              </p>
            </div>
          </div>

          {/* Account Name */}
          <div className='flex items-center space-x-4'>
            <FaUserCircle className='text-6xl text-indigo-700' />
            <div>
              <h4 className='mb-1 text-sm font-bold tracking-wide text-indigo-800 uppercase'>
                Account Name
              </h4>
              <p className='text-3xl font-bold text-indigo-900'>
                {wallet.accountName}
              </p>
            </div>
          </div>

          {/* Available Balance */}
          <div className='flex items-center space-x-4'>
            <span className='text-6xl font-bold text-green-600'>₦</span>
            <div>
              <h4 className='mb-1 text-sm font-bold tracking-wide text-green-700 uppercase'>
                Available Balance
              </h4>
              <p className='text-3xl font-bold text-green-800'>
                {formatCurrency(wallet.availableBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Other details grid */}
        <div className='grid grid-cols-1 gap-10 text-indigo-800 sm:grid-cols-4'>
          <div className='flex items-center space-x-3'>
            <FaCalendarAlt className='text-2xl text-indigo-600' />
            <div>
              <h5 className='font-semibold text-indigo-700'>Created At</h5>
              <p className='text-base'>
                {new Date(wallet.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaSyncAlt className='text-2xl text-indigo-600' />
            <div>
              <h5 className='font-semibold text-indigo-700'>Updated At</h5>
              <p className='text-base'>
                {new Date(wallet.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <FaLock className='text-2xl text-indigo-600' />
            <div>
              <h5 className='font-semibold text-indigo-700'>Locked?</h5>
              <p className='text-base'>
                {wallet.isLocked ? 'Yes 🔒' : 'No 🔓'}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <div>
              <h5 className='mb-2 font-semibold text-indigo-700'>Status</h5>
              <Badge
                variant='outline'
                className={`rounded-full px-5 py-2 text-sm font-semibold ${
                  wallet.status.toLowerCase() === 'active'
                    ? 'border-green-600 bg-green-100 text-green-800'
                    : wallet.status.toLowerCase() === 'pending'
                      ? 'border-yellow-600 bg-yellow-100 text-yellow-800'
                      : wallet.status.toLowerCase() === 'failed'
                        ? 'border-red-600 bg-red-100 text-red-800'
                        : 'border-gray-400 bg-gray-100 text-gray-700'
                }`}
              >
                {wallet.status}
              </Badge>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
