import Login from '@/features/auth/components/Login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/login')({
  component: Login,
})


