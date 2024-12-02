import { Button } from '../../../components'
import { Image } from '../../../components/custom/image/Image'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { API_URL_BACK } from '../../../utils/contants'
import { IDocs } from '../../courses/interfaces/lesson-by-course.interface'

interface Props {
  data: IDocs
}

export const ImageDocModal = ({ data }: Props) => {
  const URL_IMAGE = API_URL_BACK + '/assets/docs/' + data.document

  const handleDownload = async () => {
    try {
      const authStore = useAuthStore.getState()
      const token = authStore.user.token

      const response = await fetch(URL_IMAGE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Error al descargar el archivo')
      }

      // Convertir la respuesta a Blob
      const blob = await response.blob()
      // Crear una URL para el Blob
      const url = URL.createObjectURL(blob)

      // Crear un enlace dinámico para iniciar la descarga
      const link = document.createElement('a')
      link.href = url
      link.download = data.title // Nombre del archivo para la descarga
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Liberar la URL creada
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar:', error)
      alert('No se pudo descargar el archivo. Inténtalo nuevamente.')
    }
  }

  return (
    <div>
      <div className="w-full h-80 border-2 border-sky-700 rounded-2xl p-2">
        <Image
          className="w-full h-full object-contain"
          src={URL_IMAGE}
          alt={data.title}
        />
      </div>
      <Button
        className="w-full mt-2"
        label="Descargar"
        variant="primary"
        onClick={handleDownload}
      />
    </div>
  )
}
