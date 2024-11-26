import clsx from 'clsx'

interface Props {
  className?: string
  name: string
  value?: string | undefined
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const InputArea = (props: Props) => {
  const { placeholder, value, onChange, className, name } = props

  return (
    <textarea
      className={clsx(
        'border-2 rounded-lg px-2 py-1 focus:outline-sky-700 shadow-sm placeholder:opacity-50',
        className,
      )}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      rows={4}
    />
  )
}
