"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, ArrowLeft, Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [isRentable, setIsRentable] = useState(false)
  const [rentalPrice, setRentalPrice] = useState("")
  const [location, setLocation] = useState("")
  const [inventory, setInventory] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("basic")
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
        description: "You need to be logged in to add products",
        duration: 3000,
      })
      router.push("/auth/login")
    }
  }, [router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!name.trim() || !description.trim() || !price.trim() || !category || !location) {
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
        title: "Product created successfully",
        description: "Your product has been listed on LocalMart",
        duration: 3000,
      })

      // Redirect to vendor dashboard
      router.push("/vendor/dashboard?tab=products")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddImage = () => {
    // In a real app, you would handle file uploads
    // For demo purposes, we'll add a placeholder image
    setImages([...images, `/placeholder.svg?height=200&width=200&text=Image+${images.length + 1}`])
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="container-custom py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.push("/vendor/dashboard?tab=products")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
        <p className="text-gray-600 mb-8">Create a new product listing to sell or rent on LocalMart</p>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Card className="shadow-soft mb-8">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
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
                      rows={6}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Provide a detailed description of your product. Include materials, dimensions, and any other
                      relevant information.
                    </p>
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

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Downtown, Westside, etc."
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Specify the neighborhood or area within your postal code where the product is available.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("pricing")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next: Pricing & Inventory
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="inventory">Inventory Quantity *</Label>
                      <Input
                        id="inventory"
                        type="number"
                        min="1"
                        step="1"
                        value={inventory}
                        onChange={(e) => setInventory(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="rentable" className="text-base">
                          Available for Rent
                        </Label>
                        <p className="text-sm text-gray-500">Allow customers to rent this product on a daily basis</p>
                      </div>
                      <Switch id="rentable" checked={isRentable} onCheckedChange={setIsRentable} />
                    </div>

                    {isRentable && (
                      <div className="space-y-2 pl-6 border-l-2 border-gray-100">
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
                        <p className="text-sm text-gray-500">Set the price for renting this product for one day</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("basic")}>
                      Back: Basic Info
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("images")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next: Images
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-6">
                  <div className="space-y-4">
                    <Label>Product Images</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden border aspect-square">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors aspect-square"
                      >
                        <Plus className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Add Image</span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Add up to 8 images of your product. The first image will be used as the cover image.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("pricing")}>
                      Back: Pricing & Inventory
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Product...
                        </>
                      ) : (
                        "Create Product"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

