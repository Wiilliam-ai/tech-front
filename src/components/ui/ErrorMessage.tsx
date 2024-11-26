interface Props {
  message: string
}

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null

  return (
    <div className="bg-red-500 rounded-md px-2 py-1 font-bold text-sm text-white">
      {message}
    </div>
  )
}
