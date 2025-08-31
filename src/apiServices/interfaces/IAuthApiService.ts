import { ErrorHandling } from "../../customTypes/errorHandling";
import { UserCreateDTO, PathParams, LoginData } from "../../customTypes/DTOs/requestTypes";
import { UserDTO, ApiData } from "../../customTypes/DTOs/responseTypes";


interface IAuthApiService{
    auth(
        url: string,
        pathParams: PathParams,
        requestBody: LoginData
      ): Promise<ApiData<UserDTO> | ApiData<null>>
    
      postUser(
        url: string,
        pathParams: PathParams,
        requestBody: UserCreateDTO
      ): Promise<ApiData<UserDTO> | ApiData<null>>
}

export default IAuthApiService