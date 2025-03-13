"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Trash2, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

export default function WishlistPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  useEffect(() => {
    // Check if user has entered a postal code
    const postalCode = localStorage.getItem("userPostalCode");
    if (!postalCode) {
      router.push("/");
      return;
    }
    
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to view your wishlist",
        duration: 3000,
      });
      router.push("/auth/login");
      return;
    }
    
    // In a real app, you would fetch the user's wishlist from an API
    // For demo purposes, we'll use a subset of mock products
    setWishlistItems(mockProducts.slice(0, 4));
  }, [router, toast]);
  
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from wishlist",
      description: "Product has been removed from your wishlist",
      duration: 3000,
    });
  };
  
  const handleAddToCart = (product: Product) => {
    addItem(product, 1, false);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
      <p className="text-gray-600 mb-8">
        Items you've saved for later
      </p>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">
            Save items you like by clicking the heart icon on product pages
          </p>
          <Button 
            onClick={() => router.push("/marketplace")}
            className="bg-green-600 hover:bg-green-700"
          >
            Explore Products
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlistItems.map(product => (
            <Card key={product.id} className="shadow-soft overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-48 md:w-56">
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=400"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                    
                    {product.isRentable && (
                      <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
                        Available for Rent
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {product.category}
                      </Badge>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{product.seller.rating.toFixed(1)}</span>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description}</p>
                    
                    <div className="flex flex-wrap items-center justify-\

