import { IConfModal, ModalContext } from '../context/ModalContext'
import { useState } from 'react'

export interface IModalState {
  title: string
  active: boolean
  dismissAuto: boolean
  widthDimension: number
  bodyModal: JSX.Element | JSX.Element[] | null
}

export interface IModalEvent {
  title: string
  description: string
  onAccept: () => Promise<void>
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export type IModalItem =
  | ({ type: 'modal' } & IModalState)
  | ({ type: 'event' } & IModalEvent)

const INITIAL_STATE: IModalItem[] = []

export const ModalProvider = ({ children }: Props) => {
  const [state, setState] = useState<IModalItem[]>(INITIAL_STATE)

  const handleOpenModal = (conf: IConfModal) => {
    const { dismissAuto = true, widthDimension = 10 } = conf
    const modal: IModalState = {
      title: conf.title,
      active: true,
      dismissAuto,
      widthDimension,
      bodyModal: conf.component,
    }
    setState([...state, { type: 'modal', ...modal }])
  }

  const handleEventModal = (conf: IModalEvent) => {
    setState([...state, { type: 'event', ...conf }])
  }

  const handleCloseModal = () => {
    // quitar el último modal o evento
    const newState = state.slice(0, -1)
    setState(newState)
  }

  return (
    <ModalContext.Provider
      value={{
        modalsState: state,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
        onAlert: handleEventModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
