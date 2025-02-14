import { ErrorHandling } from "../../customTypes/errorHandling";
import { Group, LoginData, PathParams } from "../../customTypes/requestTypes";
import { ApiData } from "../../customTypes/responseTypes";

interface IRecipeApiService {
    getGroups(
        url: string,
        pathParams: PathParams,
        requestBody: LoginData        
    ) : Promise<ApiData<Group[]> | ApiData<null> | ErrorHandling>;

    getGroup(
        url: string,
        pathParams: PathParams
    ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling>;

    createGroup(
        url: string,
        pathParams: PathParams,
        requestBody: Group
    ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling>;

    updateGroup(
        url: string,
        pathParams: PathParams,
        requestBody: Group
    ): Promise<ApiData<Group> | ApiData<null> | ErrorHandling>;

    deleteGroup(
        url: string,
        pathParams: PathParams
    ): Promise<Response | ApiData<null> | ErrorHandling>;
}

export default IRecipeApiService;