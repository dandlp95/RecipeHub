import {
  createRecipeApiService,
  createMeasurementUnitsApiService,
  createTimeUnitApiService
} from '../createApiServiceUtilities'
import { PathParams } from '../../customTypes/DTOs/requestTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { MeasurementUnit, Recipe, TimeUnit } from '../../customTypes/DTOs/recipeTypes'

export const getMeasurementUnits = async (): Promise<
  ApiData<MeasurementUnit[]> | ApiData<null>
> => {
  const measurementUnitsApiService = createMeasurementUnitsApiService()
  return await measurementUnitsApiService.getMeasurementUnits()
}

export const getTimeUnits = async (): Promise<ApiData<TimeUnit[]> | ApiData<null>> => {
  const timeUnitsApiService = createTimeUnitApiService()
  return await timeUnitsApiService.getTimeUnits()
}

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

export const updateRecipe = async (
  recipeId: number,
  recipe: any
): Promise<ApiData<Recipe> | ApiData<null>> => {
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
