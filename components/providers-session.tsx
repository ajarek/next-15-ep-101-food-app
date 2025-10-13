import { SessionProvider } from 'next-auth/react'

export default function ProvidersSession({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
