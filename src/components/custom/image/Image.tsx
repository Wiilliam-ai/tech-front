import { useQuery } from '@tanstack/react-query'
import fetchImage from './utils/fetchImage'

interface Props {
  src: string
  alt: string
  className?: string
}

export const Image = ({ src, alt, className }: Props) => {
  const { data: imgSrc } = useQuery({
    queryKey: [src],
    queryFn: () => fetchImage(src),
    placeholderData: 'https://via.placeholder.com/500',
    staleTime: 1000 * 60 * 15,
  })

  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = 'https://via.placeholder.com/500'
      }}
    />
  )
}
