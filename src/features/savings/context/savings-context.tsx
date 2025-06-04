import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { SavingsPlan } from '../data/schema'

type SavingsDialogType = 'create' | 'update' | 'delete' | 'import' | 'updateConfig' 

interface SavingsContextType {
  open: SavingsDialogType | null
  setOpen: (type: SavingsDialogType | null) => void
  currentRow: SavingsPlan | null
  setCurrentRow: React.Dispatch<React.SetStateAction<SavingsPlan | null>>
}

const SavingsContext = React.createContext<SavingsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SavingsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SavingsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<SavingsPlan | null>(null)

  return (
    <SavingsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </SavingsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSavings = () => {
  const savingsContext = React.useContext(SavingsContext)

  if (!savingsContext) {
    throw new Error('useSavings must be used within a WalletProvider')
  }

  return savingsContext
}

