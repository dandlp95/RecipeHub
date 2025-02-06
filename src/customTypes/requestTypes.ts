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

export type UserCreateDTO = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInfo = {
  username: string;
  password: string;
};