export interface LoginData {
  userName: string
  password: string
}

export interface RegisterData extends LoginData {
  emailAddress: string
  confirmPassword: string
}

export type PathParams = {
  userId?: number
  groupId?: number
  recipeId?: number
}

export type UserCreateDTO = {
  userName: string
  emailAddress: string
  password: string
  confirmPassword: string
}

export type Group = {
  groupId?: number
  name: string
  createdOn: Date
  totalRecipes: number
}
