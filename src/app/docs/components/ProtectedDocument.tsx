import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import DocViewer, { DocViewerRenderers, IDocument } from 'react-doc-viewer'

// Utility function to get file extension
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || ''
}

// Utility function to map file extension to MIME type
const getMimeType = (extension: string): string => {
  const mimeTypes: { [key: string]: string } = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    csv: 'text/csv',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
  }
  return mimeTypes[extension] || 'application/octet-stream'
}

// Interface for document data
interface DocumentData {
  id: string
  title: string
  document: string
  typeDoc?: string
}

// Props interface
interface DocumentViewerProps {
  data: DocumentData
  apiUrlBack: string
  getAuthToken: () => string
}

export const ProtectedDocumentViewer: React.FC<DocumentViewerProps> = ({
  data,
  apiUrlBack,
  getAuthToken,
}) => {
  // Construct the full document URL
  const documentUrl = `${apiUrlBack}/assets/docs/${data.document}`

  // Determine file type
  const fileExtension = getFileExtension(data.document)
  const mimeType = getMimeType(fileExtension)

  // Fetch protected file
  const fetchProtectedFile = async (): Promise<Blob> => {
    try {
      const response = await fetch(documentUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': mimeType,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.blob()
    } catch (error) {
      console.error('Error fetching protected file:', error)
      throw error
    }
  }

  // Use React Query to fetch the document
  const {
    data: blobData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`protected-doc-${data.id}`],
    queryFn: fetchProtectedFile,
    staleTime: 1000 * 60 * 15, // 15 minutes cache
  })

  // Manage blob URL
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  useEffect(() => {
    if (blobData) {
      // Create object URL
      const objectUrl = URL.createObjectURL(
        new Blob([blobData], { type: mimeType }),
      )
      setFileUrl(objectUrl)

      // Cleanup function
      return () => {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [blobData, mimeType])

  // Rendering logic
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500">
          Loading...
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Error loading document:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    )
  }

  if (!fileUrl) {
    return <div className="p-4">No file could be loaded.</div>
  }

  // Prepare document for DocViewer
  const documents: IDocument[] = [
    {
      uri: fileUrl,
      fileType: fileExtension,
    },
  ]

  return (
    <div className="w-full h-[600px]">
      <h3 className="mb-4 text-lg font-bold">{data.title}</h3>
      <div className="border-2 rounded-lg h-full overflow-hidden">
        {/* Fallback render for problematic files */}
        {['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(
          fileExtension,
        ) ? (
          <DocViewer
            documents={documents}
            pluginRenderers={DocViewerRenderers}
            config={{
              header: {
                disableHeader: true,
              },
            }}
            className="h-full"
          />
        ) : (
          <iframe src={fileUrl} className="w-full h-full" title={data.title} />
        )}
      </div>
    </div>
  )
}
