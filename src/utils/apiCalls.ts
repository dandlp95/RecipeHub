import { createGroupApiService, createRecipeApiService, createAuthApiService, createMeasurementUnitsApiService, createCategoriesApiService } from './utilities'
import { PathParams, Group, LoginData, UserCreateDTO } from '../customTypes/DTOs/requestTypes'
import { ApiData, UserDTO } from '../customTypes/DTOs/responseTypes'
import { MeasurementUnit, Recipe } from '../customTypes/DTOs/recipeTypes'
import { Category } from '../customTypes/DTOs/categoryTypes'

// ============================================================================
// RECIPE MANAGEMENT
// ============================================================================

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
  
  // If it's already ApiData, return it
  return response
}

// ============================================================================
// GROUP MANAGEMENT
// ============================================================================

export const getGroups = async (): Promise<ApiData<Group[]> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.getGroups(`groups`, {})
}

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

// ============================================================================
// AUTHENTICATION & USER MANAGEMENT
// ============================================================================

export const login = async (credentials: LoginData): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.auth('users/auth', {}, credentials)
}

export const register = async (userData: UserCreateDTO): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.postUser('users', {}, userData)
}

// ============================================================================
// Measurement Units & Categories
// ============================================================================

export const getMeasurementUnits = async (): Promise<ApiData<MeasurementUnit[]> | ApiData<null>> => {
  const measurementUnitsApiService = createMeasurementUnitsApiService();
  return await measurementUnitsApiService.getMeasurementUnits();
}

export const getCategories = async (): Promise<ApiData<Category[]> | ApiData<null>> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.getCategories('categories')
}

export const getCategoriesByRecipeId = async (recipeId: number): Promise<ApiData<Category[]> | ApiData<null>> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.getCategoriesByRecipeId('categories', { recipeId })
}

export const deleteCategoryById = async (categoryId: number): Promise<ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.deleteCategoryById('categories/{categoryId}', { categoryId })
}

export const deleteCategoryByRecipeId = async (recipeId: number): Promise<ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.deleteCategoryByRecipeId('recipes/{recipeId}/categories', { recipeId })
}

export const createCategory = async (category: Category): Promise<ApiData<Category> | ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.createCategory('categories', category)
}

export const updateCategory = async (categoryId: number, category: Category): Promise<ApiData<Category> | ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.updateCategory('categories/{categoryId}', { categoryId }, category)
}
