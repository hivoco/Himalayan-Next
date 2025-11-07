'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send } from "lucide-react"
import { useMusic } from "@/components/MusicProvider"

interface Message {
    type: 'user' | 'bot'
    text: string
}



function ChatPage() {
    const router = useRouter()
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleBack = () => {
        router.back()
    }

    const handleSend = async () => {
        if (!message.trim() || loading) return

        const userMessage = message.trim()
        setMessage("")
        
        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: userMessage }])
        
        setLoading(true)

        try {
            const response = await fetch(`https://apiserv.himalayansaffron.in/ask_hivoco?question=${encodeURIComponent(userMessage)}`)
            const data = await response.json()

            // Add bot response
            setMessages(prev => [...prev, { type: 'bot', text: data.Answer }])
        } catch (err) {
            setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, something went wrong. Please try again.' }])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="relative h-svh w-full overflow-hidden flex flex-col">
            <Image
                src="/chat.png"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(180deg, rgba(49, 142, 255, 0.6) 40.1%, rgba(48, 106, 177, 0.4) 70%, rgba(47, 70, 99, 0) 98%)'
                }}
            />

            <button
                onClick={handleBack}
                className="absolute top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label="Go back"
            >
                <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="relative z-20 flex flex-col h-full max-w-2xl mx-auto w-full p-6">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 pt-20 pb-4">
                    {messages.length === 0 && (
                        <div className="text-center text-white/70 mt-20">
                            <p className="text-lg">Ask me anything about Himalayan Saffron</p>
                        </div>
                    )}
                    
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                                    msg.type === 'user'
                                        ? 'bg-white text-black'
                                        : 'bg-white/20 backdrop-blur-sm text-white'
                                }`}
                            >
                                <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-2xl">
                                <p className="text-sm">Typing...</p>
                            </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Field */}
                <div className="relative flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-500 px-2"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim() || loading}
                        className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage