'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { items } from '@/lib/items'
import { useCart } from '@/app/contexts/CartContext'
import { useState } from 'react'
import Image from 'next/image'
import { StarIcon, MessageCircle, ShoppingCart } from 'lucide-react'
import { ChatModal } from '@/app/components/ChatModal'

// Mock reviews data
const reviews = [
  { id: 1, user: "John Doe", rating: 5, comment: "Great product, exactly as described!" },
  { id: 2, user: "Jane Smith", rating: 4, comment: "Good quality, but shipping was a bit slow." },
  { id: 3, user: "Mike Johnson", rating: 5, comment: "Excellent service and product!" },
]

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = items.find(item => item.id === parseInt(params.id))
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (!item) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(item.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const similarItems = items
    .filter(i => i.category === item.category && i.id !== item.id)
    .slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{item.name}</h1>
          <p className="text-xl text-gray-600">{item.category}</p>
          <p className="text-3xl font-bold text-blue-600">${item.price}</p>
          <p className="text-gray-700">{item.description}</p>
          <div className="flex gap-4">
            <Button onClick={handleAddToCart} className="flex-grow text-lg py-6" size="lg">
              {added ? (
                'Added to Cart!'
              ) : (
                <>
                  <ShoppingCart className="mr-2" size={24} />
                  Add to Cart
                </>
              )}
            </Button>
            <Button onClick={() => setIsChatOpen(true)} variant="outline" size="lg" className="flex items-center gap-2 text-lg py-6">
              <MessageCircle size={24} />
              Contact Seller
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Similar Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarItems.map((similarItem) => (
            <Card key={similarItem.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="line-clamp-1">{similarItem.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={similarItem.image}
                  alt={similarItem.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-gray-600">{similarItem.category}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">${similarItem.price}</span>
                <Link href={`/item/${similarItem.id}`}>
                  <Button variant="outline">View</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center mb-2">
                  <p className="font-semibold mr-2">{review.user}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        itemName={item.name}
        sellerName="Seller" // You can replace this with actual seller name if available
      />
    </div>
  )
}

