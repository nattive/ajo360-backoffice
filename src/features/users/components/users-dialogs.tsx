import { useUsers } from '../context/users-context'
import { UsersDeleteDialog } from './users-delete-dialog'
import { UsersFreezeDialog } from './users-freeze-dialog'
import { UsersPNDDialog } from './users-pnd-dialog'
import { UsersLeanDialog } from './users-lean-dialog'
import type { UsersDialogType } from '../context/users-context'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()

  const handleClose = (modalKey: UsersDialogType) => {
    setOpen(modalKey)
    setTimeout(() => {
      setCurrentRow(null)
    }, 500)
  }

  return (
    <>
      {currentRow && (
        <>
          {open === 'delete' && (
            <UsersDeleteDialog
              key={`user-delete-${currentRow.id}`}
              open={open === 'delete'}
              onOpenChange={() => handleClose('delete')}
              currentRow={currentRow}
            />
          )}

          {open === 'freeze' && (
            <UsersFreezeDialog
              key={`user-freeze-${currentRow.id}`}
              open={open === 'freeze'}
              onOpenChange={() => handleClose('freeze')}
              currentRow={currentRow}
            />
          )}

          {open === 'pnd' && (
            <UsersPNDDialog
              key={`user-pnd-${currentRow.id}`}
              open={open === 'pnd'}
              onOpenChange={() => handleClose('pnd')}
              currentRow={currentRow}
            />
          )}

          {open === 'lean' && (
            <UsersLeanDialog
              key={`user-lean-${currentRow.id}`}
              open={open === 'lean'}
              onOpenChange={() => handleClose('lean')}
              currentRow={currentRow}
            />
          )}
        </>
      )}
    </>
  )
}
