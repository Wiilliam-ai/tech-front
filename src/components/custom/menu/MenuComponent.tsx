import { useEffect, useRef } from 'react'

interface ScreenPosition {
  x: number
  y: number
}

interface Props {
  position: ScreenPosition
  onClose: () => void
  children: JSX.Element | JSX.Element[]
}

export const MenuComponent = ({ children, onClose, position }: Props) => {
  const { x, y } = position

  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])
  return (
    <div
      ref={ref}
      style={{ top: y, left: x }}
      className="absolute bg-white shadow rounded-md p-2 gap-2"
    >
      {children}
    </div>
  )
}
