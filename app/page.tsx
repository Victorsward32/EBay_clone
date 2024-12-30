import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { items } from '@/lib/items'
import Image from 'next/image'

const categories = [
  "Electronics", "Fashion", "Home & Garden", "Sports", "Toys", "Vehicles", "Other"
]

const featuredItems = items.slice(0, 4)

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase().replace(' & ', '-')}`}
              className="bg-blue-100 text-blue-600 rounded-lg p-4 text-center hover:bg-blue-200 transition duration-300"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-4 rounded" />
                <p className="text-gray-600">{item.category}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <Link
                  href={`/item/${item.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Daily Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(4, 8).map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-gray-600">{item.category}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <Link
                  href={`/item/${item.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Popular in Electronics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.filter(item => item.category === "Electronics").slice(0, 4).map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-gray-600">{item.category}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price}</span>
                <Link
                  href={`/item/${item.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Advertisements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Summer Sale!</h3>
            <p>Get up to 50% off on selected items. Limited time offer!</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
            <p>Check out our latest products in the Electronics category.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

