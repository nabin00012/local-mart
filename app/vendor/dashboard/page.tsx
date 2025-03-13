"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockProducts, mockOrders } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Separator } from "@/components/ui/separator"

export default function VendorDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

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

    // Filter products to only show those from the current seller
    // In a real app, you would fetch products for the current seller from an API
    setFilteredProducts(mockProducts.filter((product) => product.seller.id === "seller1"))
  }, [router])

  // Mock statistics
  const stats = {
    totalSales: 1245.67,
    totalOrders: 24,
    pendingOrders: 5,
    totalProducts: filteredProducts.length,
    totalCustomers: 18,
    revenue: {
      today: 145.99,
      week: 876.5,
      month: 3245.75,
    },
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Vendor Dashboard</h1>
          <p className="text-gray-600">Manage your products, orders, and store performance</p>
        </div>

        <Button onClick={() => router.push("/vendor/products/new")} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 hidden md:flex">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Sales</p>
                    <h3 className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</h3>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                    <p className="text-xs text-green-600 mt-1">{stats.pendingOrders} pending</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Products</p>
                    <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                    <p className="text-xs text-gray-500 mt-1">3 out of stock</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customers</p>
                    <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
                    <p className="text-xs text-green-600 mt-1">+3 new this week</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <ShoppingCart className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Today's Revenue</p>
                      <p className="text-2xl font-bold">${stats.revenue.today.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weekly Revenue</p>
                      <p className="text-2xl font-bold">${stats.revenue.week.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Revenue</p>
                      <p className="text-2xl font-bold">${stats.revenue.month.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Revenue chart visualization goes here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => router.push("/vendor/products/new")} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={product.image || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {product.isAvailable ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="text" placeholder="Search orders..." className="pl-10" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.shippingAddress.name}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="text" placeholder="Search customers..." className="pl-10" />
            </div>
          </div>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Customer data coming soon</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We're working on a comprehensive customer management system. Check back soon for updates!
                </p>
                <Button variant="outline">Export Current Customer List</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Sales chart visualization goes here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">32 sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-green-600">+0.5% from last month</p>
                  <Separator className="my-2" />
                  <p className="text-sm text-gray-600">Percentage of visitors who made a purchase</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-2xl font-bold">$52.35</p>
                  <p className="text-xs text-green-600">+$3.28 from last month</p>
                  <Separator className="my-2" />
                  <p className="text-sm text-gray-600">Average amount spent per order</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Customer Retention</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-red-600">-2% from last month</p>
                  <Separator className="my-2" />
                  <p className="text-sm text-gray-600">Percentage of customers who return to make another purchase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

