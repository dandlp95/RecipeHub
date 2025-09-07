export interface LoginData {
    userName: string
    password: string
  }
  
  export interface RegisterData extends LoginData {
    emailAddress: string
    confirmPassword: string
  }