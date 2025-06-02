import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { 
  // IconEdit, 
  IconTrash } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUsers } from '../context/users-context';
import { User, userSchema } from '../data/schema';


interface DataTableRowActionsProps {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {

  const user = userSchema?.parse(row.original);

  const { setOpen, setCurrentRow } = useUsers()
  return (
    <>
      <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(user)
            setOpen('freeze')
          }}
        >
          Freeze User
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(user)
            setOpen('lean')
          }}
        >
          Put on Lean
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(user)
            setOpen('pnd')
          }}
        >
          Put on PND
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-red-500 text-white"
          onClick={() => {
            setCurrentRow(user)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} color='white'/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}