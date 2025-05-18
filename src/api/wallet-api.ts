import axi from '@/lib/axios'

export const getWallets = async () => {
  const response = await axi.get('/wallets/user-wallet')
  return response.data
}

export const createWallet = async () => {
  const response = await axi.get('/wallets/create-wallet')
  return response.data
}
