'use client'
import { useState } from "react"
import Card from "@/components/Card"
import HomePage from "@/components/HomePage"
import { useMusic } from "@/components/MusicProvider"
import { useRouter } from "next/navigation"


export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const { startMusic } = useMusic()
const router = useRouter()
  const handleStart = () => {
    startMusic()
    router.push("/card")
  }

  const handleInteraction = () => {
    startMusic()
  }

  return (
    <>
      
        <HomePage onContinue={handleStart} onInteraction={handleInteraction} />
     
    </>
  )
}