'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AdminDashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session || session?.user?.email !== 'admin@example.com') {
    return null
  }
  const handleManageProducts = () => {
    router.push('/products')
  }
  const handleManageBugs = () => {
    router.push('/bugs')
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center mx-4'>
      <h1 className='text-3xl font-bold mb-4'>Welcome, {session.user.name}!</h1>
      <p className='text-lg text-gray-600 mb-8'>You are logged in as an administrator. You have additional functionalities.</p>
      <div className='flex gap-5'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          onClick={handleManageProducts}
        >
          View Products
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
          onClick={handleManageBugs}
        >
          View Bugs
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
