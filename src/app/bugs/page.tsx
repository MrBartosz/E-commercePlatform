'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Bugs = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || session?.user?.email !== 'admin@example.com') {
    return null
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-4'>Bug Reports</h1>
      <p className='text-lg mb-4'>Below are the user-reported bugs that need to be fixed:</p>
      <div className='flex gap-5'>{/* Bug list will go here */}</div>
    </div>
  )
}

export default Bugs
