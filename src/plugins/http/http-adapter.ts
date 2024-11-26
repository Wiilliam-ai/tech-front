export interface IResponse<T> {
  message: string
  data?: T
}
export interface HttpAdapter {
  get: <T>(url: string) => Promise<IResponse<T>>
  post: <T>(
    url: string,
    body?: Record<string, unknown>,
  ) => Promise<IResponse<T>>
  patch: <T>(
    url: string,
    body?: Record<string, unknown>,
  ) => Promise<IResponse<T>>
  delete: <T>(url: string) => Promise<IResponse<T>>
}
