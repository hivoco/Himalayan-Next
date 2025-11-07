'use client'
import { useEffect, useRef } from 'react'

interface BackgroundMusicProps {
  shouldPlay: boolean
}

function BackgroundMusic({ shouldPlay }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3') // Replace with your music file path
      audioRef.current.loop = true
      audioRef.current.volume = 0.2 // Adjust volume (0.0 to 1.0)
    }

    if (shouldPlay && audioRef.current.paused) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err))
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [shouldPlay])

  return null
}

export default BackgroundMusic