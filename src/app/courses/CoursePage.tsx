import { useParams } from 'wouter'
import { useAuthStore } from '../../stores/auth/useAuthStore'
import { ApiFetch } from '../../plugins/http/api-fetch'
import { CourseModel } from '../../models/CourseModel'
import { useQuery } from '@tanstack/react-query'
import { PresentationCourse } from './components/PresentationCourse'

export const CoursePage = () => {
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PresentationCourse course={course!} />
    </div>
  )
}
