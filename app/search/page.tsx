import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { items } from '@/lib/items'

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q?.toLowerCase() || ''
  const searchResults = items.filter(item => 
    item.name.toLowerCase().includes(query) || 
    item.description.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {searchResults.map((item) => (
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
      )}
    </div>
  )
}

