import clsx from 'clsx'
import {
  EditIcon,
  MenuIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from 'lucide-react'

const configButton = {
  primary: 'text-white bg-sky-700 p-2 border border-sky-700 hover:bg-sky-800',
  secondary:
    'text-white bg-gray-700 p-2 border border-gray-700 hover:bg-gray-800',
  destroy: 'text-white bg-red-700 p-2 border border-red-700 hover:bg-red-800',
  blank:
    'text-white bg-transparent p-2 border border-transparent hover:bg-gray-800',
}

const iconButton = {
  trash: TrashIcon,
  plus: PlusIcon,
  edit: EditIcon,
  menu: MenuIcon,
  xicon: XCircleIcon,
}

const configSize = {
  sm: 18,
  md: 25,
  lg: 32,
}

type Variant = keyof typeof configButton
type Icon = keyof typeof iconButton
type Size = keyof typeof configSize

interface Props {
  size?: Size
  label: string
  variant: Variant
  icon: Icon
  className?: string
  onClick: () => void
}

export const IconButton = ({
  label,
  onClick,
  variant,
  icon,
  className,
  size = 'md',
}: Props) => {
  const buttonClass = configButton[variant] || configButton.primary

  const existIcon = icon !== undefined ? iconButton[icon] : null
  const sizeIcon = configSize[size] || configSize.md

  const Icon = existIcon

  return (
    <button
      className={clsx(buttonClass, 'shadow-md rounded-full', className)}
      type={'button'}
      onClick={onClick}
      aria-label={label}
    >
      {Icon && <Icon size={sizeIcon} />}
    </button>
  )
}
