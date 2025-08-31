import { Category } from '../../customTypes/DTOs/categoryTypes'
import { PathParams } from '../../customTypes/DTOs/requestTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'

interface ICategoriesApiService {
    getCategories(url: string): Promise<ApiData<Category[]> | ApiData<null>>
    getCategoriesByRecipeId(url: string, pathParams: PathParams): Promise<ApiData<Category[]> | ApiData<null>>
    deleteCategoryById(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
    deleteCategoryByRecipeId(url: string, pathParams: PathParams): Promise<Response | ApiData<null>>
    createCategory(url: string, requestBody: Category): Promise<ApiData<Category> | ApiData<null>>
    updateCategory(url: string, pathParams: PathParams, requestBody: Category): Promise<ApiData<Category> | ApiData<null>>
}

export default ICategoriesApiService