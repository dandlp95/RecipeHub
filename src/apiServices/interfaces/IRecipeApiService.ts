import { Group, LoginData, PathParams } from "../../customTypes/requestTypes";
import { ApiData } from "../../customTypes/responseTypes";

interface IRecipeApiService {
    getGroups(
        url: string,
        pathParams: PathParams,
        requestBody: LoginData        
    ) : Promise<ApiData<Group[]> | ApiData<null>>;

    getGroup(
        url: string,
        pathParams: PathParams
    ): Promise<ApiData<Group> | ApiData<null>>;

    createGroup(
        url: string,
        pathParams: PathParams,
        requestBody: Group
    ): Promise<ApiData<Group> | ApiData<null>>;

    updateGroup(
        url: string,
        pathParams: PathParams,
        requestBody: Group
    ): Promise<ApiData<Group> | ApiData<null>>;

    deleteGroup(
        url: string,
        pathParams: PathParams
    ): Promise<Response | ApiData<null>>;

    // getRecipes(
    //     url: string,
    //     pathParams: PathParams
    // ): Promise<ApiData<null> | ApiData<null>>;
}

export default IRecipeApiService;