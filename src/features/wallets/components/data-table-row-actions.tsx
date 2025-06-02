import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallets } from '../context/wallet-context';
import { walletSchema } from '../data/schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useWallets();

  const result = walletSchema.safeParse(row.original);

  if (!result.success) {
    return null; // Prevent rendering the action menu on invalid data
  }

  const task = result.data;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen('view-transactions'); // Use a meaningful state key here
          }}
        >
          View Transactions
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(task);
            setOpen('show-wallet-details'); 
          }}
        >
          Show Wallet Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
