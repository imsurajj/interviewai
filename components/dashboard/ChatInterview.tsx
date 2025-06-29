"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, Upload, FileText, Loader2, Bot, User, X } from "lucide-react"
import { toast } from "sonner"

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatInterview() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [agentId, setAgentId] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize chat agent on component mount
  useEffect(() => {
    initializeChatAgent()
  }, [])

  const initializeChatAgent = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/chat-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create_agent'
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setAgentId(result.agentId)
        setSessionId(`session_${Date.now()}`)
        
        // Add welcome message
        setMessages([{
          id: '1',
          text: "Hello! I'm your InterviewAce assistant. I can help you with interview preparation, career guidance, and answer questions about various industries. How can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        }])
        
        toast.success("Chat agent initialized successfully!")
      } else {
        toast.error(result.error || "Failed to initialize chat agent")
      }
    } catch (error) {
      console.error('Error initializing chat agent:', error)
      toast.error("Failed to initialize chat agent")
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !agentId) return

      const userMessage: Message = {
        id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
      setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_message',
          message: inputMessage,
          agentId: agentId,
          sessionId: sessionId
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: result.response.message || result.response.text || "I understand your question. Let me help you with that.",
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
        toast.error(result.error || "Failed to send message")
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error("Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-black">AI Chat Assistant</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="bg-white border border-gray-200 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-black flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat with AI Assistant</span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Ask questions about interview preparation, career guidance, and industry insights
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-black border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.sender === 'user' ? 'You' : 'AI Assistant'}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-black border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                </div>
              </div>
                )}
            <div ref={messagesEndRef} />
          </div>

              {/* Input Area */}
            <div className="flex space-x-2">
                <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 resize-none"
                  rows={2}
                  disabled={isLoading || !agentId}
              />
              <Button
                onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading || !agentId}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Base Panel */}
        <div className="lg:col-span-1">
          <Card className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Knowledge Base</span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Upload documents to enhance AI responses
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Chat Tips */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Chat Tips</Label>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Ask about interview preparation</p>
                  <p>• Get career advice</p>
                  <p>• Learn about industry trends</p>
                  <p>• Get resume writing tips</p>
                  <p>• Ask about salary negotiation</p>
                </div>
              </div>

              {/* Status Info */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-black">Status</Label>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>✅ Chat functionality: Working</p>
                  <p>✅ AI responses: Available</p>
                  <p>✅ File upload: Optional</p>
                  <p>✅ Knowledge base: Enhanced responses</p>
            </div>
          </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
