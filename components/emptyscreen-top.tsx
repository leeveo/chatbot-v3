import { useEffect, useState } from 'react'
// import ReactPlayer from 'react-player' // Importation de ReactPlayer désactivée pour le moment
import { description, description2 } from '@/lib/config'

export function EmptyScreenTop({
  className
}: {
  className?: string
}) {
  const [isClient, setIsClient] = useState(false)

  // Utiliser des backticks pour l'interpolation de chaîne
  const message1 = [`${description}`]; // Correction ici, enlevant les accolades
  const message2 = [`${description2}`]; // Correction ici, enlevant les accolades
  
  // const videoUrl = "https://leeveo.s3.eu-west-3.amazonaws.com/video.mp4" // URL de la vidéo mise en commentaire
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className={`${className} text-center p-1 w-[100%] mx-auto mt-[110px]`}>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="my-3">
          <h3 className="text-base sm:text-md md:text-xl">{message1}</h3>
        </div>
        <div className="my-4">
          <h3 className="text-base sm:text-md md:text-xl">{message2}</h3>
        </div>
      </div>
    </div>
  )
}
