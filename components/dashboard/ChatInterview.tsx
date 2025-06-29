"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Bot, User, Send } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Marquee from "react-fast-marquee"

const SUGGESTIONS = [
  "Give me interview tips",
  "How to negotiate salary?",
  "Resume writing advice",
  "What are common interview questions?",
  "How to answer behavioral questions?",
  "Tips for remote interviews",
  "How to follow up after an interview?",
  "What to wear for interviews?"
];

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
  const [isBotTyping, setIsBotTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isBotTyping])

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
    setIsBotTyping(true)
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
      setIsBotTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Check if user has sent any message (not just the welcome bot message)
  const hasUserMessage = messages.some(m => m.sender === 'user')

  // ChatGPT-style: Centered prompt and input if no user message, else classic chat layout
  if (!hasUserMessage) {
    return (
      <div className="w-full h-full min-h-[80vh] flex flex-col items-center justify-center bg-white text-black">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-semibold mb-6 mt-4 text-center px-2">Ace Your Next Interview with AI</h1>
          {/* Marquee section below the heading */}
          <div className="w-full flex flex-col items-center mb-2 px-2">
            <div className="w-full max-w-full md:max-w-4xl">
              <Marquee gradient={true} gradientColor="#fff" gradientWidth={40} speed={30} className="flex gap-2 py-2 whitespace-nowrap overflow-hidden">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="mx-1 md:mx-2 px-2 md:px-3 py-1 bg-gray-100 text-xs md:text-sm text-gray-700 rounded hover:bg-blue-100 border border-gray-200 transition h-9"
                    onClick={() => {
                      setInputMessage(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </Marquee>
              <Marquee gradient={true} gradientColor="#fff" gradientWidth={40} speed={30} direction="right" className="flex gap-2 py-2 whitespace-nowrap overflow-hidden">
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="mx-1 md:mx-2 px-2 md:px-3 py-1 bg-gray-100 text-xs md:text-sm text-gray-700 rounded hover:bg-blue-100 border border-gray-200 transition h-9"
                    onClick={() => {
                      setInputMessage(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </Marquee>
            </div>
          </div>
          <form
            className="w-full max-w-full md:max-w-xl flex flex-col items-center px-2"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <div className="w-full flex items-center bg-gray-100 rounded-2xl px-3 md:px-6 py-3 md:py-4 mb-0 border-2 border-blue-400" style={{gap: 0}}>
              <Textarea
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                className="flex-1 resize-none bg-transparent text-black border-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-base md:text-lg"
                rows={1}
                disabled={isLoading || !agentId}
                style={{minHeight:32,maxHeight:80, boxShadow: 'none'}}
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isLoading || !agentId}
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 md:px-4 py-2"
                style={{minWidth:40, minHeight:40}}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Classic chat layout after user sends a message
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-black overflow-hidden relative" style={{minHeight:0}}>
      {/* Fixed Header */}
      <div className="flex items-center justify-between px-2 md:px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-10">
        <h2 className="text-lg md:text-xl font-bold tracking-tight text-black">AI Chat Assistant</h2>
      </div>
      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-0 md:px-8 py-4 md:py-6 bg-gray-50 min-h-0" style={{scrollbarGutter:'stable'}}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[95vw] md:max-w-[60vw]">
              {message.sender === 'bot' && (
                <Image src="/placeholder-logo.png" alt="Bot" width={28} height={28} className="rounded-full md:w-8 md:h-8 w-7 h-7" />
              )}
              <div
                className={`p-2 md:p-3 rounded-lg shadow-sm break-words text-sm md:text-base ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-black border border-gray-200'
                }`}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <Image src="/placeholder-user.jpg" alt="You" width={28} height={28} className="rounded-full md:w-8 md:h-8 w-7 h-7" />
              )}
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="flex items-center gap-2 px-4 py-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-gray-500">AI is typing…</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Fixed Input Area */}
      <form
        className="w-full flex gap-2 px-2 md:px-4 py-3 md:py-4 bg-white border-t border-gray-200 flex-shrink-0 sticky bottom-0 z-10"
        onSubmit={e => { e.preventDefault(); sendMessage(); }}
        style={{borderRadius:0, margin:0, paddingBottom:0}}
      >
        <Textarea
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 resize-none border-2 border-blue-400 focus:border-blue-600 text-base md:text-lg"
          rows={2}
          disabled={isLoading || !agentId}
          style={{minHeight:40,maxHeight:120, borderRadius:0}}
        />
        <Button
          type="submit"
          disabled={!inputMessage.trim() || isLoading || !agentId}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 md:px-4 py-2"
          style={{minWidth:40, minHeight:40}}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  )
}