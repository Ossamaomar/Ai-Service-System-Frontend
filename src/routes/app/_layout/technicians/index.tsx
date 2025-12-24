import Technicians from '@/features/users/components/Technicians'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_layout/technicians/')({
  component: Technicians,
})
