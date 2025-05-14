import React, { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { Wallet } from '../data/schema';


// You should have a Wallet type defined like Task

type WalletDialogType = 'create' | 'update' | 'delete' | 'import'

interface WalletContextType {
  open: WalletDialogType | null
  setOpen: (type: WalletDialogType | null) => void
  currentRow: Wallet | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Wallet | null>>
}

const WalletContext = React.createContext<WalletContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function WalletProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<WalletDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Wallet | null>(null)

  return (
    <WalletContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </WalletContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWallets = () => {
  const walletContext = React.useContext(WalletContext)

  if (!walletContext) {
    throw new Error('useWallets must be used within a WalletProvider')
  }

  return walletContext
}