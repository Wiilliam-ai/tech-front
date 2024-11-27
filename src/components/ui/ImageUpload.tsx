import React, { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { IconButton } from './IconButton'

interface ImageUploadProps {
  image: string | null
  setImage: (image: string | null) => void
  setFile: (file: File | null) => void // Nueva propiedad
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  setImage,
  setFile,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Validate file type (optional)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setFile(file) // Guardamos el archivo original
    } else {
      alert('Por favor, sube un archivo de imagen')
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div
      className={`
        w-full max-w-md mx-auto p-6 border-2 border-dashed rounded-lg 
        transition-colors duration-300
        ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500'
        }
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept="image/*"
        className="hidden"
        id="file-upload"
      />

      {image ? (
        <div className="relative group">
          <img
            src={image}
            alt="Imagen subida"
            className="w-full h-36 object-cover rounded-lg"
          />
          <IconButton
            icon="trash"
            onClick={handleRemoveImage}
            label="Eliminar imagen"
            size="sm"
            className="absolute top-2 right-2 hidden group-hover:block"
            variant="destroy"
          />
        </div>
      ) : (
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Arrastra y suelta una imagen aquí, o{' '}
            <label
              htmlFor="file-upload"
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              haz clic para seleccionar
            </label>
          </p>
          <p className="text-xs text-gray-500">PNG, JPG hasta 1MB</p>
        </div>
      )}
    </div>
  )
}
