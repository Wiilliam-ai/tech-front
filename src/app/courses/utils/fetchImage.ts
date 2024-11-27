const fetchImage = async (img: string, token: string) => {
  const response = await fetch(img, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar la imagen')
  }

  // Convierte la respuesta en un Blob
  const blob = await response.blob()
  // Crea una URL para el Blob
  const imageUrl = URL.createObjectURL(blob)
  return imageUrl
}

export default fetchImage
