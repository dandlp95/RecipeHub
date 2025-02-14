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

  public async createGroup (
    url: string,
    pathParams: PathParams,
    requestBody: Group
  ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling> {
    try {
      return super.post(url, pathParams, requestBody)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error creating group',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error creating group:', error)
      return errorHandling
    }
  }

  public async updateGroup (
    url: string,
    pathParams: PathParams,
    requestBody: Group
  ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling> {
    try {
      return super.put(url, pathParams, requestBody)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error updating group',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error updating group:', error)
      return errorHandling
    }
  }

  public async deleteGroup (
    url: string,
    pathParams: PathParams
  ): Promise<Response | ApiData<null> | ErrorHandling> {
    try {
      return super.delete(url, pathParams)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error deleting group',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error deleting group:', error)
      return errorHandling
    }
  }
}

export default RecipeApiService
