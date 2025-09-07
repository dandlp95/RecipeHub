export type UserDTO = {
    userId: number
    userName: string
    emailAddress: string
    createdDate: string
  }
  

  export type UserCreateDTO = {
    userName: string
    emailAddress: string
    password: string
    confirmPassword: string
  }