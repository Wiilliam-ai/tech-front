import { createContext } from 'react'
import {
  IModalCustom,
  IModalEvent,
  IModalItem,
} from '../provider/ModalProvider'

export interface IConfModal {
  title: string
  component: JSX.Element | null
  dismissAuto?: boolean
  widthDimension?: number
}

interface IModalContext {
  modalsState: IModalItem[]
  openModal: (conf: IConfModal) => void
  closeModal: () => void
  onAlert: (alert: IModalEvent) => void
  onModalCustom: (custom: IModalCustom) => void
}

export const ModalContext = createContext<IModalContext>({} as IModalContext)
