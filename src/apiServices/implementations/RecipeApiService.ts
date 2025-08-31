import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { Recipe } from '../../customTypes/DTOs/recipeTypes'
import { PathParams } from '../../customTypes/DTOs/requestTypes'
import IRecipeApiService from '../interfaces/IRecipeApiService'
import ApiService from './apiService'

export class RecipeApiService extends ApiService<Recipe> implements IRecipeApiService {
  constructor (token: string) {
    super(token)
  }

  public async getRecipes (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Recipe[]> | ApiData<null>> {
    return super.get(url, pathParams)
  }

  public async getRecipe (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Recipe> | ApiData<null>> {
    return super.getSingle(url, pathParams)
  }

  public async createRecipe (
    url: string,
    pathParams: PathParams,
    requestBody: Recipe
  ): Promise<ApiData<Recipe> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  public async updateRecipe (
    url: string,
    pathParams: PathParams,
    requestBody: Recipe
  ): Promise<ApiData<Recipe> | ApiData<null>> {
    return super.put(url, pathParams, requestBody)
  }

  public async deleteRecipe (
    url: string,
    pathParams: PathParams
  ): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}

// export function createRecipeApiService (): RecipeApiService {
//   const token: string | null = localStorage.getItem('token')
//   if (token) {
//     return new RecipeApiService(token)
//   } else {
//     throw new Error('No token found')
//   }
// }