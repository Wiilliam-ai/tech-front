import { useModal } from '../hooks/useModal'
import { IModalCustom } from '../provider/ModalProvider'

interface Props {
  modal: IModalCustom
}
export const ModalCustom = ({ modal }: Props) => {
  const { closeModal } = useModal()

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex justify-center p-2">
      <div
        className="absolute inset-0 bg-black/35"
        onClick={() => {
          closeModal()
        }}
      ></div>
      <>{modal.body}</>
    </div>
  )
}
