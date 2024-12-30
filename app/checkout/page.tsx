'use client'

import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

function FloatingText() {
  return (
    <Text
      color="black"
      anchorX="center"
      anchorY="middle"
      fontSize={0.5}
    >
      Secure Checkout
    </Text>
  )
}

export default function CheckoutPage() {
  const { getCartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log('Processing payment:', formData)
    clearCart()
    router.push('/thank-you')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" name="name" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="address">Shipping Address</Label>
              <Input type="text" id="address" name="address" required onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input type="text" id="cardNumber" name="cardNumber" required onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input type="text" id="cvv" name="cvv" required onChange={handleInputChange} />
              </div>
            </div>
            <Button type="submit" className="w-full">Pay ${getCartTotal()}</Button>
          </form>
        </div>
        <div className="h-96">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <FloatingText />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

