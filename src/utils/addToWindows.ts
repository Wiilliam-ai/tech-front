export const addToWindow = <T>(instance: T, propertyName: string) => {
  const testing = localStorage.getItem('testing') === 'true'
  if (!testing) return
  ;(window as unknown as Record<string, T>)[propertyName] = instance
}
