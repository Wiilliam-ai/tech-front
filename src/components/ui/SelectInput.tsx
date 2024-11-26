import clsx from 'clsx'

interface Props {
  className?: string
  data: Array<Record<string | number, string>>
  name: string
  value?: string | number | readonly string[] | undefined
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SelectInput = (props: Props) => {
  const { className, name, value, onChange, data } = props
  return (
    <select
      className={clsx(
        'block border-2 rounded-lg px-2 py-1 focus:outline-sky-700 shadow-sm placeholder:opacity-50',
        className,
      )}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">Seleccionar</option>
      {data.map((item, index) => {
        const key = Object.keys(item)[0]
        return (
          <option key={index} value={item[key]}>
            {item[key]}
          </option>
        )
      })}
    </select>
  )
}
