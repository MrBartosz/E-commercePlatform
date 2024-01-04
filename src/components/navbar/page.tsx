'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Navbar = () => {
  const { data: session } = useSession()

  const handleSignOut = async () => {
    showSuccessNotification('Logout Successful !')
    setTimeout(async () => {
      await signOut()
    }, 600)
  }

  const handleSignIn = async () => {
    await signIn()
  }

  const showSuccessNotification = (message: string) => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  return (
    <>
      {session ? (
        <div className='flex gap-20'>
          <p>Welcome {session?.user?.name}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </>
  )
}

export default Navbar
