import { useState, useRef } from 'react'
import { Button, useModalApp } from '../../../components'
import { Image } from '../../../components/custom/image/Image'
import { toast } from 'react-toastify'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'

interface Props {
  srcPhoto: string
  updateAvatar: (avatar: string) => void
}

export const ModalPhotoProfile = ({
  srcPhoto,
  updateAvatar: reloadAvatar,
}: Props) => {
  const { closeModal } = useModalApp()
  const token = useAuthStore((state) => state.dataAuth.token)
  const updateAvatar = useAuthStore((state) => state.upldateAvatar)
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>(srcPhoto)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setPhoto(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    if (photo) {
      const http = new ApiFetch({ token })

      const formData = new FormData()
      formData.append('avatar', photo)

      const result = await http.postMedia<{ url: string }>(
        '/users/avatar',
        formData,
      )

      toast.success(result?.message)
      updateAvatar(result?.data?.url || '')
      reloadAvatar(result?.data?.url || '')
      closeModal()
    } else {
      toast.error('No se ha seleccionado ninguna foto.')
    }
  }

  return (
    <form>
      <Image
        src={preview}
        alt="Photo Profile"
        className="w-full h-64 object-contain"
      />

      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      <div className="grid grid-cols-2 my-2 gap-2">
        <Button
          label="Cargar"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()} // Abre el selector de archivos
        />
        <Button
          label="Guardar foto"
          variant="primary"
          onClick={handleSave} // Guardar la foto
        />
      </div>
    </form>
  )
}
