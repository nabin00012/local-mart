"use client"

import { Badge } from "@/components/ui/badge"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, SlidersHorizontal, Grid, List, X } from "lucide-react"
import ProductCard from "@/components/product-card"
import ProductListItem from "@/components/product-list-item"
import type { Product } from "@/lib/types"
import { mockProducts } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showRentableOnly, setShowRentableOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode")
    if (!postalCode) {
      router.push("/")
      return
    }

    // Get search query from URL if present
    const queryParam = searchParams.get("search")
    if (queryParam) {
      setSearchQuery(queryParam)
    }

    // In a real app, you would fetch products based on the postal code
    // For demo purposes, we'll use mock data
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
  }, [router, searchParams])

  useEffect(() => {
    // Apply filters
    let result = products

    // Apply search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply rentable filter
    if (showRentableOnly) {
      result = result.filter((product) => product.isRentable)
    }

    // Apply sorting
    result = sortProducts(result, sortBy)

    setFilteredProducts(result)
  }, [searchQuery, priceRange, selectedCategories, showRentableOnly, products, sortBy])

  const sortProducts = (productsToSort: Product[], sortOption: string) => {
    switch (sortOption) {
      case "price-low":
        return [...productsToSort].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...productsToSort].sort((a, b) => b.price - a.price)
      case "newest":
        return [...productsToSort].sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
      case "rating":
        return [...productsToSort].sort((a, b) => b.seller.rating - a.seller.rating)
      case "featured":
      default:
        return [...productsToSort].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  const categories = Array.from(new Set(products.map((product) => product.category)))

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 500])
    setSelectedCategories([])
    setShowRentableOnly(false)
    setSortBy("featured")
  }

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
        <p className="text-gray-600">Discover locally made products in your area</p>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 sticky top-24 self-start">
          <div className="bg-white rounded-xl shadow-soft p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
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
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rentable-only"
                  checked={showRentableOnly}
                  onCheckedChange={(checked) => setShowRentableOnly(!!checked)}
                />
                <Label htmlFor="rentable-only">Rentable items only</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters - Collapsible */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in">
            <div className="bg-white w-4/5 h-full overflow-y-auto animate-slide-in">
              <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range</h3>
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
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
                        <Label htmlFor={`mobile-category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mobile-rentable-only"
                      checked={showRentableOnly}
                      onCheckedChange={(checked) => setShowRentableOnly(!!checked)}
                    />
                    <Label htmlFor="mobile-rentable-only">Rentable items only</Label>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 md:flex-none">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <div className="flex items-center">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setShowRentableOnly(false)}>
                All Items
              </TabsTrigger>
              <TabsTrigger value="buy" onClick={() => setShowRentableOnly(false)}>
                Buy
              </TabsTrigger>
              <TabsTrigger value="rent" onClick={() => setShowRentableOnly(true)}>
                Rent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Active Filters */}
          {(selectedCategories.length > 0 ||
            showRentableOnly ||
            searchQuery ||
            priceRange[0] > 0 ||
            priceRange[1] < 500) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {showRentableOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Rentable Only
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setShowRentableOnly(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setPriceRange([0, 500])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  "{searchQuery}"
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSearchQuery("")}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Results count */}
          <div className="mb-4 text-sm text-gray-600">Showing {filteredProducts.length} results</div>

          {/* Product grid or list */}
          {filteredProducts.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-soft">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

