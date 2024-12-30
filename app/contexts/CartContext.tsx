'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { items } from '@/lib/items'

type CartItem = {
  id: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { id, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return prevCart.filter(item => item.id !== id)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const item = items.find(i => i.id === cartItem.id)
      return total + (item?.price || 0) * cartItem.quantity
    }, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

