import { ErrorHandling } from "../../customTypes/errorHandling";
import { Group, LoginData, PathParams } from "../../customTypes/requestTypes";
import { ApiData } from "../../customTypes/responseTypes";

interface IRecipeApiService {
    getGroups(
        url: string,
        pathParams: PathParams,
        requestBody: LoginData        
    ) : Promise<ApiData<Group[]> | ApiData<null> | ErrorHandling>;
}

export default IRecipeApiService