import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LocalMart</h3>
            <p className="text-green-100">Your hyperlocal marketplace for buying and renting locally made products.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-green-100 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-green-100 hover:text-white">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-green-100 hover:text-white">
                  Sell
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-green-100 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-green-100 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-green-100 hover:text-white">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-green-100 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-green-100 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} LocalMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

