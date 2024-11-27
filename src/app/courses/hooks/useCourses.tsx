import { useQuery } from '@tanstack/react-query'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { CourseModel } from '../../../models/CourseModel'

export const useCourses = () => {
  const token = useAuthStore((state) => state.user.token)

  const http = new ApiFetch({ token })
  const courseModel = new CourseModel(http)

  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseModel.listCourse(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  })

  return { data }
}
