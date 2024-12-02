import { Link, useParams } from 'wouter'
import { useAuthStore } from '../../stores/auth/useAuthStore'
import { ApiFetch } from '../../plugins/http/api-fetch'
import { CourseModel } from '../../models/CourseModel'
import { useQuery } from '@tanstack/react-query'
import { PresentationCourse } from './components/PresentationCourse'
import { useModalApp } from '../../components'
import { FormLessons } from './components/FormLessons'
import { SectionLessons } from './components/SectionLessons'

export const CoursePage = () => {
  const { openModal } = useModalApp()
  const params = useParams<{ id: string }>()
  const token = useAuthStore((state) => state.user.token)

  const fetchCourse = async () => {
    const http = new ApiFetch({ token: token })
    const courseModel = new CourseModel(http)

    const course = await courseModel.getCourse(Number(params.id))
    return course
  }

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', `course-${params.id}`],
    queryFn: () => fetchCourse(),
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link
        className="p-2 rounded-md transition-colors hover:bg-gray-300 mb-2 block w-max bg-sky-700 text-white hover:text-black"
        href="/courses"
      >
        Regresar
      </Link>
      <PresentationCourse course={course!} />

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
          <SectionLessons />
        </div>
      </section>
    </div>
  )
}
