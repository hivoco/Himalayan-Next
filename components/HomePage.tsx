import Image from 'next/image'
import React from 'react'

interface HomePageProps {
  onContinue: () => void
  onInteraction: () => void
}

function HomePage({ onContinue, onInteraction }: HomePageProps) {
  return (
    <div 
      className="relative h-svh w-full overflow-hidden"
      onClick={onInteraction}
    >
      <Image
        src="/bg.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative h-full flex flex-col items-center justify-between">
        <div className="animate-slide-to-top pt-[200px]">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="opacity-0 animate-fade-in"
            priority
          />
        </div>
        
        <div className="pb-[30px] flex flex-col items-center gap-10 opacity-0 animate-fade-in-up animation-delay-800">
          <button 
            onClick={onContinue}
            className="px-8 py-3 border border-white text-white rounded-2xl font-semibold text-base md:text-xl hover:bg-white transition-colors hover:text-black"
          >
            Get Started
          </button>
          <Image
            src="/tata.png"
            alt="Data"
            width={80}
            height={40}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage