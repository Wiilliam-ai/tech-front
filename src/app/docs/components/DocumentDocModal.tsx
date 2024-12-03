import { useQuery } from '@tanstack/react-query'
import { IDocs } from '../../courses/interfaces/lesson-by-course.interface'
import { fetchProtectedFile } from '../utils/fetchProtectedFile'
import { API_URL_BACK } from '../../../utils/contants'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { Button } from '../../../components'
import { useAuthStore } from '../../../stores/auth/useAuthStore'

interface Props {
  data: IDocs
}

export const DocumentDocModal = ({ data }: Props) => {
  const URL_IMAGE = `${API_URL_BACK}/assets/docs/${data.document}`

  const fileIsPdf = data.document.includes('.pdf')

  const {
    data: resultData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`docs-${data.typeDoc}-${data.id}`],
    queryFn: () => fetchProtectedFile(URL_IMAGE),
    staleTime: 1000 * 60 * 40,
  })

  const fileUrl = resultData?.url
  const fileType = resultData?.type

  const handleDownload = async () => {
    try {
      const authStore = useAuthStore.getState()
      const token = authStore.dataAuth.token

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error al cargar el documento. Por favor, intenta nuevamente.
      </div>
    )
  }

  if (!fileIsPdf) {
    // el typo de documento aun no es compatible

    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p>
          El tipo de documento no es compatible para ser previsualizado pero
          puede descargarlo
        </p>

        <Button onClick={handleDownload} label="Descargar" variant="primary" />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-4xl h-auto max-h-[80vh] overflow-auto shadow-lg">
        <DocViewer
          documents={[
            {
              uri: fileUrl ? fileUrl : '',
              fileType: fileType,
              fileName: data.title,
            },
          ]}
          config={{
            header: {
              disableHeader: true,
            },
            pdfVerticalScrollByDefault: true,
          }}
          pluginRenderers={DocViewerRenderers}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
