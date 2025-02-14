import { Group, LoginData, PathParams } from '../../customTypes/requestTypes'
import { ApiData } from '../../customTypes/responseTypes'
import IRecipeApiService from '../interfaces/IRecipeApiService'
import ApiService from './apiService'
import { ErrorHandling } from '../../customTypes/errorHandling'

class RecipeApiService extends ApiService<Group> implements IRecipeApiService {
  constructor (token: string) {
    super(token)
  }

  public async getGroups (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Group[]> | ApiData<null>> {
    return super.get(url, pathParams)
  }

  public async getGroup (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Group> | ApiData<null>> {
    return super.getSingle(url, pathParams)
  }

  public async createGroup (
    url: string,
    pathParams: PathParams,
    requestBody: Group
  ): Promise<ApiData<Group> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  public async updateGroup (
    url: string,
    pathParams: PathParams,
    requestBody: Group
  ): Promise<ApiData<Group> | ApiData<null>> {
    return super.put(url, pathParams, requestBody)
  }

  public async deleteGroup (
    url: string,
    pathParams: PathParams
  ): Promise<Response | ApiData<null>> {
    return super.delete(url, pathParams)
  }
}

// export default RecipeApiService
export function createRecipeApiService (): RecipeApiService {
  const token: string | null = localStorage.getItem('token')
  if (token) {
    return new RecipeApiService(token)
  } else {
    throw new Error('No token found')
  }
}
