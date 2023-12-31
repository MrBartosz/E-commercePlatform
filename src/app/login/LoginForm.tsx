import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import cookie from 'cookie'

interface LoginFormProps {
  onLogin: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email === 'admin@example.com' && password === 'admin') {
      document.cookie = cookie.serialize('isLoggedIn', 'true', {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      onLogin()
      router.push('/')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  const handleRegisterClick = () => {
    router.push('/signIn')
  }

  useEffect(() => {
    const isLoggedIn = document.cookie.includes('isLoggedIn=true')

    if (isLoggedIn) {
      onLogin()
    }
  }, [onLogin])

  return (
    <div className='flex items-center justify-center mt-20'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md p-4 bg-white rounded shadow-md'
      >
        <label className='block mb-2'>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className='w-full p-2 border rounded mt-1'
            required
          />
        </label>
        <label className='block mb-2'>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className='w-full p-2 border rounded mt-1'
            required
          />
        </label>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex justify-center gap-5'>
          <button
            type='submit'
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2'
          >
            Login
          </button>
          <button
            type='button'
            className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-2'
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm