import { useParams } from 'wouter'
import { useLessons } from '../hooks/useLessons'
import { CardLesson } from './CardLesson'

export const SectionLessons = () => {
  const params = useParams<{ id: string }>()

  const { data: lessons } = useLessons(Number(params.id))

  return (
    <div className="flex flex-col gap-2">
      {lessons?.map((lesson, index) => (
        <CardLesson key={lesson.id} index={index} lesson={lesson} />
      ))}
    </div>
  )
}
