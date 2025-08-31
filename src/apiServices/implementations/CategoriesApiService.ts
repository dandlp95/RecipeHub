import { Category } from '../../customTypes/DTOs/categoryTypes'
import { PathParams } from '../../customTypes/DTOs/requestTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'
import ApiService from './apiService'
import ICategoriesApiService from '../interfaces/ICategoriesApiService'

export class CategoriesApiService extends ApiService<Category> implements ICategoriesApiService {
    constructor (token: string) {
        super(token)
    }
    getCategories(url: string): Promise<ApiData<Category[]> | ApiData<null>> {
        return super.get(url, null)
    }
    getCategoriesByRecipeId(url: string, pathParams: PathParams): Promise<ApiData<Category[]> | ApiData<null>> {
        return super.get(url, pathParams)
    }
    deleteCategoryById(url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
        return super.delete(url, pathParams)
    }
    deleteCategoryByRecipeId(url: string, pathParams: PathParams): Promise<Response | ApiData<null>> {
        return super.delete(url, pathParams)
    }
    createCategory(url: string, requestBody: Category): Promise<ApiData<Category> | ApiData<null>> {
        return super.post(url, null, requestBody)
    }
    updateCategory(url: string, pathParams: PathParams, requestBody: Category): Promise<ApiData<Category> | ApiData<null>> {
        return super.put(url, pathParams, requestBody)
    }
}