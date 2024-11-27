import { useQuery } from '@tanstack/react-query'
import { ICourse } from '../../../models/CourseModel'
import fetchImage from '../utils/fetchImage'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { useModalApp } from '../../../components'
import { FormLessons } from './FormLessons'

interface Props {
  course: ICourse
}

export const PresentationCourse = ({ course }: Props) => {
  const { openModal } = useModalApp()
  const token = useAuthStore((state) => state.user.token)

  const { data: imgSrc } = useQuery({
    queryKey: [course.img],
    queryFn: () => fetchImage(course.img, token),
    staleTime: 1000 * 60 * 15,
  })

  const handleNewLesson = () => {
    openModal({
      title: 'Nueva clase',
      component: <FormLessons />,
      widthDimension: 70,
      dismissAuto: false,
    })
  }

  return (
    <section>
      <section className="relative border rounded-3xl overflow-hidden">
        <figure className="h-[20rem]">
          <img
            className="w-full h-full object-cover object-center"
            src={imgSrc}
            alt=""
          />
        </figure>
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
        <section className="mt-2 grid grid-cols-7 gap-3">
          <div className="col-span-1 bg-white p-2 rounded-md h-max">
            Otros cursos relacionados
          </div>
          <div className="col-span-6 bg-white p-2 rounded-md">
            <h3 className="text-2xl font-bold text-center">Clases del curso</h3>
            <button
              className="bg-gray-200 p-2 w-full rounded-md my-2 border border-dashed border-sky-700 uppercase font-bold transition-all duration-500 hover:bg-gradient-to-b hover:from-sky-700 hover:to-indigo-800 hover:text-white"
              onClick={handleNewLesson}
            >
              Agrega una nueva clase
            </button>
          </div>
        </section>
      </section>
    </section>
  )
}
