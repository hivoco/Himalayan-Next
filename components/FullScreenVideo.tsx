
'use client'

import { ArrowLeft, Loader2, RotateCw, Volume2, VolumeX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface FullScreenVideoProps {
  videoUrl: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  isRotated?: boolean
}

function FullScreenVideo({ 
  videoUrl, 
  autoPlay = true, 
  loop = false, 
  muted = true,
  isRotated=true
}: FullScreenVideoProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // const [isRotated, setIsRotated] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(muted)

  const handleRotate = async () => {
    try {
      // const newRotated = !isRotated
      // setIsRotated(true)

      if (!document.fullscreenElement && containerRef.current) {
        await containerRef.current.requestFullscreen()
        window.scrollTo(0, 1)
      }

      const orientation = (screen.orientation || (screen as any).mozOrientation || (screen as any).msOrientation) as {
        lock?: (orientation: string) => Promise<void>
        unlock?: () => void
      }

      if (orientation && typeof orientation.lock === 'function') {
        await orientation.lock(isRotated ? 'landscape' : 'portrait')
      }
    } catch (error) {
      console.warn('Orientation lock not supported or failed:', error)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(()=>{
setIsLoading(false)
    },6000)
   handleRotate()
  }, [])
  

  const handleBack = () => {
    router.back()
  }

  const handleVideoEnd = () => {
    router.back()
  }

  // const handleCanPlay = () => {
  //   setIsLoading(false)
  // }

  // const handleWaiting = () => {
  //   setIsLoading(true)
  // }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-black overflow-hidden flex items-center justify-center"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-black/50">
          <Loader2 className="w-16 h-16 text-white animate-spin" />
        </div>
      )}

      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={false}
        // onCanPlay={handleCanPlay}
        // onWaiting={handleWaiting}
        onEnded={handleVideoEnd}
        className="transition-transform duration-500 object-cover"
        style={isRotated ? {
          width: '100%',
          height: '100%',
          transform: 'rotate(360deg)'
        } : {
          width: '100%',
          height: '100%',
          transform: 'rotate(360deg)'
        }}
      />

      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={toggleMute}
        className="absolute top-6 left-20 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Toggle audio"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* <button
        onClick={handleRotate}
        className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        aria-label="Rotate screen"
      >
        <RotateCw className="w-6 h-6 text-white" />
      </button> */}
    </div>
  )
}

export default FullScreenVideo