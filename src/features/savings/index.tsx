import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { SavingsDialogs } from './components/savings-dialogs'
import { SavingsPrimaryButtons } from './components/savings-primary-buttons';
import WalletProvider from './context/savings-context';
import { savings } from './data/savings';


export default function Wallet() {
  return (
    <WalletProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Savings Management
            </h2>
            <p className='text-muted-foreground'>
              List of all savings. Includes successful and failed wallets with
              failure and control (edit , update)
            </p>
          </div>
          <SavingsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable data={savings} columns={columns} />
        </div>
      </Main>

      <SavingsDialogs />
    </WalletProvider>
  )
}