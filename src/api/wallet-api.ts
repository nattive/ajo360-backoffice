import axi from '@/lib/axios'

export const getAllWallets = async () => {
  const response = await axi.get('/wallets/all-wallets')
  return response.data
}

export const createWallet = async () => {
  const response = await axi.get('/wallets/create-wallet')
  return response.data
}
