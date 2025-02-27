import { ErrorHandling } from "../../customTypes/errorHandling";
import { UserCreateDTO, PathParams, LoginData } from "../../customTypes/requestTypes";
import { UserDTO, ApiData } from "../../customTypes/responseTypes";


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