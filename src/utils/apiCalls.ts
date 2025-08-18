import { createGroupApiService, createRecipeApiService } from './utilities'
import { PathParams, Group } from '../customTypes/requestTypes'
import { ApiData } from '../customTypes/responseTypes'

export const getRecipes = async (userId: number, groupId?: number) => {
  const recipeApiService = createRecipeApiService()
  const pathParams: PathParams = {
    userId,
    groupId
  }
  return await recipeApiService.getRecipes('recipes', pathParams)
}

export const getGroups = async (): Promise<ApiData<Group[]> | ApiData<null>> => {
  const userId = Number(localStorage.getItem('userId'))
  if (isNaN(userId)) {
    throw new Error('User ID is not a number')
  }
  const groupApiService = createGroupApiService()
  const pathParams: PathParams = {
    userId
  }
  return await groupApiService.getGroups(`users/${userId}/groups`, pathParams)
}
