import { useState, useRef } from 'react'
import { Button, useModalApp } from '../../../components'
import { Input } from '../../../components/ui/Input'
import { InputArea } from '../../../components/ui/InputArea'
import { toast } from 'react-toastify'
import { ApiFetch, CustomError } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { useParams } from 'wouter'
import { useQueryClient } from '@tanstack/react-query'

// Interfaz para definir la estructura del video
interface IVideo {
  id: number
  url: string
  file: File | null
}

export const FormLessons = () => {
  // Hook para manejar el modal
  const { closeModal } = useModalApp()
  const queryClient = useQueryClient()

  // Referencia para el elemento de video
  const videoRef = useRef<HTMLVideoElement>(null)

  // Estado para manejar el video
  const [video, setVideo] = useState<IVideo>({
    file: null,
    id: 0,
    url: '',
  })

  // Estado para manejar los campos del formulario
  const [state, setState] = useState({
    title: '',
    description: '',
    content: '',
  })

  const token = useAuthStore((state) => state.user.token)

  const params = useParams<{ id: string }>()

  console.log({
    video,
  })

  // Manejador de carga de video
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null

    // Validar que sea un archivo de video
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setVideo({
        file: selectedFile,
        id: 0,
        url: URL.createObjectURL(selectedFile),
      })
    } else {
      toast.error('Por favor, selecciona un archivo de video válido')
    }
  }

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validaciones
    if (!video.file) {
      toast.error('Debes seleccionar un video')
      return
    }

    if (
      !state.title.trim() ||
      !state.description.trim() ||
      !state.content.trim()
    ) {
      toast.error('Debes completar todos los campos')
      return
    }

    const data = new FormData()
    data.append('title', state.title)
    data.append('description', state.description)
    data.append('content', state.content)
    // Asegúrate de usar el mismo nombre de campo que el backend espera
    data.append('video', video.file)
    data.append('courseId', params.id)

    try {
      const http = new ApiFetch({ token })
      const result = await http.postMedia('/lessons', data)
      toast.success(result?.message)

      // Invalidar cache de lecciones
      queryClient.invalidateQueries({
        queryKey: [`lessons-${params.id}`],
      })

      closeModal()
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      } else {
        // Manejo de errores genéricos
        toast.error('Ocurrió un error al crear la lección')
        console.error(error)
      }
    }
  }

  return (
    <form
      className="space-y-3"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <section className="flex gap-4">
        {/* Contenedor de video */}
        <div
          className={`w-96 bg-white overflow-hidden h-64 rounded-md border-2 ${video.file ? 'border-sky-700' : 'border-dashed'} border-gray-600`}
        >
          {video.file ? (
            <video
              ref={videoRef}
              controls
              className="w-full h-64 object-cover"
              src={video.url}
              title={video.file.name}
              // Prevenir que los eventos de input afecten el video
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : (
            <label
              htmlFor="uploadFile1"
              className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-64 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Subir archivo
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                accept="video/mp4,video/mpeg,video/quicktime"
                onChange={handleVideoUpload}
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                Formatos: MP4, MPEG, MOV
              </p>
            </label>
          )}
        </div>

        {/* Campos de formulario */}
        <div className="w-full space-y-3">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <Input
              className="w-full"
              name="title"
              placeholder="Ingresa el título"
              value={state.title}
              onChange={(e) => {
                // Detener propagación de eventos
                e.stopPropagation()
                setState({ ...state, title: e.target.value })
              }}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <Input
              className="w-full"
              name="description"
              placeholder="Describe la lección"
              value={state.description}
              onChange={(e) => {
                // Detener propagación de eventos
                e.stopPropagation()
                setState({ ...state, description: e.target.value })
              }}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Contenido
            </label>
            <InputArea
              name="content"
              className="w-full"
              placeholder="Detalles de la lección"
              value={state.content}
              onChange={(e) => {
                // Detener propagación de eventos
                e.stopPropagation()
                setState({ ...state, content: e.target.value })
              }}
            />
          </div>
        </div>
      </section>

      {/* Botones de acción */}
      <div className="flex gap-3">
        <Button label="Cancelar" variant="secondary" onClick={closeModal} />
        <Button
          label="Guardar"
          type="submit"
          variant="primary"
          onClick={() => {}}
        />
      </div>
    </form>
  )
}
