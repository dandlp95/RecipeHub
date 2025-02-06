export interface LoginData {
  username: string
  password: string
}

export interface RegisterData extends LoginData {
  emailAddress: string
  confirmPassword: string
}

export type PathParams = {
  userId?:number
}

export type UserCreateDTO = {
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
};