'use client'
import React, { createContext, ReactNode, useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
}
interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
}

const defaultState: CartContextType = {
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
}
type UserProvideProps = {
  children: ReactNode
}

export const CartContext = createContext(defaultState)

export const CartProvider = ({ children }: UserProvideProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems([...cartItems, item])
  }

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}
