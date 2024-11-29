import { useQuery } from '@tanstack/react-query'
import { ApiFetch } from '../../../plugins/http/api-fetch'
import { useAuthStore } from '../../../stores/auth/useAuthStore'
import { LessonModel } from '../../../models/LessonModel'

export const useLessons = (coursId: number) => {
  const token = useAuthStore((state) => state.user.token)

  const http = new ApiFetch({ token: token })
  const lessonModel = new LessonModel(http)

  const { data, isLoading, error } = useQuery({
    queryKey: [`lessons-${coursId}`],
    queryFn: () => lessonModel.listLessonByCourse(coursId),
    staleTime: 1000 * 60 * 15,
  })

  return { data, isLoading, error }
}
