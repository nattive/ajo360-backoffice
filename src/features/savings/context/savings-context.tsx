import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { Savings } from '../data/schema';


// You should have a Wallet type defined like Task

type SavingsDialogType = 'create' | 'update' | 'delete' | 'import'

interface SavingsContextType {
  open: SavingsDialogType | null
  setOpen: (type: SavingsDialogType | null) => void
  currentRow: Savings | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Savings | null>>
}

const SavingsContext = React.createContext<SavingsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function SavingsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<SavingsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Savings | null>(null)

  return (
    <SavingsContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </SavingsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSavings = () => {
  const savingsContext = React.useContext(SavingsContext)

  if (!savingsContext) {
    throw new Error('useWallets must be used within a WalletProvider')
  }

  return savingsContext
}