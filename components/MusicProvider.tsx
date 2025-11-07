// 'use client'
// import { createContext, useContext, useEffect, useRef, useState } from 'react'

// interface MusicContextType {
//   startMusic: () => void
//   stopMusic: () => void
//   isPlaying: boolean
// }

// const MusicContext = createContext<MusicContextType>({
//   startMusic: () => {},
//   stopMusic: () => {},
//   isPlaying: false
// })

// export function MusicProvider({ children }: { children: React.ReactNode }) {
//   const audioRef = useRef<HTMLAudioElement | null>(null)
//   const [isPlaying, setIsPlaying] = useState(false)

//   useEffect(() => {
//     // Create audio element only once
//     if (!audioRef.current) {
//       audioRef.current = new Audio('/music.mp3') // Replace with your music file path
//       audioRef.current.loop = true
//       audioRef.current.volume = 0.3 // Adjust volume (0.0 to 1.0)
//     }

//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause()
//         audioRef.current = null
//       }
//     }
//   }, [])

//   const startMusic = () => {
//     if (audioRef.current && audioRef.current.paused) {
//       audioRef.current.play().catch(err => console.log('Audio play failed:', err))
//       setIsPlaying(true)
//     }
//   }

//   const stopMusic = () => {
//     if (audioRef.current && !audioRef.current.paused) {
//       audioRef.current.pause()
//       setIsPlaying(false)
//     }
//   }

//   return (
//     <MusicContext.Provider value={{ startMusic, stopMusic, isPlaying }}>
//       {children}
//     </MusicContext.Provider>
//   )
// }

// export const useMusic = () => useContext(MusicContext)


'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

interface MusicContextType {
  startMusic: () => void
  stopMusic: () => void
  lowerVolume: () => void
  restoreVolume: () => void
  isPlaying: boolean
}

const MusicContext = createContext<MusicContextType>({
  startMusic: () => {},
  stopMusic: () => {},
  lowerVolume: () => {},
  restoreVolume: () => {},
  isPlaying: false
})

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const normalVolume = 0.15 // Fixed normal volume (15%)
  const loweredVolume = 0.05 // Lowered volume when video plays (5%)

  useEffect(() => {
    // Create audio element only once
    if (!audioRef.current) {
      audioRef.current = new Audio('/music.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = normalVolume
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err))
      setIsPlaying(true)
    }
  }

  const stopMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const lowerVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = loweredVolume
    }
  }

  const restoreVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = normalVolume
    }
  }

  return (
    <MusicContext.Provider value={{ startMusic, stopMusic, lowerVolume, restoreVolume, isPlaying }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => useContext(MusicContext)