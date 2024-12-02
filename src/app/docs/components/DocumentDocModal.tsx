import { useQuery } from '@tanstack/react-query'
import { IDocs } from '../../courses/interfaces/lesson-by-course.interface'
import { fetchProtectedFile } from '../utils/fetchProtectedFile'
import { API_URL_BACK } from '../../../utils/contants'

interface Props {
  data: IDocs
}

export const DocumentDocModal = ({ data }: Props) => {
  const URL_IMAGE = `${API_URL_BACK}/assets/docs/${data.document}`

  const {
    data: fileUrl,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`docs-${data.typeDoc}-${data.id}`],
    queryFn: () => fetchProtectedFile(URL_IMAGE),
    staleTime: 1000 * 60 * 15, // 15 minutos
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader"></div> {/* Añade tu spinner o indicador aquí */}
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

  return (
    <div>
      <div>
        <h3 className="mb-4 text-lg font-bold">{data.title}</h3>
        <div className="border-2 rounded-lg">
          {/** Usar un iframe */}

          <iframe
            src={fileUrl}
            title={data.title}
            className="w-full h-[600px]"
          />
        </div>
      </div>
    </div>
  )
}
