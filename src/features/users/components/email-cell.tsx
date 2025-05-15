// components/email-cell.tsx
import { useRouter } from '@tanstack/react-router'
import LongText from '@/components/long-text'
import { User } from '../data/schema'

export function EmailCell({ user }: { user: User }) {
  const router = useRouter()

  return (
    <span
      onClick={() =>
        router.navigate({
          to: '/users/$userId',
          params: { userId: user.id },
        })
      }
      className='cursor-pointer text-blue-600 underline hover:text-blue-800'
    >
      <LongText className='max-w-48'>{user.email}</LongText>
    </span>
  )
}
