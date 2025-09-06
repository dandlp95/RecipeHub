import { createGroupApiService, createRecipeApiService, createAuthApiService, createMeasurementUnitsApiService, createCategoriesApiService } from '../utilities'
import { PathParams, Group, LoginData, UserCreateDTO } from '../../customTypes/DTOs/requestTypes'
import { ApiData, UserDTO } from '../../customTypes/DTOs/responseTypes'
import { MeasurementUnit, Recipe } from '../../customTypes/DTOs/recipeTypes'
import { Category } from '../../customTypes/DTOs/categoryTypes'

export const getRecipes = async (groupId?: number) => {
    const recipeApiService = createRecipeApiService()
    const pathParams: PathParams = {
      groupId
    }
    return await recipeApiService.getRecipes('recipes', pathParams)
  }
  
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
    return response
}