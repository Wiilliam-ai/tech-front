import { toast } from 'react-toastify'
import { CustomError } from '../plugins/http/api-fetch'
import { HttpAdapter } from '../plugins/http/http-adapter'
import { ILessonByCourse } from '../app/courses/interfaces/lesson-by-course.interface'
import { API_URL_BACK } from '../utils/contants'

export class LessonModel {
  constructor(private readonly http: HttpAdapter) {}

  async listLessonByCourse(courseId: number) {
    try {
      const result = await this.http.post<ILessonByCourse[]>(
        '/lessons/byCourse',
        { courseId },
      )
      const lessons = result.data?.map((data) => {
        return {
          ...data,
          resources: {
            id: data.resources.id,
            url:
              API_URL_BACK + '/assets/lessons/' + data.resources.url + '.mp4',
          },
        }
      })

      return lessons
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }
}
