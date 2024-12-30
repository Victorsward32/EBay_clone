'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X } from 'lucide-react'

const predefinedQuestions = [
  "Is this item still available?",
  "Can you provide more details about the condition?",
  "Is the price negotiable?",
  "Do you offer shipping?",
]

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'seller' }[]>([])

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, sender: 'user' }])
    // Simulate seller response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you for your message. I'll get back to you soon.", 
        sender: 'seller' 
      }])
    }, 1000)
  }

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 z-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Chat with Seller</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </Button>
          </CardHeader>
          <CardContent className="h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
                } max-w-[80%]`}
              >
                {message.text}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex-col items-stretch">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 w-full justify-start"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </CardFooter>
        </Card>
      )}
    </>
  )
}

