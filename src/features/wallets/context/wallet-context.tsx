import React, { createContext, useContext, useState } from 'react';
import { Wallet } from '../data/schema';

interface WalletContextType {
  open: string | null;
  setOpen: (value: string | null) => void;
  currentRow: Wallet | null;
  setCurrentRow: (wallet: Wallet | null) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRow, setCurrentRow] = useState<Wallet | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ currentRow, setCurrentRow, open, setOpen }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallets() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallets must be used within a WalletProvider');
  }
  return context;
}
