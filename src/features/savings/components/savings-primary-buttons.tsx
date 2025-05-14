import {
// IconDownload, 
IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useSavings } from '../context/savings-context';


export function SavingsPrimaryButtons() {
  const { setOpen } = useSavings()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('import')}
        >
        <span>Import</span> <IconDownload size={18} />
      </Button> */}
      
      <Button className='space-x-1 bg-blue-700' onClick={() => setOpen('create')}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}