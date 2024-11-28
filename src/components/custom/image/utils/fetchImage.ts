import { useAuthStore } from '../../../../stores/auth/useAuthStore'

const fetchImage = async (img: string) => {
  try {
    const authStore = useAuthStore.getState()
    const token = authStore.user.token

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
  } catch (error) {
    const errorUsp = error as Error
    console.error(errorUsp.message)
    return 'https://via.placeholder.com/500'
  }
}

export default fetchImage
