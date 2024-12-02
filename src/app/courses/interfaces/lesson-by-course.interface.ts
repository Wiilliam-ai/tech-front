export interface ILessonByCourse {
  id: number
  title: string
  content: string
  description: string
  resources: Resources
  docs: IDocs[]
}

export interface Resources {
  id: string
  url: string
}

export interface IDocs {
  id: string
  title: string
  document: string
  typeDoc: 'image' | 'docs' | 'code'
}
