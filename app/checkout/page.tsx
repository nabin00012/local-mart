"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Wallet, Truck, ArrowLeft, ShieldCheck, Clock, AlertCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotal, clearCart } = useCart()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check if user has entered a postal code
    const userPostalCode = localStorage.getItem("userPostalCode")
    if (!userPostalCode) {
      router.push("/")
      return
    }

    // Check if cart is empty
    if (items.length === 0) {
      router.push("/cart")
      return
    }

    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to checkout",
        duration: 3000,
      })
      router.push("/auth/login?redirect=/checkout")
      return
    }

    // Pre-fill user information
    try {
      const userData = JSON.parse(user)
      setName(userData.name || "")
      setEmail(userData.email || "")
      setPhone(userData.phone || "")
      setAddress(userData.address || "")
      setPostalCode(userData.postalCode || userPostalCode)
    } catch (err) {
      console.error("Failed to parse user data:", err)
    }
  }, [router, items.length, toast])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    if (!phone.trim()) newErrors.phone = "Phone is required"
    if (!address.trim()) newErrors.address = "Address is required"
    if (!city.trim()) newErrors.city = "City is required"
    if (!postalCode.trim()) newErrors.postalCode = "Postal code is required"

    if (paymentMethod === "card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!cardName.trim()) newErrors.cardName = "Name on card is required"
      if (!cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required"
      if (!cardCvc.trim()) newErrors.cardCvc = "CVC is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please check your information",
        description: "Some required fields are missing or invalid",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsProcessing(true)

    try {
      // In a real app, you would make an API call to process the payment and create the order
      // For demo purposes, we'll simulate a successful order
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart
      clearCart()

      // Redirect to order confirmation
      router.push("/order-confirmation")
    } catch (err) {
      toast({
        title: "Error processing order",
        description: "An error occurred while processing your order. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const subtotal = getTotal()
  const deliveryFee = deliveryOption === "express" ? 9.99 : 4.99
  const tax = subtotal * 0.1
  const total = subtotal + deliveryFee + tax

  return (
    <div className="container-custom py-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/cart")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Button>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="US">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Special instructions for delivery"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="standard" id="standard" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="flex items-center cursor-pointer">
                          <Truck className="h-5 w-5 mr-2 text-gray-600" />
                          <div>
                            <span className="font-medium">Standard Delivery</span>
                            <span className="ml-2 text-sm text-gray-500">($4.99)</span>
                          </div>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">Estimated delivery in 2-3 business days</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value="express" id="express" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="flex items-center cursor-pointer">
                          <Clock className="h-5 w-5 mr-2 text-gray-600" />
                          <div>
                            <span className="font-medium">Express Delivery</span>
                            <span className="ml-2 text-sm text-gray-500">($9.99)</span>
                          </div>
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">Estimated delivery in 1 business day</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="cod" className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Cash on Delivery
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=16&width=16&text=W"
                        width={16}
                        height={16}
                        alt="Wallet"
                        className="h-4 w-4"
                      />
                      Digital Wallet
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className={errors.cardNumber ? "border-red-500" : ""}
                      />
                      {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className={errors.cardName ? "border-red-500" : ""}
                      />
                      {errors.cardName && <p className="text-sm text-red-500">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input
                          id="cardExpiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className={errors.cardExpiry ? "border-red-500" : ""}
                        />
                        {errors.cardExpiry && <p className="text-sm text-red-500">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC *</Label>
                        <Input
                          id="cardCvc"
                          placeholder="123"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className={errors.cardCvc ? "border-red-500" : ""}
                        />
                        {errors.cardCvc && <p className="text-sm text-red-500">{errors.cardCvc}</p>}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="savePaymentInfo"
                        checked={savePaymentInfo}
                        onCheckedChange={(checked) => setSavePaymentInfo(!!checked)}
                      />
                      <Label htmlFor="savePaymentInfo" className="text-sm">
                        Save this card for future purchases
                      </Label>
                    </div>

                    <div className="flex items-center pt-2">
                      <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-sm text-gray-600">Your payment information is secure and encrypted</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="cod">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Wallet className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div>
                          <h3 className="font-semibold">Cash on Delivery</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Pay with cash when your order is delivered. Please ensure you have the exact amount ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="wallet">
                    <div className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Please connect your digital wallet to continue with this payment method.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                          <Image src="/placeholder.svg?height=24&width=24&text=P" width={24} height={24} alt="PayPal" />
                          <span className="text-sm mt-1">PayPal</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=24&width=24&text=A"
                            width={24}
                            height={24}
                            alt="Apple Pay"
                          />
                          <span className="text-sm mt-1">Apple Pay</span>
                        </Button>
                        <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
                          <Image
                            src="/placeholder.svg?height=24&width=24&text=G"
                            width={24}
                            height={24}
                            alt="Google Pay"
                          />
                          <span className="text-sm mt-1">Google Pay</span>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="shadow-soft sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.isRental}`} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.isRental
                          ? `Rental: ${item.rentalDays} day(s) x ${item.quantity}`
                          : `Qty: ${item.quantity}`}
                      </p>
                    </div>
                    <p className="font-medium">
                      $
                      {item.isRental
                        ? (item.product.rentalPrice! * item.rentalDays! * item.quantity).toFixed(2)
                        : (item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 py-6"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>

              <div className="text-sm text-gray-600">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

