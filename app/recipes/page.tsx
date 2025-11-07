'use client'
import FullScreenVideo2 from '@/components/FullScreenVideo2'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function Page() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  const images = [
    { name: "Kahwah", video: "https://player.vimeo.com/progressive_redirect/playback/865245115/rendition/720p/file.mp4?loc=external&signature=7f3c25272b2bc2d0f9a6bcb833124778188b68d934f5486c0b8cc0201f59e96c" },
    { name: "Cheese", video: "https://player.vimeo.com/progressive_redirect/playback/865245173/rendition/720p/file.mp4?loc=external&signature=7e758013b1e5266b399eeab890c172a0b3a9e9dcfb9606d34795428fef8cf05d" },
    { name: "Biryani", video: "https://player.vimeo.com/progressive_redirect/playback/861109732/rendition/720p/file.mp4?loc=external&signature=0524b050b841fad40883685c88c262b66533fad91d4c2bc18e3b8a0644244d49" },
    { name: "Sondesh", video: "https://player.vimeo.com/progressive_redirect/playback/865245064/rendition/720p/file.mp4?loc=external&signature=1d99469b6fae909540d3adef3b8a7ef9a7a561358c08c7816b29aabd98977589" }
  ]

  const handleImageClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl)
  }

  const handleVideoBack = () => {
    setSelectedVideo(null)
  }

  if (selectedVideo) {
    return (
      <FullScreenVideo2
        videoUrl={selectedVideo}
        autoPlay={true}
        loop={false}
        muted={true}
        isRotated={false}
        onBack={handleVideoBack}
      />
    )
  }

  return (
    <div className="relative h-svh w-full overflow-hidden">
      <Image
        src="/flower.png"
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
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="grid grid-cols-2 gap-6  max-w-md">
          {images.map((item, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(item.video)}
              className="rounded-2xl overflow-hidden hover:opacity-80 transition-opacity "
            >
              <Image

                src={`/${item.name}.png`}
                alt={item.name}
                width={160}
                height={270}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page

