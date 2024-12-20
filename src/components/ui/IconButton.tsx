import clsx from 'clsx'
import {
  EditIcon,
  MenuIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
  ReceiptText,
  Settings2Icon,
  CameraIcon,
} from 'lucide-react'

const configButton = {
  primary: 'text-white bg-sky-700 p-2 border border-sky-700 hover:bg-sky-800',
  secondary:
    'text-white bg-gray-700 p-2 border border-gray-700 hover:bg-gray-800',
  destroy: 'text-white bg-red-700 p-2 border border-red-700 hover:bg-red-800',
  blank:
    'text-black bg-white p-2 border border-white transition-all hover:shadow-md hover:text-sky-700 hover:border-sky-700',
}

const iconButton = {
  trash: TrashIcon,
  plus: PlusIcon,
  edit: EditIcon,
  menu: MenuIcon,
  xicon: XCircleIcon,
  receipText: ReceiptText,
  settings2: Settings2Icon,
  camera: CameraIcon,
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
  placeLabel?: string
  onClick: () => void
}

export const IconButton = ({
  label,
  onClick,
  variant,
  icon,
  className,
  size = 'md',
  placeLabel,
}: Props) => {
  const buttonClass = configButton[variant] || configButton.primary

  const existIcon = icon !== undefined ? iconButton[icon] : null
  const sizeIcon = configSize[size] || configSize.md

  const Icon = existIcon

  return (
    <button
      className={clsx(
        buttonClass,
        'shadow-md rounded-full flex items-center',
        className,
      )}
      type={'button'}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {Icon && <Icon size={sizeIcon} />}
      {placeLabel ? <span className="ml-2">{label}</span> : null}
    </button>
  )
}
