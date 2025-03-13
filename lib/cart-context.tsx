"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"

interface CartItem {
  product: Product
  quantity: number
  isRental: boolean
  rentalDays?: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity: number, isRental: boolean, rentalDays?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart))
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error)
        }
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addItem = (product: Product, quantity: number, isRental: boolean, rentalDays?: number) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.isRental === isRental,
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        if (isRental && rentalDays) {
          updatedItems[existingItemIndex].rentalDays = rentalDays
        }
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, quantity, isRental, rentalDays }]
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.isRental
        ? item.product.rentalPrice! * (item.rentalDays || 1) * item.quantity
        : item.product.price * item.quantity
      return total + itemPrice
    }, 0)
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

