"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Truck,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  Heart,
  Share2,
  Clock,
  ThumbsUp,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { mockProducts } from "@/lib/mock-data"
import ProductCard from "@/components/product-card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [rentalDays, setRentalDays] = useState(1)
  const [tab, setTab] = useState("buy")
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isWishlist, setIsWishlist] = useState(false)
  const { toast } = useToast()
  const { addItem } = useCart()

  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode")
    if (!postalCode) {
      router.push("/")
      return
    }

    // In a real app, you would fetch the product from an API
    // For demo purposes, we'll use mock data
    const foundProduct = mockProducts.find((p) => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      if (!foundProduct.isRentable) {
        setTab("buy")
      }
    } else {
      // Product not found
      router.push("/marketplace")
    }
  }, [id, router])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const handleRentalDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setRentalDays(value)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    const isRental = tab === "rent"
    addItem(product, quantity, isRental, isRental ? rentalDays : undefined)

    toast({
      title: `Added to cart`,
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist)

    toast({
      title: isWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlist ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    })
  }

  const handleShare = () => {
    // In a real app, you would implement social sharing functionality
    toast({
      title: "Share link copied",
      description: "Product link has been copied to clipboard.",
      duration: 3000,
    })
  }

  // Mock product images
  const productImages = [
    product?.image || "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600&text=Image+2",
    "/placeholder.svg?height=600&width=600&text=Image+3",
    "/placeholder.svg?height=600&width=600&text=Image+4",
  ]

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2023-12-15",
      comment:
        "Absolutely love this product! The quality is exceptional and it arrived quickly. Would definitely recommend to anyone looking for locally made items.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Michael Chen",
      rating: 4,
      date: "2023-11-28",
      comment:
        "Great product overall. The craftsmanship is excellent. Took off one star because delivery was a day late, but the seller was very communicative about it.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Jessica Williams",
      rating: 5,
      date: "2023-10-10",
      comment:
        "This exceeded my expectations! The attention to detail is amazing and it's clear that a lot of care went into making this. Supporting local businesses has never felt better.",
      helpful: 15,
    },
  ]

  if (!product) {
    return (
      <div className="container-custom py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-soft relative">
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src={productImages[activeImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>

            {activeImageIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={() => setActiveImageIndex(activeImageIndex - 1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            {activeImageIndex < productImages.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                onClick={() => setActiveImageIndex(activeImageIndex + 1)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 ${
                  activeImageIndex === index ? "border-green-600" : "border-transparent"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.category}</Badge>
              {product.isRentable && (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Available for Rent</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.seller.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.seller.rating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.location}</span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleToggleWishlist}>
                <Heart className={`h-4 w-4 ${isWishlist ? "fill-red-500 text-red-500" : ""}`} />
                {isWishlist ? "Saved" : "Save"}
              </Button>

              <Button variant="outline" className="flex items-center gap-2" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Buy or Rent Tabs */}
            {product.isRentable ? (
              <Card className="shadow-soft">
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="buy" className="flex-1">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="rent" className="flex-1">
                      Rent
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy" className="p-6">
                    <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-24">
                        <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                      </div>
                      <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 flex-1">
                        Add to Cart
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="rent" className="p-6">
                    <div className="text-2xl font-bold mb-4">${product.rentalPrice?.toFixed(2)}/day</div>
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <label className="w-24">Days:</label>
                        <Input
                          type="number"
                          min="1"
                          value={rentalDays}
                          onChange={handleRentalDaysChange}
                          className="w-24"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="w-24">Quantity:</label>
                        <Input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                          className="w-24"
                        />
                      </div>
                      <div className="text-lg font-semibold">
                        Total: ${(product.rentalPrice! * rentalDays * quantity).toFixed(2)}
                      </div>
                      <Button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 w-full">
                        Rent Now
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            ) : (
              <Card className="shadow-soft">
                <div className="p-6">
                  <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>
                  <div className="flex items-center gap-4">
                    <div className="w-24">
                      <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                    </div>
                    <Button onClick={handleAddToCart} className="bg-green-600 hover:bg-green-700 flex-1">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Shipping and Returns */}
            <div className="mt-6 space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-base font-medium">Shipping & Delivery</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Local Delivery</h3>
                          <p className="text-sm text-gray-600">
                            Available within your postal code area. Usually delivered within 1-2 days.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Delivery Times</h3>
                          <p className="text-sm text-gray-600">
                            Monday to Friday: 9am - 8pm
                            <br />
                            Saturday: 10am - 6pm
                            <br />
                            Sunday: Not available
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionTrigger className="text-base font-medium">Returns & Refunds</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-gray-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Satisfaction Guaranteed</h3>
                        <p className="text-sm text-gray-600">
                          Not satisfied with your purchase? Return within 7 days for a full refund. Please note that
                          items must be in their original condition and packaging.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">About the Seller</h2>
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
                {product.seller.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{product.seller.name}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < product.seller.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.seller.rating.toFixed(1)} · Seller since 2022
                  </span>
                </div>
                <p className="text-gray-700">
                  Local seller specializing in {product.category.toLowerCase()} products. All items are made or sourced
                  locally within the community.
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">Contact Seller</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-64 flex flex-col items-center">
              <div className="text-5xl font-bold mb-2">{product.seller.rating.toFixed(1)}</div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < product.seller.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{reviews.length} reviews</p>
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = reviews.filter((r) => r.rating === rating).length
                  const percentage = (count / reviews.length) * 100

                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">{percentage.toFixed(0)}%</div>
                    </div>
                  )
                })}
              </div>

              <Button className="mt-6">Write a Review</Button>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{review.user}</div>
                  <div className="text-gray-500 text-sm">· {new Date(review.date).toLocaleDateString()}</div>
                </div>

                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700">{review.comment}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700">
                    <MessageSquare className="h-4 w-4" />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="mt-6 w-full">
            Load More Reviews
          </Button>
        </div>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts
            .filter((p) => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </div>
    </div>
  )
}

