export interface User {
  id: string
  name: string
  email: string
  postalCode: string
  address?: string
  phone?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  rentalPrice?: number
  category: string
  image: string
  seller: {
    id: string
    name: string
    rating: number
  }
  isRentable: boolean
  isAvailable: boolean
  location: string
}

export interface Order {
  id: string
  userId: string
  items: {
    productId: string
    name: string
    price: number
    quantity: number
    isRental: boolean
    rentalDays?: number
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
}

