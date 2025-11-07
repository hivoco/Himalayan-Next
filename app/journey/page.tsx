'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useMusic } from "@/components/MusicProvider"
import { useEffect } from "react"

function NewPage() {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    
    return (
        <div className="relative h-svh w-full overflow-hidden">
            <Image
                src="/journey.png"
                alt="Background"
                fill
                className="object-fill"
                priority
            />
            <div
                className="absolute inset-0 z-10"
                // style={{
                //     background: 'linear-gradient(180deg, rgba(49, 142, 255, 0.6) 40.1%, rgba(48, 106, 177, 0.4) 70%, rgba(47, 70, 99, 0) 98%)'
                // }}
            />

            <button
                onClick={handleBack}
                className="absolute top-6 left-6 z-50 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label="Go back"
            >
                <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-md mx-auto p-10 text-center">
                {/* Your content goes here */}
               
            </div>
        </div>
    )
}

export default NewPage