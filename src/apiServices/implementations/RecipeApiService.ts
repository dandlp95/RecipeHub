import { Group, LoginData, PathParams } from '../../customTypes/requestTypes'
import { ApiData } from '../../customTypes/responseTypes'
import IRecipeApiService from '../interfaces/IRecipeApiService'
import ApiService from './apiService'
import { ErrorHandling } from '../../customTypes/errorHandling'

class RecipeApiService extends ApiService<Group> implements IRecipeApiService {
  constructor () {
    super()
  }

  public async getGroups (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Group[]> | ApiData<null> | ErrorHandling> {
    try {
      return super.get(url, pathParams)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error fetching groups',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error fetching groups:', error)
      return errorHandling
    }
  }

  public async getGroup (
    url: string,
    pathParams: PathParams
  ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling> {
    try {
      return super.getSingle(url, pathParams)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error fetching group',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error fetching group:', error)
      return errorHandling
    }
  }
}

export default RecipeApiService
