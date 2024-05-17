'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from './navbar/page'

export const Header: React.FC = () => {
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(0)

  const handleLogoClick = () => {
    router.push('/products')
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className='bg-gray-800 p-6'>
      <div className='text-white flex justify-between h-auto items-center'>
        <h1
          className='text-xl font-bold cursor-pointer'
          onClick={handleLogoClick}
        >
          {windowWidth >= 585 ? 'E-commerce Platform' : 'Home'}
        </h1>
        <Navbar />
      </div>
    </header>
  )
}

export default Header
