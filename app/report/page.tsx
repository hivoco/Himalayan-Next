

'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useMusic } from "@/components/MusicProvider"

function Card() {
    const router = useRouter()
    const [batchCode, setBatchCode] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const handleBack = () => {
        if(success){
window.location.reload()
        }
        else{
            router.back()
        }
        
    }

    const { startMusic } = useMusic()
    
        useEffect(() => {
            startMusic() // Ensure music continues on page load
        }, [startMusic])

    const handleGenerateReport = async () => {
        if (!batchCode.trim()) return
        
        setLoading(true)
        setError(false)
        setSuccess(false)

        try {
            const response = await fetch(`https://apiserv.himalayansaffron.in/get-image-url?image=${batchCode}`)
            const data = await response.json()

            if (data.image_url && data.image_url !== "") {
                setSuccess(true)
                setImageUrl(data.image_url)
            } else {
                setError(true)
            }
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleTryAgain = () => {
        setError(false)
        setSuccess(false)
        setBatchCode("")
        setImageUrl("")
    }

    const handleViewReport = () => {
        setShowPopup(true)
    }

    return (
        <>
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

                <div className="relative z-20 flex flex-col text-white items-center px-10 py-32 max-w-md mx-auto text-center h-full">
                    <h3 className="font-bold text-xl block">
                        {success 
                            ? "CONGRATULATIONS"
                            : error 
                            ? "The batch number doesn't match our records. Please recheck and reenter the batch number"
                            : "Enter the batch number printed on the pack to see the certificate that proves"
                        }
                    </h3>
                    
                    {!error && !success && (
                        <Image
                            src="/grade.png"
                            alt=""
                            height={270}
                            width={160}
                            className="w-full object-contain pt-4 pb-3"
                        />
                    )}

                    {success && (
                        <Image
                            src="/tick.png"
                            alt=""
                            height={75}
                            width={75}
                            className=" pt-4 pb-3"
                        />
                    )}
                    
                    <Image
                        src="/set-2.png"
                        alt=""
                        height={270}
                        width={160}
                        className="w-full object-contain pt-4 pb-3"
                    />

                    {success && (
                        <div className="mt-4">
                            <h5 className="text-base font-normal mb-2">
                                You own a true treasure of Kashmir.
                            </h5>
                            <strong className="text-base">
                                The batch number matches our records.
                            </strong>
                        </div>
                    )}

                    {error && (
                        <h5 className="text-base font-semibold mt-4">
                            The batch number doesn't match our records. Please recheck and reenter the batch number
                        </h5>
                    )}

                    {!error && !success && (
                        <div className="w-full mt-12">
                            <span className="text-xs">Enter your Himalayan Saffron batch no. from pack</span>
                            <input 
                                className="w-full outline-none font-semibold text-xl px-2 py-2 rounded-lg border  mt-2 text-white border-white" 
                                type="text"
                                value={batchCode}
                                onChange={(e) => setBatchCode(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleGenerateReport()}
                            />
                        </div>
                    )}

                    <button
                        className="absolute bottom-10 px-8 py-3 text-white font-semibold rounded-lg transition-colors z-30 backdrop-blur-md bg-white/5 border-2 disabled:opacity-50"
                        onClick={success ? handleViewReport : error ? handleTryAgain : handleGenerateReport}
                        disabled={loading || (!error && !success && !batchCode.trim())}
                    >
                        {loading ? "Loading..." : success ? "View Report" : error ? "Try Again" : "Generate Report"}
                    </button>
                </div>
            </div>

            {showPopup && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setShowPopup(false)}
                >
                    <div className="relative max-w-4xl w-full  max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-gray-300"
                            onClick={() => setShowPopup(false)}
                        >
                            ✕
                        </button>
                        <Image 
                            src={imageUrl} 
                            alt="Certificate" 
                            width={300}
                            height={600}
                            className="w-full object-contain md:h-[700px] rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Card