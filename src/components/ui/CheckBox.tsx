import { useState } from 'react'

interface Props {
  value: boolean
  label?: string
  hidden?: boolean
  onSelected: (value: boolean) => void
}

export const CheckBox = (props: Props) => {
  const [value, setValue] = useState(props.value)
  const [onFocus, setOnFocus] = useState(false)

  return (
    <div className="flex items-center gap-3">
      {props.label && (
        <label
          className={`
          block text-sky-700 font-semibold
          ${props.hidden ? 'hidden' : ''}`}
        >
          {props.label}
        </label>
      )}
      <div
        className={`size-7 block border-2 border-sky-700 shadow-sm rounded-full relative overflow-hidden
        ${onFocus ? 'border-black' : ''}
          `}
        onClick={() => {
          setValue(!value)
          props.onSelected(!value)
        }}
      >
        <span
          className={`
          absolute top-0 left-0 w-full h-full ${value ? 'bg-sky-700' : 'bg-gray-200'}
        `}
        ></span>

        <input
          type="checkbox"
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onKeyDown={(e) => {
            const typeEvent = e.nativeEvent.code

            if (typeEvent === 'Enter') {
              setValue(!value)
              props.onSelected(!value)
            }
          }}
        />
      </div>
    </div>
  )
}
