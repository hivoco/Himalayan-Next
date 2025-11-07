import FullScreenVideo from '@/components/FullScreenVideo'
import React from 'react'

function page() {
  return (
    <main className="flex items-center justify-center max-h-svh bg-gray-900">
      <FullScreenVideo 
  videoUrl="https://player.vimeo.com/progressive_redirect/playback/850856146/rendition/720p/file.mp4?loc=external&signature=daf268fc6399e75ad812c514d66fd282d2e8d664f69aa7808c110caa321f481e"
  autoPlay={true}
  loop={true}
  muted={true}
  isRotated={false}
/>
    </main>
  )
}

export default page