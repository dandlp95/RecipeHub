import { TimeUnit } from "../../customTypes/DTOs/recipeTypes";
import { ApiData } from "../../customTypes/DTOs/responseTypes";
import ITimeUnitApiService from "../interfaces/ITimeUnitApiService";
import ApiService from "./apiService";

export class TimeUnitApiService extends ApiService<TimeUnit> implements ITimeUnitApiService {
    constructor (token: string) {
        super(token)
    }
    getTimeUnits(): Promise<ApiData<TimeUnit[]> | ApiData<null>> {
        return super.get('time-units', null)
    }
}