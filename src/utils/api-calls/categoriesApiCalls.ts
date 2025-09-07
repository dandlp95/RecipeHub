import { createCategoriesApiService } from '../createApiServiceUtilities'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { Category } from '../../customTypes/DTOs/categoryTypes'

export const getCategories = async (): Promise<ApiData<Category[]> | ApiData<null>> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.getCategories('categories')
}

export const getCategoriesByRecipeId = async (
  recipeId: number
): Promise<ApiData<Category[]> | ApiData<null>> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.getCategoriesByRecipeId('categories', { recipeId })
}

export const deleteCategoryById = async (categoryId: number): Promise<ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.deleteCategoryById('categories/{categoryId}', { categoryId })
}

export const deleteCategoryByRecipeId = async (
  recipeId: number
): Promise<ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.deleteCategoryByRecipeId('recipes/{recipeId}/categories', {
    recipeId
  })
}

export const createCategory = async (
  category: Category
): Promise<ApiData<Category> | ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.createCategory('categories', category)
}

export const updateCategory = async (
  categoryId: number,
  category: Category
): Promise<ApiData<Category> | ApiData<null> | Response> => {
  const categoriesApiService = createCategoriesApiService()
  return await categoriesApiService.updateCategory(
    'categories/{categoryId}',
    { categoryId },
    category
  )
}
