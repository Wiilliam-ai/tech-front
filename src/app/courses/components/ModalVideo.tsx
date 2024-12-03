import { useEffect, useState } from 'react'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { IconButton, useModalApp } from '../../../components'

interface Props {
  videoUrl: string // https://www.prueba.com/video.mp4
}

export const ModalVideo = ({ videoUrl }: Props) => {
  // LA URL DEL VIDEO ESTA PROTEGIDO POR EL TOKEN POR LO QUE SE DEBE LLAMAR POR FETCH PASANDOLE EL TOKEN

  const { closeModal } = useModalApp()

  const token = useAuthStore((state) => state.dataAuth.token)

  const [video, setVideo] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(videoUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        setVideo(URL.createObjectURL(blob))
        setLoading(false)
      })

    return () => {
      setVideo(null)
      setLoading(true)
    }
  }, [token, videoUrl])

  return (
    <div className="bg-white p-2 mt-10 w-full max-w-7xl h-max z-40 rounded-lg relative overflow-hidden group">
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-bold text-sky-700">Cargando video...</p>
        </div>
      ) : (
        <video
          src={video || ''}
          className="w-full h-[45rem] object-cover rounded-md"
          controls
        />
      )}

      <IconButton
        icon="xicon"
        className="absolute top-4 right-4 transition-all opacity-0 group-hover:opacity-100"
        label="Cerrar video"
        variant="primary"
        onClick={closeModal}
      />
    </div>
  )
}
