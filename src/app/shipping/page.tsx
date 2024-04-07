'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CartContext } from '@/contexts/CartContext'

interface ShippingFormData {
  name: string
  address: string
  city: string
  postalCode: string
  email: string
  phone: string
  shippingMethod: string
}

const ShippingForm = () => {
  const { cartItems, quantities } = useContext(CartContext)
  const [formData, setFormData] = useState<ShippingFormData>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    shippingMethod: '',
  })
  const [totalCost, setTotalCost] = useState<number>(0)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.replace('/payment')
  }

  const handleBack = () => {
    router.replace('/basketPage')
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0)
    }, 0)
  }

  useEffect(() => {
    const totalPrice = calculateTotalPrice()
    setTotalCost(totalPrice)
  }, [cartItems, quantities])

  return (
    <form
      onSubmit={handleSubmit}
      className='mx-auto max-w-md mt-10'
    >
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Full Name:</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Address:</label>
        <input
          type='text'
          name='address'
          value={formData.address}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>City:</label>
        <input
          type='text'
          name='city'
          value={formData.city}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Postal Code:</label>
        <input
          type='text'
          name='postalCode'
          value={formData.postalCode}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Phone:</label>
        <input
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Shipping Method:</label>
        <select
          name='shippingMethod'
          value={formData.shippingMethod}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        >
          <option value=''>Select Shipping Method</option>
          <option value='standard'>Standard Shipping</option>
          <option value='express'>Express Shipping</option>
        </select>
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold mb-2'>Order Summary</h2>
        <ul className='divide-y divide-gray-300'>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className='py-2'
            >
              <div className='flex justify-between items-center'>
                <p className='text-sm'>{item.name}</p>
                <p className='text-sm'>Quantity: {quantities[item.id] || 0}</p>
                <p className='text-sm'>${(item.price * (quantities[item.id] || 0)).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className='text-lg font-semibold mt-4'>Total Cost: ${totalCost.toFixed(2)}</p>
      </div>

      <div className='flex justify-center'>
        <button
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4 mr-4'
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type='submit'
          className='bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline my-4'
        >
          Continue
        </button>
      </div>
    </form>
  )
}

export default ShippingForm
