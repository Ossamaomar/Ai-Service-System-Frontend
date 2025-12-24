import ForgetPassword from '@/features/auth/components/ForgetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/forgetPassword')({
  component: ForgetPassword,
})


