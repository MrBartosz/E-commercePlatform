import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import LoginForm from '@/components/LoginForm'
import { authOptions } from './api/auth/[...nextauth]/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) redirect('/dashboard')

  return (
    <main>
      <LoginForm />
    </main>
  )
}
