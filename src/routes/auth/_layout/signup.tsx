import Singnup from '@/features/auth/components/Singnup'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/signup')({
  component: Singnup,
})


