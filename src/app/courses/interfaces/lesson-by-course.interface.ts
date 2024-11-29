export interface ILessonByCourse {
  id: number
  title: string
  content: string
  description: string
  resources: Resources
}

export interface Resources {
  id: string
  url: string
}
