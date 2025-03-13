"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Clock } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlist, setIsWishlist] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product, 1, false)

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsWishlist(!isWishlist)

    toast({
      title: isWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlist ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    })
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-hover card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=400"}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover"
          />

          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={handleToggleWishlist}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <Heart className={`h-5 w-5 ${isWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </button>
          </div>

          {product.isRentable && (
            <Badge className="absolute top-3 left-3 bg-blue-500 text-white">Available for Rent</Badge>
          )}

          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs font-normal">
              {product.category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{product.seller.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              {product.isRentable && (
                <div className="flex items-center text-sm text-blue-600">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>${product.rentalPrice?.toFixed(2)}/day</span>
                </div>
              )}
            </div>

            <Badge variant="outline" className="text-xs">
              {product.location}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}

