import OTP from '@/features/auth/components/OTP'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/otp')({
  component: OTP,
})
