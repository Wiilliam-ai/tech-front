import { Button, useModalApp } from '../../components'
import { Input } from '../../components/ui/Input'
import { CardCourse } from './components/CardCourse'
import { FormCourse } from './components/FormCourse'
import { useCourses } from './hooks/useCourses'

export default function CoursesPage() {
  const { data } = useCourses()
  const { openModal } = useModalApp()

  const handleNewCourse = () => {
    openModal({
      title: 'Nuevo Curso',
      component: <FormCourse />,
      widthDimension: 35,
    })
  }

  console.log({ data })

  return (
    <div>
      <h1>Hello Page</h1>

      <section className="flex items-center justify-between">
        <Input name="email" placeholder="Busca un curso por su nombre" />
        <Button
          label="Agregar curso"
          variant="primary"
          onClick={handleNewCourse}
        />
      </section>

      <section className="flex gap-2 flex-wrap">
        {data?.map((course) => <CardCourse key={course.id} course={course} />)}
      </section>
    </div>
  )
}
