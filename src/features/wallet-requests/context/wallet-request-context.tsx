import { createContext, useContext, useState, ReactNode } from 'react'

interface WalletRequestContextType {
  selectedWithdrawals: string[]
  setSelectedWithdrawals: (ids: string[]) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const WalletRequestContext = createContext<WalletRequestContextType | undefined>(undefined)

export function WalletRequestProvider({ children }: { children: ReactNode }) {
  const [selectedWithdrawals, setSelectedWithdrawals] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  return (
    <WalletRequestContext.Provider
      value={{
        selectedWithdrawals,
        setSelectedWithdrawals,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WalletRequestContext.Provider>
  )
}

export function useWalletRequest() {
  const context = useContext(WalletRequestContext)
  if (context === undefined) {
    throw new Error('useWalletRequest must be used within a WalletRequestProvider')
  }
  return context
}