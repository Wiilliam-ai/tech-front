import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IResponseAuth } from '../../interfaces/auth.interface'

export type AuthStore = {
  auth: boolean
  user: IResponseAuth
  loginAuth: (user: IResponseAuth) => void
  verifyAuth: (user: IResponseAuth) => void
  logoutAuth: () => void
}

const IResponseAuthDefault: IResponseAuth = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: {
      id: '',
      url: '',
    },
    role: {
      id: '',
      doProf: false,
      doInst: false,
      doAdmin: false,
    },
  },
  token: '',
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      auth: false,
      user: IResponseAuthDefault,
      loginAuth: (user) => set({ auth: true, user }),
      logoutAuth: () => set({ auth: false, user: IResponseAuthDefault }),
      verifyAuth: (user) => set({ auth: true, user }),
    }),
    { name: 'auth' },
  ),
)
