'use client'
import React, { useContext } from 'react'
import { CartContext } from '@/contexts/CartContext'

const BasketPage = () => {
  const { cartItems } = useContext(CartContext)
  const totalItems = cartItems.length

  return <div>Total items in cart: {totalItems}</div>
}
export default BasketPage
