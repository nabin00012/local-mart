"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem("user")
    if (!userJson) {
      router.push("/auth/login")
      return
    }

    try {
      const userData = JSON.parse(userJson) as User
      setUser(userData)
      setName(userData.name || "")
      setEmail(userData.email || "")
      setPhone(userData.phone || "")
      setAddress(userData.address || "")
      setPostalCode(userData.postalCode || "")
    } catch (err) {
      console.error("Failed to parse user data:", err)
      router.push("/auth/login")
    }
  }, [router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!name.trim() || !email.trim() || !postalCode.trim()) {
      setError("Name, email, and postal code are required")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call to update the user profile
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user info in localStorage
      if (user) {
        const updatedUser = {
          ...user,
          name,
          email,
          phone,
          address,
          postalCode,
        }

        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully",
          duration: 3000,
        })
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("All password fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call to update the password
      // For demo purposes, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset password fields
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
        duration: 3000,
      })
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and address</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

