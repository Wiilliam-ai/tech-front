interface Props {
  active: boolean
  children: JSX.Element | JSX.Element[]
  size?: number
  dismissAuto?: boolean
  closeModal: () => void
}

export const Modal = ({
  active,
  children,
  closeModal,
  size = 30,
  dismissAuto = true,
}: Props) => {
  if (!active) return null
  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex justify-center p-2">
      <div
        className="absolute inset-0 bg-black bg-opacity-15"
        onClick={() => {
          if (!dismissAuto) return
          closeModal()
        }}
      ></div>
      <div
        className="animate-fadeInUp bg-sky-700 w-full rounded-2xl z-40 h-max mt-20"
        style={{
          maxWidth: `${size}rem`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
