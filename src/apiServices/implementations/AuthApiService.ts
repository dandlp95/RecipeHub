import { PathParams } from '../../customTypes/DTOs/requestTypes'
import { UserDTO, UserCreateDTO } from '../../customTypes/DTOs/userTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { LoginData } from '../../customTypes/DTOs/authTypes'
import IAuthApiService from '../interfaces/IAuthApiService'
import ApiService from './apiService'

class AuthApiService extends ApiService<UserDTO> implements IAuthApiService {
  constructor () {
    super()
  }
  public async auth (
    url: string,
    pathParams: PathParams,
    requestBody: LoginData
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }

  public async postUser (
    url: string,
    pathParams: PathParams,
    requestBody: UserCreateDTO
  ): Promise<ApiData<UserDTO> | ApiData<null>> {
    return super.post(url, pathParams, requestBody)
  }
}

export default new AuthApiService()
