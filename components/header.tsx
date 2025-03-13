"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, User, MapPin, Heart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postalCode, setPostalCode] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const { toast } = useToast()
  const { items } = useCart()

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // Check if user is logged in
      const user = localStorage.getItem("user")
      setIsLoggedIn(!!user)

      // Get postal code
      const userPostalCode = localStorage.getItem("userPostalCode")
      setPostalCode(userPostalCode)
    }
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      setIsLoggedIn(false)
      toast({
        title: "Logged out successfully",
        duration: 3000,
      })
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, you would redirect to search results page with the query
      window.location.href = `/marketplace?search=${encodeURIComponent(searchQuery)}`
    }
  }

  // Don't show header on the landing page
  if (pathname === "/") return null

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/marketplace" className="flex items-center">
              <span className="text-2xl font-bold text-green-600">LocalMart</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for products, categories, or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>

          {postalCode && (
            <div className="hidden lg:flex items-center text-sm text-gray-600 mx-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Serving area: {postalCode}</span>
            </div>
          )}

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 px-2">
              Shop
            </Link>
            <Link href="/rentals" className="text-gray-700 hover:text-green-600 px-2">
              Rent
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-green-600 px-2">
              Sell
            </Link>

            <Link href="/wishlist" className="relative p-2">
              <Heart className="h-5 w-5 text-gray-700 hover:text-green-600" />
            </Link>

            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-green-600" />
              {items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600 text-white">
                  {items.length}
                </Badge>
              )}
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/vendor/dashboard">Vendor Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {items.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-green-600 text-white">
                  {items.length}
                </Badge>
              )}
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 animate-slide-in">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200 animate-slide-in">
            <Link
              href="/marketplace"
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/rentals"
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Rent
            </Link>
            <Link
              href="/sell"
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              href="/wishlist"
              className="block py-2 text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/vendor/dashboard"
                  className="block py-2 text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block py-2 text-gray-700 hover:text-green-600 w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {postalCode && (
              <div className="py-2 text-sm text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Serving area: {postalCode}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

