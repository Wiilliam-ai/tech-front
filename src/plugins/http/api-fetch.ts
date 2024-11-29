import { toast } from 'react-toastify'
import { HttpAdapter, IResponse } from './http-adapter'
import { API_URL_BACK } from '../../utils/contants'

export class CustomError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class ApiFetch implements HttpAdapter {
  private static API_URL = API_URL_BACK + '/api'
  private maxToastError = 4
  private countToastError = 0
  private statusError: number = 0

  private readonly token: string

  constructor({ token }: { token?: string }) {
    this.token = token || ''
  }

  private async request<T>(
    url: string,
    options: RequestInit,
  ): Promise<IResponse<T>> {
    let resultData: IResponse<T>
    try {
      const response = await fetch(`${ApiFetch.API_URL}${url}`, options)
      const result: IResponse<T> = await response.json()

      if (!response.ok) {
        const existResult = result !== undefined
        if (existResult) {
          this.statusError = response.status
          throw new CustomError(result.message)
        }
      }

      // Reiniciar contador de errores si la petición es exitosa
      this.countToastError = 0
      resultData = result
    } catch (error) {
      this.handleError(error)

      throw error
    }

    return resultData
  }

  private handleError(error: unknown): void {
    if (error instanceof CustomError) {
      console.log(
        `Implementar los toast de error para el status ${this.statusError}`,
      )
    }

    this.countToastError++
    if (this.countToastError === this.maxToastError) {
      toast.error('Error de conexión')
      this.countToastError = 0
    }
  }

  async get<T>(url: string): Promise<IResponse<T>> {
    return this.request<T>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    })
  }

  async post<T>(
    url: string,
    body?: Record<string, unknown>,
  ): Promise<IResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: JSON.stringify(body),
    })
  }

  async delete<T>(url: string): Promise<IResponse<T>> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    })
  }

  async patch<T>(
    url: string,
    body?: Record<string, unknown>,
  ): Promise<IResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: JSON.stringify(body),
    })
  }

  async postMedia<T>(url: string, data: FormData) {
    try {
      const response = await fetch(`${ApiFetch.API_URL}${url}`, {
        method: 'POST',
        headers: {
          ...(this.token && { Authorization: `Bearer ${this.token}` }),
        },
        body: data,
      })

      const result: IResponse<T> = await response.json()

      if (!response.ok) {
        const existResult = result !== undefined
        if (existResult) {
          this.statusError = response.status
          throw new CustomError(result.message)
        }
      }

      return result
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }
}
