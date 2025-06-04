import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

interface Transaction {
  id: string;
  amount: number;
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
        setWallets(response.data?.wallets || response.data || []);
        setError(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (err: any) {
        setError('Failed to fetch wallets');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [isActive]);

  const totalTransactions = wallets.reduce(
    (sum, w) => sum + (w.transactions ? w.transactions.length : 0),
    0
  );

  return { wallets, totalTransactions, loading, error };
}
