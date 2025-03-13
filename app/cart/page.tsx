"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode")
    if (!postalCode) {
      router.push("/")
    }
  }, [router])

  const handleCheckout = () => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout",
        duration: 3000,
      })
      router.push("/auth/login")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order.",
        duration: 3000,
      })
      clearCart()
      router.push("/orders")
      setIsCheckingOut(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => router.push("/marketplace")} className="bg-green-600 hover:bg-green-700">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({items.length})</h2>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.isRental}`} className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24">
                        <Image
                          src={item.product.image || "/placeholder.svg?height=100&width=100"}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/product/${item.product.id}`} className="font-semibold hover:text-green-600">
                            {item.product.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">Sold by {item.product.seller.name}</p>

                        {item.isRental ? (
                          <div className="text-sm text-blue-600">
                            Rental: {item.rentalDays} day{item.rentalDays !== 1 ? "s" : ""} @ $
                            {item.product.rentalPrice?.toFixed(2)}/day
                          </div>
                        ) : (
                          <div className="text-sm">${item.product.price.toFixed(2)}</div>
                        )}

                        <div className="flex items-center mt-2">
                          <span className="text-sm mr-2">Qty:</span>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const value = Number.parseInt(e.target.value)
                              if (!isNaN(value) && value > 0) {
                                updateQuantity(item.product.id, value)
                              }
                            }}
                            className="w-16 h-8 text-sm"
                          />
                        </div>
                      </div>

                      <div className="text-right font-semibold">
                        $
                        {item.isRental
                          ? (item.product.rentalPrice! * item.rentalDays! * item.quantity).toFixed(2)
                          : (item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(getTotal() * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(getTotal() * 1.1).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                  {!isCheckingOut && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push("/marketplace")}>
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

