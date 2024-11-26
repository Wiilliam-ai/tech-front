import { useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../stores/auth/useAuthStore'
import { useLocation } from 'wouter'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logoutAuth = useAuthStore((state) => state.logoutAuth)

  const [, navigate] = useLocation()

  const logoutUser = () => {
    logoutAuth()
    queryClient.clear()
    navigate('~/login')
  }

  return { logoutUser }
}
