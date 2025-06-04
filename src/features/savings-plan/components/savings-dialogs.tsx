import { showSubmittedData } from '@/utils/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useSavings } from '../context/savings-context'
import { SavingsImportDialog } from './savings-import-dialog'
import { SavingsMutateDrawer } from './savings-mutate-drawer'
import { UpdateConfigModal } from './update-config-modal' // Make sure this path is correct
import { useDeleteSavings } from '@/hooks/api-hooks/useSaving'

export function SavingsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useSavings()
  const { mutate: deleteSavingsMutation, isPending: deleteLoading } = useDeleteSavings()

  return (
    <>
      <SavingsMutateDrawer
        key='savings-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <SavingsImportDialog
        key='savings-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <SavingsMutateDrawer
            key={`savings-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='savings-delete'
            destructive
            open={open === 'delete'}
            isLoading={deleteLoading}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              if (currentRow?.id) {
                deleteSavingsMutation(currentRow.id, {
                  onSuccess: () => {
                    setOpen(null)
                    showSubmittedData(
                      currentRow,
                      'The following task has been deleted:'
                    )
                  }
                })
              }
            }}
            className='max-w-md'
            title={`Delete this Savings : ${currentRow.name} ?`}
            desc={
              <>
                You are about to delete a savings with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />

          {/* ✅ New Modal for Updating Configuration */}
          <UpdateConfigModal />
        </>
      )}
    </>
  )
}
