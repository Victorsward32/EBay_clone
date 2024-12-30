'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../contexts/CartContext'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { cart } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">EBay Clone</Link>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="py-2 px-4 pr-10 rounded-full text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>
          <Link href="/cart" className="hover:text-gray-200 relative">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/profile" className="hover:text-gray-200">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}

