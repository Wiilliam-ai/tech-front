import { useState } from 'react'
import { MenuComponent } from './MenuComponent'
import { LucideProps } from 'lucide-react'

type IconLucide = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>

interface Option {
  label: string
  onClick: () => void
  Icon?: IconLucide
}

interface Props {
  children: JSX.Element | JSX.Element[]
  data: Option[]
}

export const MenuPop = ({ children, data }: Props) => {
  const [showOptions, setShowOptions] = useState(false)
  const [positionOptions, setPositionOptions] = useState({ x: 0, y: 0 })

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowOptions(true)
    setPositionOptions({ x: e.clientX, y: e.clientY })
  }

  const handleCloseOptions = () => {
    setShowOptions(false)
  }

  return (
    <div onContextMenu={handleRightClick} onMouseLeave={handleCloseOptions}>
      {children}

      {showOptions ? (
        <MenuComponent position={positionOptions} onClose={handleCloseOptions}>
          <div className="flex flex-col gap-2">
            {data.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={item.onClick}
                className="text-gray-700 hover:text-sky-700 flex items-center gap-2"
              >
                {item.Icon && <item.Icon size={17} />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </MenuComponent>
      ) : (
        <></>
      )}
    </div>
  )
}
