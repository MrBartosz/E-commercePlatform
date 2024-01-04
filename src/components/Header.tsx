import React from 'react'
import Navbar from './navbar/page'

export const Header: React.FC = () => {
  return (
    <header className='bg-gray-800 p-6'>
      <div className='text-white flex justify-between h-auto items-center'>
        <h1 className='text-xl font-bold'>E-commerce Platform</h1>
        <Navbar />
      </div>
    </header>
  )
}
