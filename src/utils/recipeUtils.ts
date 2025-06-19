import { createApiService } from './utilities'
import { RecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { PathParams } from '../customTypes/requestTypes'
import { serviceTypes } from '../customTypes/enumTypes'

export const getRecipes = async (userId: number, groupId?: number) => {
  const recipeApiService = createApiService<RecipeApiService>(serviceTypes.recipe)
  const pathParams: PathParams = {
    userId,
    groupId
  }
  return await recipeApiService.getRecipes('recipes', pathParams)
}
