'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, User } from 'lucide-react'

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  itemName: string
  sellerName: string
}

const predefinedQuestions = [
  "Is this item still available?",
  "Can you provide more details about the condition?",
  "Is the price negotiable?",
  "Do you offer shipping?",
]

export function ChatModal({ isOpen, onClose, itemName, sellerName }: ChatModalProps) {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'seller' }[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (text.trim() === '') return
    setMessages([...messages, { text, sender: 'user' }])
    setInputMessage('')
    // Simulate seller response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `Thank you for your interest in "${itemName}". I'll get back to you soon.`, 
        sender: 'seller' 
      }])
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageCircle size={24} />
            Chat with {sellerName}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 py-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex items-end gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.sender === 'user' ? 'U' : 'S'}</AvatarFallback>
                    <AvatarImage src={message.sender === 'user' ? '/user-avatar.png' : '/seller-avatar.png'} />
                  </Avatar>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex flex-wrap gap-2 mb-4">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage(inputMessage)
            }}
            className="flex gap-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send size={20} />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

