import LongText from '@/components/long-text'
import { User } from '../data/schema'

type EmailCellProps = {
  user: User
}

export function EmailCell({ user }: EmailCellProps) {
  return (
    <span className="text-blue-600">
      <LongText className="max-w-48">{user.email}</LongText>
    </span>
  )
}