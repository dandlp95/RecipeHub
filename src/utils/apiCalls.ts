import { createGroupApiService, createRecipeApiService, createAuthApiService } from './utilities'
import { PathParams, Group, LoginData, UserCreateDTO } from '../customTypes/requestTypes'
import { ApiData, UserDTO, Recipe } from '../customTypes/responseTypes'

export const getRecipes = async (groupId?: number) => {
  const recipeApiService = createRecipeApiService()
  const pathParams: PathParams = {
    groupId
  }
  return await recipeApiService.getRecipes('recipes', pathParams)
}

export const getGroups = async (): Promise<ApiData<Group[]> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.getGroups(`groups`, {})
}

// Group Management Methods
export const createGroup = async (group: Group): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.createGroup('groups', { }, group)
}

export const updateGroup = async (groupId: number, group: Group): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.updateGroup('groups/{groupId}', { groupId }, group)
}

export const deleteGroup = async (groupId: number): Promise<ApiData<null>> => {
  const groupApiService = createGroupApiService()
  const response = await groupApiService.deleteGroup('groups/{groupId}', { groupId })
  
  // Handle the case where delete returns Response instead of ApiData
  if (response instanceof Response) {
    return {
      statusCode: response.status,
      isSuccess: response.ok,
      errors: response.ok ? null : ['Request failed'],
      result: null,
      token: null
    }
  }
  
  // If it's already ApiData, return it
  return response
}

export const getGroup = async (groupId: number): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.getGroup('groups/{groupId}', { groupId })
}

// Recipe Management Methods
export const getRecipe = async (recipeId: number): Promise<ApiData<Recipe> | ApiData<null>> => {
  const recipeApiService = createRecipeApiService()
  return await recipeApiService.getRecipe('recipes/{recipeId}', { recipeId })
}

export const createRecipe = async (recipe: any): Promise<ApiData<Recipe> | ApiData<null>> => {
  const recipeApiService = createRecipeApiService()
  return await recipeApiService.createRecipe('recipes', {}, recipe)
}

export const updateRecipe = async (recipeId: number, recipe: any): Promise<ApiData<Recipe> | ApiData<null>> => {
  const recipeApiService = createRecipeApiService()
  return await recipeApiService.updateRecipe('recipes/{recipeId}', { recipeId }, recipe)
}

export const deleteRecipe = async (recipeId: number): Promise<ApiData<null>> => {
  const recipeApiService = createRecipeApiService()
  const response = await recipeApiService.deleteRecipe('recipes/{recipeId}', { recipeId })
  
  // Handle the case where delete returns Response instead of ApiData
  if (response instanceof Response) {
    return {
      statusCode: response.status,
      isSuccess: response.ok,
      errors: response.ok ? null : ['Request failed'],
      result: null,
      token: null
    }
  }
  
  // If it's already ApiData, return it
  return response
}

// Authentication Methods
export const login = async (credentials: LoginData): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.auth('users/auth', {}, credentials)
}

export const register = async (userData: UserCreateDTO): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.postUser('users', {}, userData)
}

