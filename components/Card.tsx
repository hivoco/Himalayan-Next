
// 'use client'
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import ImageCard from "./ImageCard"

// function Card() {
//   const router = useRouter()
//   const [positionIndexes, setPositionIndexes] = useState<number[]>([0, 1, 2, 3, 4, 5])
  
//   const handleNext = () => {
//     setPositionIndexes((prevIndexes) => 
//       prevIndexes.map((prevIndex) => (prevIndex + 1) % 6)
//     )
//   }

//   const handleContinue = () => {
//     // Find which image index is at center position (position 0)
//     const centerIndex = positionIndexes.indexOf(0)
//     router.push(textinfo[centerIndex].url)
//   }

//   const positions = ["center", "left1", "left", "right", "right1", "hidden"]
  
//   const imageVariants = {
//     center: { x: '0%', scale: 0.9, zIndex: 5 },
//     right: { x: '90%', scale: 0.5, zIndex: 1 },
//     right1: { x: '50%', scale: 0.7, zIndex: 2 },
//     left1: { x: '-50%', scale: 0.7, zIndex: 2 },
//     left: { x: '-90%', scale: 0.5, zIndex: 1 },
//     hidden: { x: '0%', scale: 0, zIndex: 0 }
//   }

//   const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"]
  
//   const textinfo = [
//       {"text":"Test Purity At Home","url":"/purity"},
//     {"text":"Saffron's Quality Report","url":"/report"},
    
//     {"text":"Saffron Recipes","url":"/recipes"},
//     {"text":"Ask Any Question","url":"/ask-question"},
//     {"text":"Our Story","url":"/our-story"},
//     {"text":"Our Journey","url":"/journey"},
  
    
//   ]
  

//   return (
//     <div className="relative h-svh w-full overflow-hidden">
//       <Image
//         src="/flower.png"
//         alt="Background"
//         fill
//         className="object-cover"
//         priority
//       />
      
//       <div
//         className="absolute inset-0 z-10"
//         style={{
//           background: 'linear-gradient(180deg, rgba(49, 142, 255, 0.6) 40.1%, rgba(48, 106, 177, 0.4) 70%, rgba(47, 70, 99, 0) 98%)'
//         }}
//       />
      
//       <div className="relative z-20 flex items-center flex-col justify-center h-full">
//         {images.map((image, index) => (
//           <ImageCard
//             key={index}
//             image={image}
//             position={positions[positionIndexes[index]]}
//             imageVariants={imageVariants}
//             onDragEnd={handleNext}
//             textinfo={textinfo[index]}
            
//           />
//         ))}
        
//         <button
//           onClick={handleContinue}
//           className="absolute bottom-10 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors z-30"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Card


'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import ImageCard from "./ImageCard"

function Card() {
  const router = useRouter()
  const [positionIndexes, setPositionIndexes] = useState<number[]>([0, 1, 2, 3, 4, 5])

  // Load saved position on mount
  useEffect(() => {
    const savedPositions = sessionStorage.getItem('cardPositions')
    if (savedPositions) {
      setPositionIndexes(JSON.parse(savedPositions))
    }
  }, [])

  // Save position whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cardPositions', JSON.stringify(positionIndexes))
  }, [positionIndexes])

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => 
      prevIndexes.map((prevIndex) => (prevIndex + 1) % 6)
    )
  }

  const handleContinue = () => {
    // Find which image index is at center position (position 0)
    const centerIndex = positionIndexes.indexOf(0)
    router.push(textinfo[centerIndex].url)
  }

  const positions = ["center", "left1", "left", "right", "right1", "hidden"]

  const imageVariants = {
    center: { x: '0%', scale: 0.9, zIndex: 5 },
    right: { x: '90%', scale: 0.5, zIndex: 1 },
    right1: { x: '50%', scale: 0.7, zIndex: 2 },
    left1: { x: '-50%', scale: 0.7, zIndex: 2 },
    left: { x: '-90%', scale: 0.5, zIndex: 1 },
    hidden: { x: '0%', scale: 0, zIndex: 0 }
  }

  const images = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"]
  
  const textinfo = [
    {"text":"Saffron's Quality Report","url":"/report"},
    {"text":"Test Purity At Home","url":"/purity"},
    
    {"text":"Saffron Recipes","url":"/recipes"},
    {"text":"Ask Any Question","url":"/ask-question"},
    {"text":"Our Story","url":"/our-story"},
    {"text":"Our Journey","url":"/journey"},
  ]

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
      <div className="relative z-20 flex items-center flex-col justify-center h-full">
        {images.map((image, index) => (
          <ImageCard
            key={index}
            image={image}
            position={positions[positionIndexes[index]]}
            imageVariants={imageVariants}
            onDragEnd={handleNext}
            textinfo={textinfo[index]}
          />
        ))}
        <button
          onClick={handleContinue}
          className="absolute bottom-10 px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors z-30"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Card