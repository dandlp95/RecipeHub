import { PathParams } from "../../customTypes/DTOs/requestTypes";
import { UserCreateDTO } from "../../customTypes/DTOs/userTypes";
import { LoginData } from "../../customTypes/DTOs/authTypes";
import { UserDTO } from "../../customTypes/DTOs/userTypes";
import { ApiData } from "../../customTypes/DTOs/responseTypes";


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