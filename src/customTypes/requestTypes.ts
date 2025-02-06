export interface LoginData {
  username: string
  password: string
}

export interface RegisterData extends LoginData {
  email: string
  passwordConfirm: string
}

export type PathParams = {
  userId?:number
}