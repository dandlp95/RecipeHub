import { GroupApiService } from "../apiServices/implementations/GroupApiService";
import { RecipeApiService } from "../apiServices/implementations/RecipeApiService";
import AuthApiService from "../apiServices/implementations/AuthApiService";
import IGroupApiService from "../apiServices/interfaces/IGroupApiService";
import IRecipeApiService from "../apiServices/interfaces/IRecipeApiService";
import IAuthApiService from "../apiServices/interfaces/IAuthApiService";

// Type-safe service creation functions
export function createGroupApiService(): IGroupApiService {
    const token: string | null = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }
    return new GroupApiService(token)
}

export function createRecipeApiService(): IRecipeApiService {
    const token: string | null = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }
    return new RecipeApiService(token)
}

export function createAuthApiService(): IAuthApiService {
    return AuthApiService
}

