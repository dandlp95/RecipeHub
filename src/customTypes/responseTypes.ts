export type ApiData<T> = {
  statusCode: number
  isSuccess: boolean
  errors: string[] | null
  result: T | null
  token: string | null
}

export type ApiResponse = {
  isSuccess: boolean
  statusCode: number
  data: string
}

export type UserDTO = {
  userId: number
  username: string
  emailAddress: string
  createdDate: string
}
