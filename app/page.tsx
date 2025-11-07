'use client'
import { useState } from "react"
import Card from "@/components/Card"
import HomePage from "@/components/HomePage"
import { useMusic } from "@/components/MusicProvider"

export default function Home() {
  const [showCard, setShowCard] = useState(false)
  const { startMusic } = useMusic()

  const handleStart = () => {
    startMusic()
    setShowCard(true)
  }

  const handleInteraction = () => {
    startMusic()
  }

  return (
    <>
      {!showCard ? (
        <HomePage onContinue={handleStart} onInteraction={handleInteraction} />
      ) : (
        <Card />
      )}
    </>
  )
}