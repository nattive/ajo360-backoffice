import { showSubmittedData } from '@/utils/show-submitted-data';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useWallets } from '../context/wallet-context';
import { WalletDetailsDialog } from './wallet-details-dialog';
import { TasksImportDialog } from './wallet-import-dialog';
import { TasksMutateDrawer } from './wallet-mutate-drawer';
import { ViewTransactionsDialog } from './wallet-transaction-dialog';

export function WalletDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useWallets();

  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key="tasks-import"
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update');
              setTimeout(() => setCurrentRow(null), 500);
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => setCurrentRow(null), 500);
            }}
            handleConfirm={() => {
              setOpen(null);
              setTimeout(() => setCurrentRow(null), 500);
              showSubmittedData(
                currentRow,
                'The following task has been deleted:'
              );
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>.
                <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />

          <WalletDetailsDialog
            isOpen={open === 'show-wallet-details'}
            onClose={() => {
              setOpen(null);
              setCurrentRow(null);
            }}
            wallet={currentRow}
          />

          {/* Transaction dialog opened here, using currentRow.id */}
          <ViewTransactionsDialog
            isOpen={open === 'view-transactions'}
            onClose={() => {
              setOpen(null);
              setCurrentRow(null);
            }}
            walletId={currentRow.id}
          />
        </>
      )}
    </>
  );
}
