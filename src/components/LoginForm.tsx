'use client'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  const [isLoginFailed, setIsLoginFailed] = useState(false)
  const router = useRouter()

  const handleSignIn = async (email: string, password: string) => {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (response?.ok) {
      router.push('/dashboard')
      setIsLoginFailed(false)
    } else {
      console.error('Error during login:', response?.error)
      setIsLoginFailed(true)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    await handleSignIn(email, password)
  }

  const handleRegisterClick = () => {
    router.push('/register')
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
              name='email'
              type='email'
              placeholder='Email'
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <label className='block mb-2'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <div className='flex justify-center gap-5'>
            <button
              type='submit'
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2 w-full'
            >
              Login
            </button>
          </div>
          {isLoginFailed && <p className='text-red-500 mt-2 flex justify-center'>Wrong Credentials. Try Again</p>}
          <div className='flex justify-center align-center mt-7'>
            <Link
              href='/forget-password'
              className='text-black-500 cursor-pointer'
            >
              Forgot Password
            </Link>
          </div>
          <div className='flex justify-end align-center mt-7'>
            <a
              onClick={handleRegisterClick}
              className='text-black-500 mt-2 cursor-pointer'
            >
              No Account? <u>Register</u>
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
export default LoginForm
