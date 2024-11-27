import { useQuery } from '@tanstack/react-query'
import { ICourse } from '../../../models/CourseModel'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { Button, IconButton } from '../../../components'
import { useLocation } from 'wouter'

interface Props {
  course: ICourse
}

const fetchImage = async (img: string, token: string) => {
  const response = await fetch(img, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar la imagen')
  }

  // Convierte la respuesta en un Blob
  const blob = await response.blob()
  // Crea una URL para el Blob
  const imageUrl = URL.createObjectURL(blob)
  return imageUrl
}

export const CardCourse = ({ course }: Props) => {
  const token = useAuthStore((state) => state.user.token)
  const [pathname, navigate] = useLocation()

  const { data: imgSrc } = useQuery({
    queryKey: [course.img],
    queryFn: () => fetchImage(course.img, token),
    staleTime: 1000 * 60 * 15,
  })

  return (
    <article className="bg-white w-full max-w-72 border rounded-xl overflow-hidden shadow-md">
      <figure className="bg-gradient-to-br from-sky-700 to-indigo-900">
        <img
          className="w-full max-w-md h-40 object-scale-down"
          src={imgSrc}
          alt={course.name}
        />
      </figure>
      <section className="p-2">
        <h4 className="font-bold text-gray-700">{course.name}</h4>
        <ul
          className="flex overflow-x-scroll"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
          }}
        >
          {course.skills.map((skill, index) => (
            <li
              className="bg-gray-100 h-max text-nowrap rounded-md px-2 py-1 m-1 border border-transparent transition-colors text-xs hover:border-sky-700"
              key={index}
            >
              {skill}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3">
            <Button
              className="text-sm w-full"
              label="Ir al curso"
              variant="primary"
              onClick={() => {
                navigate(`${pathname}/${course.id}`)
              }}
            />
          </div>
          <div className="col-span-1 flex justify-end">
            <IconButton
              icon="receipText"
              label="s"
              onClick={() => {}}
              variant="secondary"
              size="sm"
            />
          </div>
        </div>
      </section>
    </article>
  )
}
