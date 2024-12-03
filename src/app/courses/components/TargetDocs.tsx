import {
  FileCode2Icon,
  FileImageIcon,
  FilesIcon,
  FileTextIcon,
  ImageIcon,
} from 'lucide-react'
import { IDocs } from '../interfaces/lesson-by-course.interface'
import { MenuPop } from '../../../components/custom/menu/MenuPop'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { ApiFetch, CustomError } from '../../../plugins/http/api-fetch'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'wouter'
import { useModalApp } from '../../../components'
import { ImageDocModal } from '../../docs/components/ImageDocModal'
import { DocumentDocModal } from '../../docs/components/DocumentDocModal'
import { CodeDocModal } from '../../docs/components/CodeDocModal'

interface Props {
  doc: IDocs
}

export const TargetDocs = ({ doc }: Props) => {
  const { onAlert, openModal } = useModalApp()
  const token = useAuthStore((state) => state.dataAuth.token)
  const queryClient = useQueryClient()
  const params = useParams<{ id: string }>()

  const handleDelete = async () => {
    const hhtp = new ApiFetch({ token: token })

    try {
      const result = await hhtp.delete(`/docs/${doc.id}`)
      toast.success(result.message)
      queryClient.invalidateQueries({
        queryKey: [`lessons-${params.id}`],
      })
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }

  const handleDeleteDocs = async () => {
    onAlert({
      title: 'Eliminar documento',
      description: '¿Estás seguro de eliminar este documento?',
      onAccept: async () => {
        await handleDelete()
      },
    })
  }

  const handleOpenDocs = () => {
    const textTitle =
      doc.typeDoc === 'image'
        ? `Imagen - ${doc.title}`
        : doc.typeDoc === 'docs'
          ? `Documento - ${doc.title}`
          : `Código - ${doc.title}`

    const component =
      doc.typeDoc === 'image' ? (
        <ImageDocModal data={doc} />
      ) : doc.typeDoc === 'docs' ? (
        <DocumentDocModal data={doc} />
      ) : (
        <CodeDocModal />
      )

    openModal({
      title: textTitle,
      component: component,
      widthDimension: 35,
    })
  }

  return (
    <MenuPop
      data={[
        {
          label: 'Eliminar',
          onClick: handleDeleteDocs,
        },
      ]}
    >
      <div onClick={handleOpenDocs} role="presentation">
        {doc.typeDoc === 'image' && <ImageComponent doc={doc} />}
        {doc.typeDoc === 'docs' && <DocsComponent doc={doc} />}
        {doc.typeDoc === 'code' && <CodeComponent doc={doc} />}
      </div>
    </MenuPop>
  )
}

const ImageComponent = (doc: Props) => {
  return (
    <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-gray-600">
      <FileImageIcon className="text-white" />
      <p className="text-white text-center">{doc.doc.title}</p>
    </div>
  )
}

const DocsComponent = (doc: Props) => {
  // const typesDocs = ['pdf', 'docx', 'pptx', 'xlsx']
  const TYPE_PDF = 'pdf'
  const TYPE_DOCX = 'docx'
  const TYPE_PPTX = 'pptx'
  const TYPE_XLSX = 'xlsx'

  const extDocs = doc.doc.document.split('.')
  const ext = extDocs[extDocs.length - 1]

  const isPdf = ext === TYPE_PDF
  const isDocx = ext === TYPE_DOCX
  const isPptx = ext === TYPE_PPTX
  const isXlsx = ext === TYPE_XLSX

  if (isPdf) {
    return (
      <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-red-600">
        <FileTextIcon className="text-white" />
        <p className="text-white text-center">{doc.doc.title}</p>
      </div>
    )
  }

  if (isDocx) {
    return (
      <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-blue-600">
        <FileTextIcon className="text-white" />
        <p className="text-white text-center">{doc.doc.title}</p>
      </div>
    )
  }

  if (isPptx) {
    return (
      <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-yellow-600">
        <ImageIcon className="text-white" />
        <p className="text-white text-center">{doc.doc.title}</p>
      </div>
    )
  }

  if (isXlsx) {
    return (
      <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-green-600">
        <FilesIcon className="text-white" />
        <p className="text-white text-center">{doc.doc.title}</p>
      </div>
    )
  }

  // default in gray
  return (
    <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-gray-600">
      <ImageIcon className="text-white" />
      <p className="text-white text-center">{doc.doc.title}</p>
    </div>
  )
}

const CodeComponent = (doc: Props) => {
  return (
    <div className="flex items-center gap-2 border w-max p-1 rounded-lg border-transparent bg-yellow-600">
      <FileCode2Icon className="text-white" />
      <p className="text-white text-center">{doc.doc.title}</p>
    </div>
  )
}
