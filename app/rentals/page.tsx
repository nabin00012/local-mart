"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter } from "lucide-react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"

export default function RentalsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode")
    if (!postalCode) {
      router.push("/")
      return
    }

    // In a real app, you would fetch products based on the postal code
    // For demo purposes, we'll use mock data and filter for rentable items
    const rentableProducts = mockProducts.filter((product) => product.isRentable)
    setProducts(rentableProducts)
    setFilteredProducts(rentableProducts)
  }, [router])

  useEffect(() => {
    // Apply filters
    let result = products

    // Apply search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply price range (for rental price)
    result = result.filter((product) => product.rentalPrice! >= priceRange[0] && product.rentalPrice! <= priceRange[1])

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    setFilteredProducts(result)
  }, [searchQuery, priceRange, selectedCategories, products])

  const categories = Array.from(new Set(products.map((product) => product.category)))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Mobile filter toggle */}
        <div className="w-full md:hidden flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Rentals</h1>
          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Sidebar filters - desktop */}
        <div className="hidden md:block w-64 sticky top-24">
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            <h2 className="font-semibold text-lg">Filters</h2>

            <div className="space-y-4">
              <h3 className="font-medium">Daily Rental Price</h3>
              <Slider defaultValue={[0, 100]} max={100} step={5} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchQuery("")
                setPriceRange([0, 100])
                setSelectedCategories([])
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Mobile filters - collapsible */}
        {isFilterOpen && (
          <div className="md:hidden w-full bg-white rounded-lg shadow p-6 space-y-6 mb-4">
            <div className="space-y-4">
              <h3 className="font-medium">Daily Rental Price</h3>
              <Slider defaultValue={[0, 100]} max={100} step={5} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category))
                        }
                      }}
                    />
                    <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setPriceRange([0, 100])
                  setSelectedCategories([])
                }}
              >
                Reset
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsFilterOpen(false)}>
                Apply
              </Button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1">
          <div className="hidden md:block mb-6">
            <h1 className="text-3xl font-bold">Rentals</h1>
            <p className="text-gray-600">Rent tools and equipment from your neighbors</p>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search rentals..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">Showing {filteredProducts.length} results</div>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No rentals found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

