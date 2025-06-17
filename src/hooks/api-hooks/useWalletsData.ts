import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

interface Transaction {
  id: string;
  amount: number | string;
  date: string;
  type: string;
  status: string;
}

interface Wallet {
  id: string;
  accountName: string;
  availableBalance: string;
  createdAt: string;
  updatedAt: string;
  isLocked: boolean;
  status: string;
  transactions?: Transaction[];
}

interface WithdrawalStats {
  count: number;
  totalAmount: string; // formatted like ₦1,000.00
}

// Helper to clean and convert amount to number
function parseAmount(value: string | number): number {
  if (typeof value === 'number') return value;
  return Number(value.replace(/[₦,]/g, ''));
}

export function useWalletsData(isActive: boolean) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const fetchWallets = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.myajo360.com/wallets/all-wallets');

        const cleanedWallets = (response.data?.wallets || response.data || []).map((wallet: Wallet) => ({
          ...wallet,
          transactions: wallet.transactions?.map((tx) => ({
            ...tx,
            amount: parseAmount(tx.amount), // Convert to number and clean ₦
          })),
        }));

        setWallets(cleanedWallets);
        setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        setError('Failed to fetch wallets');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [isActive]);

  const totalTransactions = wallets.reduce(
    (sum, wallet) => sum + (wallet.transactions?.length || 0),
    0
  );

  const withdrawalData = wallets.reduce(
    (acc, wallet) => {
      const withdrawals = wallet.transactions?.filter(tx => tx.type === 'debit') || [];
      acc.count += withdrawals.length;
      acc.totalAmount += withdrawals.reduce((sum, tx) => sum + (typeof tx.amount === 'number' ? tx.amount : 0), 0);
      return acc;
    },
    { count: 0, totalAmount: 0 }
  );

  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const withdrawalStats: WithdrawalStats = {
    count: withdrawalData.count,
    totalAmount: formatter.format(withdrawalData.totalAmount), 
  };

  return {
    wallets,
    totalTransactions,
    withdrawalStats,
    loading,
    error,
  };
}
