import Account from '@/features/users/components/Account'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_layout/account/')({
  component: Account,
})

