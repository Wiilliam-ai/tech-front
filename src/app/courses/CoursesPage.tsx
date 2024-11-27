import { Button, useModalApp } from '../../components'
import { Input } from '../../components/ui/Input'
import { CardCourse } from './components/CardCourse'
import { FormCourse } from './components/FormCourse'
import useCourses from './hooks/useCourses'

export default function CoursesPage() {
  const { data } = useCourses()
  const { openModal } = useModalApp()

  const handleNewCourse = () => {
    openModal({
      title: 'Nuevo Curso',
      component: <FormCourse />,
      widthDimension: 40,
    })
  }

  return (
    <div>
      <h1>Hello Page</h1>

      <section className="flex items-center justify-between my-2">
        <Input name="email" placeholder="Busca un curso por su nombre" />
        <Button
          label="Agregar curso"
          variant="primary"
          onClick={handleNewCourse}
        />
      </section>

      <section className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {data?.map((course) => <CardCourse key={course.id} course={course} />)}
      </section>
    </div>
  )
}
