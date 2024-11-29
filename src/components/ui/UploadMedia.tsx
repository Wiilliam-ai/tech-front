import { useRef, useState } from 'react'

type TypeMedia = 'image' | 'video' | 'audio' | 'document' | 'other'

interface Props {
  typeMedia: TypeMedia
  multiple?: boolean
  maxSize: number // in MB
}

export const UploadMedia = ({
  typeMedia,
  multiple = false,
  maxSize,
}: Props) => {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const limitSize = maxSize * 1024 * 1024

  const accept = () => {
    switch (typeMedia) {
      case 'image':
        return 'image/*'
      case 'video':
        return 'video/*'
      case 'audio':
        return 'audio/*'
      case 'document':
        return '.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx'
      default:
        return '*'
    }
  }

  const handleFiles = (fileList: FileList) => {
    const selectedFiles = Array.from(fileList)
    const validFiles = selectedFiles.filter((file) => file.size <= limitSize)
    const invalidFiles = selectedFiles.filter((file) => file.size > limitSize)

    if (invalidFiles.length > 0) {
      setError(
        `Algunos archivos superan el tamaño máximo permitido (${maxSize}MB): ${invalidFiles
          .map((file) => file.name)
          .join(', ')}`,
      )
      return
    }

    setError(null)
    setFiles(validFiles)
  }

  const renderPreview = (file: File) => {
    if (typeMedia === 'image') {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="max-w-xs rounded-lg"
        />
      )
    }

    if (typeMedia === 'video' || typeMedia === 'audio') {
      return (
        <video
          controls
          className="max-w-xs rounded-lg"
          src={URL.createObjectURL(file)}
          title={file.name}
        />
      )
    }

    if (typeMedia === 'document') {
      return <p className="text-gray-600">{file.name}</p>
    }

    return <p className="text-gray-600">Archivo: {file.name}</p>
  }

  return (
    <div className="upload-media">
      <input
        type="file"
        ref={inputRef}
        accept={accept()}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files)
          }
        }}
      />

      <label
        className="bg-gray-200 p-2 w-full rounded-md my-2 border border-dashed border-sky-700 uppercase font-bold transition-all duration-500 hover:bg-gradient-to-b hover:from-sky-700 hover:to-indigo-800 hover:text-white cursor-pointer"
        onClick={(e) => {
          e.preventDefault()
          inputRef.current?.click()
        }}
      >
        Subir archivo
      </label>

      {error && <p className="text-red-600 font-medium my-2">{error}</p>}

      {files.length > 0 && (
        <div className="file-list mt-4 space-y-4">
          {files.map((file, index) => (
            <div key={index} className="file-preview space-y-2">
              {renderPreview(file)}
              <p className="text-sm text-gray-500">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
