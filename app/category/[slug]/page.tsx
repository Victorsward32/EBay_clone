import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { items } from '@/lib/items'
import Image from 'next/image'

const categories = {
  "electronics": "Electronics",
  "fashion": "Fashion",
  "home-garden": "Home & Garden",
  "sports": "Sports",
  "toys": "Toys",
  "vehicles": "Vehicles",
  "other": "Other",
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = categories[params.slug as keyof typeof categories]

  if (!categoryName) {
    notFound()
  }

  const categoryItems = items.filter(item => item.category.toLowerCase() === categoryName.toLowerCase())

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryItems.map((item) => (
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
    </div>
  )
}

