import clsx from 'clsx'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'

const configButton = {
  primary: 'bg-sky-700 text-white py-1 px-3 rounded-md',
  secondary: 'bg-gray-700 flex text-white py-1 px-3 rounded-md',
  destroy: 'bg-red-700 text-white py-1 px-3 rounded-md',
}

const iconButton = {
  trash: TrashIcon,
  plus: PlusIcon,
  edit: EditIcon,
}

type Variant = keyof typeof configButton
type Icon = keyof typeof iconButton

interface Props {
  label: string
  variant: Variant
  type?: 'button' | 'submit' | 'reset'
  icon?: Icon
  className?: string
  disabled?: boolean
  onClick: () => void
}

export const Button = ({
  label,
  onClick,
  variant,
  type,
  icon,
  disabled,
  className,
}: Props) => {
  const buttonClass = configButton[variant] || configButton.primary

  const existIcon = icon !== undefined ? iconButton[icon] : null

  const Icon = existIcon

  return (
    <button
      className={clsx(
        className,
        buttonClass,
        'transition-all hover:bg-sky-950 hover:shadow-md flex items-center justify-center disabled:opacity-50',
      )}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="mr-1" />}
      {label}
    </button>
  )
}
