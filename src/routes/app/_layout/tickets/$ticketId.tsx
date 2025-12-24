import Ticket from '@/features/tickets/components/Ticket'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_layout/tickets/$ticketId')({
  component: Ticket,
})

