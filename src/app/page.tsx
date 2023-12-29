import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex justify-center bg-green-500'>
      <Link
        className='p-3 text-xl text-white'
        href='/home'
      >
        signIn
      </Link>
    </main>
  )
}
