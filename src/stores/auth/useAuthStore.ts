import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IResponseAuth, IUser } from '../../interfaces/auth.interface'

export type AuthStore = {
  auth: boolean
  dataAuth: IResponseAuth
  loginAuth: (user: IResponseAuth) => void
  verifyAuth: (user: IUser) => void
  logoutAuth: () => void
  upldateAvatar: (avatar: string) => void
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
      dataAuth: IResponseAuthDefault,
      loginAuth: (user) => set({ auth: true, dataAuth: user }),
      logoutAuth: () => set({ auth: false, dataAuth: IResponseAuthDefault }),
      verifyAuth: (user) =>
        set((state) => ({
          dataAuth: {
            token: state.dataAuth.token,
            user: user,
          },
        })),
      upldateAvatar: (avatar) =>
        set((state) => ({
          dataAuth: {
            ...state.dataAuth,
            avatar: {
              ...state.dataAuth.user.avatar,
              url: avatar,
            },
          },
        })),
    }),
    { name: 'auth' },
  ),
)
