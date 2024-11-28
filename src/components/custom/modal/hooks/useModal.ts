import { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'

export const useModal = () => {
  return useContext(ModalContext)
}

export const useModalApp = () => {
  const { openModal, onAlert, closeModal } = useContext(ModalContext)

  return {
    openModal,
    onAlert,
    closeModal,
  }
}
