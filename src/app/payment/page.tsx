'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const PaymentPage = () => {
  const router = useRouter()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)

  const handleBack = () => {
    router.replace('/shipping')
  }

  const handleFakePayment = () => {
    setIsProcessingPayment(true)
    setTimeout(() => {
      setIsProcessingPayment(false)
      setIsPaymentSuccessful(true)
      setTimeout(() => {
        setIsPaymentSuccessful(false)
      }, 3000)
    }, 3000)
  }
  return (
    <div className='text-center mt-10'>
      <h1 className='text-3xl font-bold'>Fake Payment</h1>
      <p className='mt-4'>This is a trial version. You do not need to enter any details.</p>
      <p>Click Fake Pay button below to simulate the payment.</p>
      <button
        className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4 mr-4'
        onClick={handleBack}
      >
        Back
      </button>
      <button
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleFakePayment}
        disabled={isProcessingPayment}
      >
        {isProcessingPayment ? 'Processing...' : 'Fake Pay'}
      </button>
      {isPaymentSuccessful && <p className='text-green-500 mt-4'>Payment simulation successful!</p>}
    </div>
  )
}
export default PaymentPage
