import { MeasurementUnit } from '../../customTypes/DTOs/recipeTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'

interface IMeasurementUnitsApiService {
    getMeasurementUnits(): Promise<ApiData<MeasurementUnit[]> | ApiData<null>>
}

export default IMeasurementUnitsApiService
