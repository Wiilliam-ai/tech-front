import { useState } from 'react'

interface Props {
  checked?: boolean
  interactive?: boolean
  onChange: (checked: boolean) => void
}

export const Toggle = ({
  checked = false,
  interactive = true,
  onChange,
}: Props) => {
  const [state, setState] = useState({
    active: false,
  })

  const { active } = state

  const checkedValue = interactive ? active : checked

  const onToggle = () => {
    setState({
      active: !state.active,
    })
  }

  return (
    <label className="flex items-center justify-center relative w-14 h-8 bg-white shadow-md border rounded-full overflow-hidden p-1">
      <input
        type="checkbox"
        checked={checkedValue}
        onChange={(e) => {
          if (!interactive) return
          onToggle()
          onChange(e.target.checked)
        }}
        className="sr-only"
      />
      <span
        className={`
          bg-stone-400 w-full h-full rounded-full flex items-center relative
        `}
      >
        <span
          className={`
          
            size-6 block bg-sky-400 rounded-full
            transition-transform duration-300 ease-in-out
            ${checkedValue ? 'transform translate-x-full' : ''}
          `}
        ></span>
      </span>
    </label>
  )
}
