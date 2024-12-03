import { useAuthStore } from '../../../stores/auth/useAuthStore'

const fetchProtectedFile = async (uri: string) => {
  const authStore = useAuthStore.getState()
  const token = authStore.dataAuth.token

  try {
    const response = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo')
    }

    const blob = await response.blob()
    const type = blob.type

    return {
      url: URL.createObjectURL(blob),
      type: type,
    }
  } catch (error) {
    console.error('Error fetching protected file:', error)
    throw error // Permite que React Query gestione el error
  }
}

export { fetchProtectedFile }
