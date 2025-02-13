import {
  UserCreateDTO,
  PathParams,
  LoginData
} from '../../customTypes/requestTypes'
import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import IAuthApiService from '../interfaces/IAuthApiService'
import ApiService from './apiService'
import { ErrorHandling } from '../../customTypes/errorHandling'

class AuthApiService extends ApiService<UserDTO> implements IAuthApiService {
  constructor () {
    super()
  }
  public async auth (
    url: string,
    pathParams: PathParams,
    requestBody: LoginData
  ): Promise<ApiData<UserDTO> | ApiData<null> | ErrorHandling> {
    try {
      return super.post(url, pathParams, requestBody)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error during authentication',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error during authentication:', error)
      return errorHandling
    }
  }

  public async postUser (
    url: string,
    pathParams: PathParams,
    requestBody: UserCreateDTO
  ): Promise<ApiData<UserDTO> | ApiData<null> | ErrorHandling> {
    try {
      return super.post(url, pathParams, requestBody)
    } catch (error) {
      const errorHandling: ErrorHandling = {
        message: 'Error creating user',
        code: 500,
        timestamp: new Date(),
        error: error
      }
      console.error('Error creating user:', error)
      return errorHandling
    }
  }
}

export default new AuthApiService()
