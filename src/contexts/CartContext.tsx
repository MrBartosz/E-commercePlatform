'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  image: { url: string }
}
interface CartContextType {
  cartItems: CartItem[]
  quantities: { [itemId: number]: number }
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
  increaseQuantity: (itemId: number) => void
  decreaseQuantity: (itemId: number) => void
  totalPrice: number
}

const defaultState: CartContextType = {
  cartItems: [],
  quantities: {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  totalPrice: 0,
}

type UserProvideProps = {
  children: ReactNode
}

export const CartContext = createContext(defaultState)

export const CartProvider = ({ children }: UserProvideProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [quantities, setQuantities] = useState<{ [itemId: number]: number }>({})
  const [totalPrice, setTotalPrice] = useState<number>(0)

  const addToCart = (item: CartItem) => {
    const itemId = item.id
    if (quantities[itemId] !== undefined) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] + 1,
      }))
    } else {
      setCartItems([...cartItems, item])
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: 1,
      }))
    }
  }

  const removeFromCart = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities }
      delete newQuantities[itemId]
      return newQuantities
    })
  }

  const clearCart = () => {
    setCartItems([])
    setQuantities({})
  }

  const increaseQuantity = (itemId: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }))
  }

  const decreaseQuantity = (itemId: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max((prevQuantities[itemId] || 0) - 1, 0)
      if (newQuantity === 0) {
        removeFromCart(itemId)
      }
      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      }
    })
  }

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0)
    }, 0)
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice())
  }, [cartItems, quantities])

  return (
    <CartContext.Provider
      value={{ cartItems, quantities, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}
