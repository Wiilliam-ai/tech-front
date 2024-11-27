import { toast } from 'react-toastify'
import { CustomError } from '../plugins/http/api-fetch'
import { HttpAdapter } from '../plugins/http/http-adapter'
import { API_URL_BACK } from '../utils/contants'

export type ICourse = {
  id: number
  description: string
  img: string
  name: string
  skills: string[]
}

export class CourseModel {
  constructor(private readonly http: HttpAdapter) {}

  async listCourse() {
    try {
      const result = await this.http.get<ICourse[]>('/courses')
      const courses =
        result.data?.map((data) => {
          return {
            ...data,
            img: API_URL_BACK + '/assets/' + data.img,
          }
        }) || []

      return courses as ICourse[]
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }
}