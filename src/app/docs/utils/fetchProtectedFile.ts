import { useAuthStore } from '../../../stores/auth/useAuthStore'

const fetchProtectedFile = async (uri: string): Promise<string> => {
  const authStore = useAuthStore.getState()
  const token = authStore.user.token

  const response = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/pdf',
    },
  })

  if (!response.ok) {
    throw new Error('No se pudo cargar el archivo')
  }

  const blob = await response.blob()

  return URL.createObjectURL(blob)
}

export { fetchProtectedFile }
