import { StateAuthStore } from '../stores/auth/useAuthStore'

export const addToWindow = <T>(instance: T, propertyName: string) => {
  if (!StateAuthStore.auth && !StateAuthStore.user) return
  const roles = StateAuthStore.user?.role
  if (!roles) return
  if (!roles.doDevelop) return
  const testing = localStorage.getItem('testing') === 'true'
  if (!testing) return
  ;(window as unknown as Record<string, T>)[propertyName] = instance
}
