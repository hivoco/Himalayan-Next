import FullScreenVideo from '@/components/FullScreenVideo'
import { useMusic } from '@/components/MusicProvider'


function page() {

  return (
    <main className="flex items-center justify-center max-h-svh bg-gray-900">
      <FullScreenVideo 
  videoUrl="https://player.vimeo.com/progressive_redirect/playback/898121097/rendition/540p/file.mp4?loc=external&signature=8a7f39dc7b969e3a49471e2b4bc6eacfa7c926e4330e079e97bbc7dae1974f1d"
  autoPlay={true}
  loop={true}
  muted={true}
  isRotated={true}
/>
    </main>
  )
}

export default page