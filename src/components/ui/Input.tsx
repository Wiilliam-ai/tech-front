import clsx from 'clsx'

type InputType = 'text' | 'number' | 'password' | 'email' | 'tel'

interface Props {
  className?: string
  name: string
  type?: InputType
  value?: string | number | readonly string[] | undefined
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = (props: Props) => {
  const { type, placeholder, value, onChange, className, name } = props

  return (
    <input
      className={clsx(
        'block border-2 rounded-lg text-sm px-2 py-1 focus:outline-sky-700 shadow-sm placeholder:opacity-50',
        className,
      )}
      type={type || 'text'}
      value={value}
      id={name}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}
