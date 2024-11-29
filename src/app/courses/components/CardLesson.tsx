import { ChevronDown, VideoIcon } from 'lucide-react'
import { ILessonByCourse } from '../interfaces/lesson-by-course.interface'
import { useState } from 'react'
import { useModalApp } from '../../../components'
import { ModalVideo } from './ModalVideo'

interface Props {
  lesson: ILessonByCourse
  index: number
}

export const CardLesson = ({ index, lesson }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { onModalCustom } = useModalApp()

  const handleOpenModal = () => {
    onModalCustom({
      body: <ModalVideo videoUrl={lesson.resources.url} />,
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <section className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-xl">
        <p className="text-lg font-semibold text-white">
          CLASE {index + 1}:{' '}
          <span className="font-normal text-gray-300"> {lesson.title} </span>
        </p>
        <button
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Cerrar detalles' : 'Abrir detalles'}
          className="hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            className={`transform text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </section>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-screen p-4' : 'max-h-0 p-0'}`}
        style={{ maxHeight: isExpanded ? '1000px' : '0' }}
      >
        <div>
          <button
            className="flex gap-2 border rounded-md px-3 py-2 w-max transition-all hover:bg-sky-700 hover:text-white"
            onClick={handleOpenModal}
          >
            <VideoIcon />
            <p>Video de la clase</p>
          </button>
          <div className="px-3">
            <p className="text-gray-800">
              <span className="font-semibold">Descripción:</span>{' '}
              {lesson.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}