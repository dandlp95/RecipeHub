import { ApiData } from '../../customTypes/DTOs/responseTypes'
import { TimeUnit } from '../../customTypes/DTOs/recipeTypes'

interface ITimeUnitApiService {
  getTimeUnits(): Promise<ApiData<TimeUnit[]> | ApiData<null>>
}

export default ITimeUnitApiService
