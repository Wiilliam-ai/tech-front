export interface IResponseAuth {
  user: IUser
  token: string
}

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: IAvatar
  role: IRole
}

export interface IAvatar {
  id: string
  url: string
}

export interface IRole {
  id: string
  doProf: boolean
  doInst: boolean
  doAdmin: boolean
}

export interface IUserWeb extends IUser {
  isVerified: boolean
}
