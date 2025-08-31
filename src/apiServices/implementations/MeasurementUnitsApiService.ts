import { MeasurementUnit } from '../../customTypes/DTOs/recipeTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import IMeasurementUnitsApiService from '../interfaces/IMeasurementUnitsApiService'
import ApiService from './apiService'

export class MeasurementUnitsApiService extends ApiService<MeasurementUnit> implements IMeasurementUnitsApiService {
    constructor (token: string) {
        super(token)
    }

    public async getMeasurementUnits(): Promise<ApiData<MeasurementUnit[]> | ApiData<null>> {
        return super.get('measurement-units', null)
    }
}