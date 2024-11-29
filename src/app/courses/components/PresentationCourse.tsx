import { ICourse } from '../../../models/CourseModel'
import { IconButton } from '../../../components'
import { Image } from '../../../components/custom/image/Image'
import { useState } from 'react'

interface Props {
  course: ICourse
}

export const PresentationCourse = ({ course }: Props) => {
  const [openOptions, setOpenOptions] = useState(false)

  return (
    <section>
      <section className="relative border rounded-3xl overflow-hidden">
        <figure className="h-[20rem]">
          <Image
            src={course.img}
            alt={course.name}
            className="w-full h-full object-cover object-center"
          />
        </figure>
        <section className="absolute top-2 right-2 flex  flex-col items-end gap-2">
          <IconButton
            icon="settings2"
            label="Configuración"
            variant={openOptions ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setOpenOptions(!openOptions)}
          />
          {openOptions && (
            <div className=" bg-white shadow-md rounded-md overflow-hidden">
              <ul>
                <li className="p-2 hover:bg-gray-200">
                  <button>Inhabilitar curso</button>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <button>Eliminar curso</button>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <button>Cambiar los datos</button>
                </li>
                <li className="p-2 hover:bg-gray-200">
                  <button>Cambiar la imagen</button>
                </li>
              </ul>
            </div>
          )}
        </section>
        <div className="absolute bottom-0 flex items-center justify-start w-full">
          <article className="p-4 bg-white ">
            <h2 className="text-2xl font-bold text-gray-800">{course.name}</h2>
          </article>
        </div>
      </section>
      <section className="px-2 text-gray-700">
        <p className="mt-2">
          <strong>Descripción del curso: </strong>
          {course.description}
        </p>
        <div className="w-full">
          {course.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 rounded-lg text-xs inline-block m-1 relative border border-transparent transition-colors hover:border-sky-700"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
