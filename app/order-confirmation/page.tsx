"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Package, Truck, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
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
  }, [router])

  // Mock order details
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000)
  const orderDate = new Date().toLocaleDateString()
  const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
        </div>

        <Card className="shadow-soft mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="font-semibold mb-2">Order Information</h2>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600">Order Number:</span> {orderNumber}
                  </p>
                  <p>
                    <span className="text-gray-600">Order Date:</span> {orderDate}
                  </p>
                  <p>
                    <span className="text-gray-600">Payment Method:</span> Credit Card
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Shipping Information</h2>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-gray-600">Shipping Method:</span> Standard Delivery
                  </p>
                  <p>
                    <span className="text-gray-600">Estimated Delivery:</span> {estimatedDelivery}
                  </p>
                  <p>
                    <span className="text-gray-600">Tracking Number:</span>{" "}
                    <span className="text-gray-500">Will be provided soon</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="font-semibold text-lg mb-4">Order Status</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="relative flex items-start mb-6 pl-10">
              <div className="absolute left-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Order Placed</h3>
                <p className="text-sm text-gray-600">Your order has been received and is being processed.</p>
                <p className="text-xs text-gray-500 mt-1">{orderDate}</p>
              </div>
            </div>

            <div className="relative flex items-start mb-6 pl-10">
              <div className="absolute left-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium">Order Processing</h3>
                <p className="text-sm text-gray-600">Your order is being prepared for shipping.</p>
                <p className="text-xs text-gray-500 mt-1">
                  Estimated: {new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="relative flex items-start pl-10">
              <div className="absolute left-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium">Order Shipped</h3>
                <p className="text-sm text-gray-600">Your order is on its way to you.</p>
                <p className="text-xs text-gray-500 mt-1">Estimated: {estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div>
            <p className="text-gray-600 mb-2">Have questions about your order?</p>
            <Link href="/contact" className="text-green-600 hover:underline">
              Contact Customer Support
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={() => router.push("/orders")}>
              View Order History
            </Button>
            <Button onClick={() => router.push("/marketplace")} className="bg-green-600 hover:bg-green-700">
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

