import { createAuthApiService } from '../createApiServiceUtilities'
import { LoginData } from '../../customTypes/DTOs/authTypes'
import { UserCreateDTO } from '../../customTypes/DTOs/userTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { UserDTO } from '../../customTypes/DTOs/userTypes'

export const login = async (credentials: LoginData): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.auth('users/auth', {}, credentials)
}

export const register = async (
  userData: UserCreateDTO
): Promise<ApiData<UserDTO> | ApiData<null>> => {
  const authApiService = createAuthApiService()
  return await authApiService.postUser('users', {}, userData)
}
