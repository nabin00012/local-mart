"use client"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Truck, Users } from "lucide-react"
import PostalCodeForm from "@/components/postal-code-form"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="hero-gradient absolute inset-0 opacity-5"></div>

        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover <span className="text-green-600">Local</span> Products <br />
                From Your Community
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                Shop and rent locally made products, support small businesses, and reduce your carbon footprint.
              </p>

              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter your postal code to get started</h2>
                <p className="text-gray-600 mb-6">We'll show you products and services available in your area.</p>
                <PostalCodeForm />
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-soft animate-slide-in">
                <Image
                  src="/placeholder.svg?height=800&width=600"
                  alt="Local marketplace"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Local Products</p>
                    <p className="text-sm text-gray-500">500+ items near you</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Fast Delivery</p>
                    <p className="text-sm text-gray-500">Same day available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LocalMart?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with local vendors and products, making shopping more sustainable and community-focused.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-soft card-hover">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shop Local</h3>
              <p className="text-gray-600">
                Discover unique products made by artisans and small businesses in your community.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft card-hover">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our hyperlocal delivery network.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-soft card-hover">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
              <p className="text-gray-600">
                Support your local economy and build connections with vendors in your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start shopping locally?</h2>
                <p className="text-green-50 text-lg mb-6">
                  Enter your postal code and discover a world of local products waiting for you.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50"
                  onClick={() => document.getElementById("postal-code-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="hidden md:block">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Local shopping"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

