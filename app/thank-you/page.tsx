import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="mb-8">Your order has been successfully placed and will be processed soon.</p>
      <Link href="/" passHref>
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  )
}

