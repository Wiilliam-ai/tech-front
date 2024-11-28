import { Button, useModalApp } from '../../../components'

export const FormLessons = () => {
  const { closeModal } = useModalApp()

  return (
    <div>
      <section>
        <div></div>
      </section>

      <Button label="Cancelar" variant="primary" onClick={closeModal} />
    </div>
  )
}
