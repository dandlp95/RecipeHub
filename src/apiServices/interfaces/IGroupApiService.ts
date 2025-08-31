import { Group, PathParams } from "../../customTypes/DTOs/requestTypes";
import { ApiData } from "../../customTypes/DTOs/responseTypes";

interface IGroupApiService {
    getGroups(
        url: string,
        pathParams: PathParams
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
}

export default IGroupApiService;