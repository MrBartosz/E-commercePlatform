'use client'
import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  name: string
  email: string
  password: string
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  })

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className='flex items-center justify-center mt-20'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md p-4 bg-white rounded shadow-md'
      >
        <label className='block mb-2'>
          Name:
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full p-2 border rounded mt-1'
            required
          />
        </label>

        <label className='block mb-2'>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full p-2 border rounded mt-1'
            required
          />
        </label>

        <label className='block mb-2'>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full p-2 border rounded mt-1'
            required
          />
        </label>

        <button
          type='submit'
          className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default SignInPage
