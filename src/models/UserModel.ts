import { toast } from 'react-toastify'
import { IResponseAuth, IUserWeb } from '../interfaces/auth.interface'
import { HttpAdapter } from '../plugins/http/http-adapter'
import { CustomError } from '../plugins/http/api-fetch'

export interface User {
  id: string
  name: string
  email: string
  password: string
}

export interface IUserRegister {
  email: string
  role: {
    doProf: boolean
    doInst: boolean
    doAdmin: boolean
  }
}

export class UserModel {
  constructor(private readonly http: HttpAdapter) {}

  async login(user: Omit<User, 'id' | 'name'>) {
    try {
      const result = await this.http.post<IResponseAuth>('/auth/login', {
        email: user.email,
        password: user.password,
      })
      return result
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }

  async recover(email: string) {
    try {
      const result = await this.http.post('/auth/recover', {
        email,
      })
      return result
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }

  async completeRecover(token: string, password: string) {
    try {
      const result = await this.http.post('/auth/complete-recover', {
        tokenVerif: token,
        password,
      })
      return result
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }

  async verifyAuth({ logout }: { logout: () => void }) {
    try {
      const result =
        await this.http.post<Omit<IResponseAuth, 'token'>>('/auth/verify')
      return result
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
      logout()
    }
  }

  async register(data: IUserRegister) {
    const result = await this.http.post('/users', {
      email: data.email,
      role: data.role,
    })
    return result.message
  }

  async forwardByEmail(email: string) {
    try {
      const result = await this.http.post('/users/forward-email', {
        email,
      })
      return result.message
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }

  async listUsers() {
    const result = await this.http.get<IUserWeb[]>('/users')
    // ordenar por no verificados
    const users = result.data?.sort((a, b) => {
      if (a.isVerified && !b.isVerified) {
        return 1
      }
      if (!a.isVerified && b.isVerified) {
        return -1
      }
      return 0
    })

    return users
  }

  async completeVerifyUser(
    firstName: string,
    lastName: string,
    password: string,
    tokenVerif: string,
  ) {
    try {
      const result = await this.http.post('/users/complete', {
        firstName,
        lastName,
        password,
        tokenVerif,
      })
      return result.message
    } catch (error) {
      if (error instanceof CustomError) {
        toast.error(error.message)
      }
    }
  }
}
