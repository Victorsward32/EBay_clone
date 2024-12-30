'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, ShoppingBag, Heart, Edit2, Plus } from 'lucide-react'

// Mock data
const user = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "January 1, 2023",
}

const addresses = [
  { id: 1, type: 'Home', address: '123 Main St, Anytown, AT 12345' },
  { id: 2, type: 'Work', address: '456 Office Blvd, Workville, WV 67890' },
]

const orders = [
  { id: 1, date: '2023-05-15', status: 'Delivered', total: 129.99 },
  { id: 2, date: '2023-06-01', status: 'Shipped', total: 79.99 },
  { id: 3, date: '2023-06-10', status: 'Processing', total: 199.99 },
]

const wishlist = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99 },
  { id: 2, name: 'Smart Watch', price: 199.99 },
  { id: 3, name: 'Portable Charger', price: 39.99 },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleEdit = () => {
    if (isEditing) {
      // Here you would typically send the updated data to your backend
      console.log('Saving user data:', editedUser)
    }
    setIsEditing(!isEditing)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-500 mb-4">Member since {user.joinDate}</p>
              <Button onClick={handleEdit} className="w-full">
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="personal-info">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal-info">
              <User className="mr-2 h-4 w-4" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-info">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>My Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{address.type}</p>
                          <p className="text-sm text-gray-500">{address.address}</p>
                        </div>
                        <Button variant="outline" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add New Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Status: <span className="font-semibold">{order.status}</span></p>
                          <p className="font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                        <Button>Add to Cart</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

