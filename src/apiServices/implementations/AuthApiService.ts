import {
  UserCreateDTO,
  PathParams,
  LoginInfo
} from '../../customTypes/requestTypes'
import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import IAuthApiService from '../interfaces/iAuthApiService'
import ApiService from './apiService'

class AuthApiService extends ApiService<UserDTO> implements IAuthApiService {
  constructor () {
    super()
  }
  public auth (
    url: string,
    pathParams: PathParams,
    requestBody: LoginInfo
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  public postUser (
    url: string,
    pathParams: PathParams,
    requestBody: UserCreateDTO
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }
}

export default new AuthApiService()
