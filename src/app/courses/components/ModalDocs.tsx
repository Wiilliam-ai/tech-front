import { useState } from 'react'
import { Button, useModalApp } from '../../../components'
import { Input } from '../../../components/ui/Input'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'wouter'

interface IDoc {
  title: string
  file: File | null
}

interface Props {
  lessonId: number
}

const initialDoc: IDoc = {
  title: '',
  file: null,
}

export const ModalDocs = ({ lessonId }: Props) => {
  const { closeModal } = useModalApp()
  const [isSending, setIsSending] = useState(false)
  const [state, setState] = useState(initialDoc)

  const token = useAuthStore((state) => state.dataAuth.token)
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)
    const formData = new FormData()
    formData.append('title', state.title)
    formData.append('docs', state.file as Blob)
    formData.append('lessonId', lessonId.toString())

    if (!state.file) {
      setIsSending(false)
      toast.error('Debe seleccionar un archivo')
      return
    }

    if (!state.title) {
      setIsSending(false)
      toast.error('Debe ingresar un título')
      return
    }

    const http = new ApiFetch({ token })

    const result = await http.postMedia('/docs', formData)

    if (!result) {
      setIsSending(false)
      return
    }

    setIsSending(false)

    toast.success(result?.message)
    queryClient.invalidateQueries({
      queryKey: [`lessons-${params.id}`],
    })

    closeModal()
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-xs">
        Adjunte un recurso para la clase estos pueden ser archivos de texto como
        PDF, DOCX o imágenes.
      </p>
      <div className="my-2">
        <label className="font-bold text-gray-700" htmlFor="title">
          Titulo del contenido
        </label>
        <Input
          className="w-full"
          name="title"
          placeholder="Título del recurso"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />
      </div>
      {/** ahora el archivo */}

      <div className="my-2">
        <label className="font-bold text-gray-700" htmlFor="file">
          Archivo
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="w-full"
          onChange={(e) => setState({ ...state, file: e.target.files![0] })}
        />
      </div>

      <Button
        className="w-full"
        type="submit"
        disabled={isSending}
        label="Guardar"
        onClick={() => {}}
        variant="primary"
      />
    </form>
  )
}
