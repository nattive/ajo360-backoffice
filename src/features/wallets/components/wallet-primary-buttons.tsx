import { 
  // IconDownload, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IconPlus } from '@tabler/icons-react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from '@/components/ui/button'
import { useWallets } from '../context/wallet-context'

export function WalletPrimaryButtons() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setOpen } = useWallets()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('import')}
        >
        <span>Import</span> <IconDownload size={18} />
      </Button> */}
      
      {/*<Button className='space-x-1 bg-blue-700' onClick={() => setOpen('create')}>
        <span>Create</span> <IconPlus size={18} />
      </Button> */}
    </div>
  )
}
