'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resUserExists = await fetch('api/auth/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const { user } = await resUserExists.json()

      if (user) {
        setError('User already exists.')
        return
      }

      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (res.ok) {
        const form = e.target
        form.reset()
        router.push('/')
      } else {
        console.log('User registration failed.', error)
      }
    } catch (error) {
      console.log('Error during registration: ', error)
    }
  }

  const handleHaveAccountButton = () => {
    router.push('/')
  }
  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-96'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-3'
        >
          <label className='block mb-2'>
            <input
              onChange={(e) => setName(e.target.value)}
              type='text'
              name='username'
              placeholder='Full Name'
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <label className='block mb-2'>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              name='email'
              placeholder='Email'
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <label className='block mb-2'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='password'
              placeholder='Password'
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <div className='flex justify-center gap-5'>
            <button
              type='submit'
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full'
            >
              Register
            </button>
          </div>
          {error && <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>}
          <div className='flex justify-end align-center mt-7'>
            <a
              href='#'
              onClick={handleHaveAccountButton}
              className='text-black-500'
            >
              I already have an account
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
