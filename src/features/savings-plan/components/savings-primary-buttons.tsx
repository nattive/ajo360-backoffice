import {
  // IconDownload,
  IconPlus,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useSavings } from '../context/savings-context'

export function SavingsPrimaryButtons() {
  const { setOpen } = useSavings()
  return (
    <div className='flex gap-2'>
      <Button
        className='space-x-1 bg-blue-700'
        onClick={() => setOpen('create')}
      >
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}

