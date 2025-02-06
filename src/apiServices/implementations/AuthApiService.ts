import {
  UserCreateDTO,
  PathParams,
  LoginData
} from '../../customTypes/requestTypes'
import { UserDTO, ApiData } from '../../customTypes/responseTypes'
import IAuthApiService from '../interfaces/IAuthApiService'
import ApiService from './apiService'

class AuthApiService extends ApiService<UserDTO> implements IAuthApiService {
  constructor () {
    super()
  }
  public auth (
    url: string,
    pathParams: PathParams,
    requestBody: LoginData
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
