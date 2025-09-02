import { useGetAllUsers } from '@/hooks/api-hooks/useAdmin'
import { LoadingWrapper } from '@/components/ui/loading-spinner'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'

export default function Users() {
  const { data: usersResponse, isLoading } = useGetAllUsers()

  // Extract the users array from the API response
  const users = usersResponse?.data ?? []

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <LoadingWrapper
            isLoading={isLoading}
            fallback={<div className='py-8 text-center'>Loading users...</div>}
          >
            <UsersTable data={users || []} columns={columns} />
          </LoadingWrapper>
        </div>
      </Main>
      <UsersDialogs />
    </UsersProvider>
  )
}
