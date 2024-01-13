'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const ResetPassword = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const { data: session, status: sessionStatus } = useSession()

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/dashboard')
    }
  }, [sessionStatus, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value

    if (!isValidEmail(email)) {
      setError('Email is invalid')
      return
    }
    try {
      const res = await fetch('api/auth/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      if (res.status === 400) {
        setError('User with this email is not registered.')
      }
      if (res.status === 200) {
        setError('')
        router.push('/')
      }
    } catch (error) {
      setError('Error, try again')
      console.log(error)
    }
  }

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.push('/')
    }
  }, [sessionStatus, router])

  if (sessionStatus === 'loading') {
    return <h1>Loading...</h1>
  }

  return (
    sessionStatus !== 'authenticated' && (
      <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-96'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3'
          >
            <label className='block mb-2'>
              Email:
              <input
                name='email'
                type='email'
                className='w-full p-2 border rounded mt-1'
                required
              />
            </label>
            <button
              type='submit'
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2 w-full'
            >
              Submit
            </button>
            {error && <p className='text-red-500 mt-2 flex justify-center'>{error}</p>}
            <div className='flex justify-end align-center mt-7'>
              <Link
                href='/'
                className='text-black-500 cursor-pointer'
              >
                Back To Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  )
}
export default ResetPassword
