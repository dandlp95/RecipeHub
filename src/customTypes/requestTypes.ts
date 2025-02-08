export interface LoginData {
  userName: string
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
  userName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
};

