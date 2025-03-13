"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, ShoppingBag } from "lucide-react"
import type { Order } from "@/lib/types"
import { mockOrders } from "@/lib/mock-data"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode")
    if (!postalCode) {
      router.push("/")
      return
    }

    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/auth/login")
      return
    }

    // In a real app, you would fetch orders from an API
    // For demo purposes, we'll use mock data
    setOrders(mockOrders)
    setIsLoading(false)
  }, [router])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Button onClick={() => router.push("/marketplace")} className="bg-green-600 hover:bg-green-700">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Package className="h-10 w-10 text-gray-400" />
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            {item.isRental && item.rentalDays && (
                              <p className="text-sm text-blue-600">
                                Rental: {item.rentalDays} day{item.rentalDays !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            $
                            {(
                              item.price *
                              item.quantity *
                              (item.isRental && item.rentalDays ? item.rentalDays : 1)
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

