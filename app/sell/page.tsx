"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SellPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [isRentable, setIsRentable] = useState(false)
  const [rentalPrice, setRentalPrice] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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
      toast({
        title: "Please log in",
        description: "You need to be logged in to sell products",
        duration: 3000,
      })
      router.push("/auth/login")
    }
  }, [router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!name.trim() || !description.trim() || !price.trim() || !category) {
      setError("Please fill in all required fields")
      return
    }

    if (isNaN(Number.parseFloat(price)) || Number.parseFloat(price) <= 0) {
      setError("Please enter a valid price")
      return
    }

    if (isRentable && (isNaN(Number.parseFloat(rentalPrice)) || Number.parseFloat(rentalPrice) <= 0)) {
      setError("Please enter a valid rental price")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call to create the product
      // For demo purposes, we'll simulate a successful creation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product listed successfully",
        description: "Your product has been listed on LocalMart",
        duration: 3000,
      })

      // Reset form
      setName("")
      setDescription("")
      setPrice("")
      setCategory("")
      setIsRentable(false)
      setRentalPrice("")

      // Redirect to marketplace
      router.push("/marketplace")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sell Your Product</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Fill in the details about the product you want to sell or rent</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="rentable" checked={isRentable} onCheckedChange={setIsRentable} />
              <Label htmlFor="rentable">Available for rent</Label>
            </div>

            {isRentable && (
              <div className="space-y-2">
                <Label htmlFor="rentalPrice">Daily Rental Price ($) *</Label>
                <Input
                  id="rentalPrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  required={isRentable}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your images here, or click to browse</p>
                <Button type="button" variant="outline" size="sm">
                  Upload Images
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Listing Product...
                </>
              ) : (
                "List Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

