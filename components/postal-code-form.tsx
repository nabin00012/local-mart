"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, MapPin } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PostalCodeForm() {
  const [postalCode, setPostalCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!postalCode.trim()) {
      setError("Please enter a postal code")
      return
    }

    // Simple postal code format validation (can be customized for different countries)
    const postalCodeRegex = /^[A-Za-z0-9]{3,8}$/
    if (!postalCodeRegex.test(postalCode.trim())) {
      setError("Please enter a valid postal code")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would validate the postal code against a database or API
      // For demo purposes, we'll just simulate a delay and proceed
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store the postal code in localStorage for later use
      localStorage.setItem("userPostalCode", postalCode.trim())

      // Redirect to the marketplace
      router.push("/marketplace")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form id="postal-code-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Enter your postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="pl-10 py-6 text-lg rounded-lg"
        />
      </div>

      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full py-6 text-lg bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? "Checking..." : "Find Local Products"}
      </Button>
    </form>
  )
}

