import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import RegisterForm from '@/components/RegisterForm'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/dashboard')
  }
  return <RegisterForm />
}
