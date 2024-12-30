'use client'

import { useCart } from '../contexts/CartContext'
import { items } from '@/lib/items'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CartPage() {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart()

  const cartItems = cart.map(cartItem => {
    const item = items.find(i => i.id === cartItem.id)
    return item ? { ...item, quantity: cartItem.quantity } : null
  }).filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price * item.quantity}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => removeFromCart(item.id)} variant="destructive">
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <Button onClick={clearCart} variant="outline">Clear Cart</Button>
            <div className="text-xl font-bold">Total: ${getCartTotal()}</div>
          </div>
          <div className="mt-8">
            <Link href="/checkout" passHref>
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

