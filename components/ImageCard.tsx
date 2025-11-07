'use client'
import { motion } from "framer-motion"
import Image from "next/image"

interface ImageCardProps {
    image: string
    position: string
    imageVariants: Record<string, any>
    onDragEnd: () => void
    textinfo:{text:string,url:string}
}



function ImageCard({ image, position, imageVariants, onDragEnd,textinfo }: ImageCardProps) {


    const isCenter = position === "center"
    return (
        <motion.div
            className={`absolute w-[300px] h-[400px] rounded-2xl  overflow-hidden cursor-grab active:cursor-grabbing ${isCenter ? 'bg-white' : ''}`}
            initial="center"
            style={!isCenter ? { backgroundColor: 'rgba(0, 0, 0, 0.8)' } : undefined}
            animate={position}
            variants={imageVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 50) {
                    onDragEnd()
                }
            }}
        >
            <div className=" w-full h-full flex flex-col  items-center p-5 ">

                <Image
                    src="/card/set.png"
                    className=""
                    width={121}
                    height={30}
                    alt="image"
                />
                <div className="flex-1 flex flex-col items-center gap-5 justify-center">
                    <Image
                        src={`/card${image}`}
                        className="pointer-none"
                        width={200}
                        height={200}
                        alt="image"
                    />
                    <strong className="font-semibold text-center text-2xl text-[#632A5F]">{textinfo.text}</strong>
                </div>
                <Image
                    src="/card/set.png"
                    className=""
                    width={121}
                    height={30}
                    alt="image"
                />
            </div>
        </motion.div>
    )
}

export default ImageCard