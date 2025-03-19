"use client";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Truck, Users } from "lucide-react";
import PostalCodeForm from "@/components/postal-code-form";
import { Button } from "@/components/ui/button";

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
                Discover <span className="text-green-600">Local</span> Products{" "}
                <br />
                From Your Community
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-lg">
                Shop and rent locally made products, support small businesses,
                and reduce your carbon footprint.
              </p>

              <div className="bg-white rounded-xl shadow-soft p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Enter your postal code to get started
                </h2>
                <p className="text-gray-600 mb-6">
                  We'll show you products and services available in your area.
                </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose LocalMart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with local vendors and products, making shopping
              more sustainable and community-focused.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CTA section remains unchanged */}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Local Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover unique handcrafted items from artisans in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 - Homemade Strawberry Jam */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/1.png"
                  alt="Homemade Strawberry Jam"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">Food</span>
                  <div className="ml-auto flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Homemade Strawberry Jam
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Delicious homemade strawberry jam made with locally grown
                  berries
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-gray-900">$8.99</span>
                  <span className="text-xs text-gray-500">Downtown</span>
                </div>
              </div>
            </div>

            {/* Product 2 - Handcrafted Wooden Cutting Board */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/2.png"
                  alt="Handcrafted Wooden Cutting Board"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <button className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1 rounded text-sm">
                  Add to Cart
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">Home</span>
                  <div className="ml-auto flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Handcrafted Wooden Cutting Board
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Beautiful handcrafted cutting board made from locally sourced
                  wood
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-gray-900">$45.99</span>
                  <span className="text-xs text-gray-500">Westside</span>
                </div>
              </div>
            </div>

            {/* Product 3 - Power Drill */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/3.png"
                  alt="Power Drill"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  Available for Rent
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">Tools</span>
                  <div className="ml-auto flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Power Drill
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Professional-grade power drill, perfect for home projects
                </p>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <span className="font-bold text-gray-900">$89.99</span>
                    <div className="text-xs text-blue-500">$12.99/day</div>
                  </div>
                  <span className="text-xs text-gray-500">Eastside</span>
                </div>
              </div>
            </div>

            {/* Product 4 - Homemade Pickles */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/4.png"
                  alt="Homemade Pickles"
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs text-gray-500">Food</span>
                  <div className="ml-auto flex items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-1 text-sm font-medium">5.0</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Homemade Pickles
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Crunchy dill pickles made with a family recipe passed down for
                  generations
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-gray-900">$6.99</span>
                  <span className="text-xs text-gray-500">Downtown</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button className="bg-green-600 hover:bg-green-700">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        {/* CTA section remains unchanged */}
      </section>
    </div>
  );
}
