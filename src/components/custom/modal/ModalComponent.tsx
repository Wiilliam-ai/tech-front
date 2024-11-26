import { Fragment } from 'react'
import { ModalApp } from './components/ModalApp'
import { useModal } from './hooks/useModal'
import { ModalAlert } from './components/ModalAlert'

export const ModalComponent = () => {
  const { modalsState } = useModal()
  const existsModal = modalsState.length > 0

  if (!existsModal) return null

  return (
    <>
      {modalsState.map((modal, index) => {
        return (
          <Fragment key={index}>
            {modal.type === 'modal' && <ModalApp data={modal} />}
            {modal.type === 'event' && <ModalAlert data={modal} />}
          </Fragment>
        )
      })}
    </>
  )
}
