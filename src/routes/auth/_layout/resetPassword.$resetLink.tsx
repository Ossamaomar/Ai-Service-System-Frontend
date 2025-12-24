import ResetPassword from '@/features/auth/components/ResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/resetPassword/$resetLink')({
  component: ResetPassword,
})


