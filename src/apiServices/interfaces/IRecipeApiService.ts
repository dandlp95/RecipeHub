import { ApiData } from "../../customTypes/DTOs/responseTypes";
import { Recipe } from "../../customTypes/DTOs/recipeTypes";
import { PathParams } from "../../customTypes/DTOs/requestTypes";
interface IRecipeApiService {
    getRecipes(
        url: string,
        pathParams: PathParams
    ): Promise<ApiData<Recipe[]> | ApiData<null>>;

    getRecipe(
        url: string,
        pathParams: PathParams
    ): Promise<ApiData<Recipe> | ApiData<null>>;

    createRecipe(
        url: string,
        pathParams: PathParams,
        requestBody: Recipe
    ): Promise<ApiData<Recipe> | ApiData<null>>;

    updateRecipe(
        url: string,
        pathParams: PathParams,
        requestBody: Recipe
    ): Promise<ApiData<Recipe> | ApiData<null>>;

    deleteRecipe(
        url: string,
        pathParams: PathParams
    ): Promise<Response | ApiData<null>>;
}

export default IRecipeApiService;