import { useState } from 'react'
import { Button } from '../../../ui/Button'
import { useModal } from '../hooks/useModal'
import { IModalEvent } from '../provider/ModalProvider'

interface Props {
  data: IModalEvent
}

export const ModalAlert = ({ data }: Props) => {
  const { closeModal } = useModal()
  const [isSending, setIsSending] = useState(false)

  const handleAccept = async () => {
    setIsSending(true)
    await data.onAccept()
    setIsSending(false)
    closeModal()
  }

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex justify-center p-2">
      <div
        className="absolute inset-0 bg-black/35"
        onClick={() => {
          if (isSending) return
          closeModal()
        }}
      ></div>
      <div className="animate-fadeInUp bg-white w-full rounded-2xl z-40 h-max mt-20 max-w-md p-2">
        <h1 className="text-lg md:text-xl font-bold text-gray-700 text-center">
          {data.title}
        </h1>
        <p className="text-sm text-center text-gray-800">{data.description}</p>

        <div className="grid grid-cols-2 gap-3 px-2 my-2">
          <Button
            label="Cancelar"
            variant="secondary"
            disabled={isSending}
            onClick={() => closeModal()}
          />
          <Button
            label="Aceptar"
            variant="primary"
            disabled={isSending}
            onClick={handleAccept}
          />
        </div>
      </div>
    </div>
  )
}
