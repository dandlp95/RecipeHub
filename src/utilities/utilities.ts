import { PathParams } from "../customTypes/requestTypes";
import { GroupApiService } from "../apiServices/implementations/GroupApiService";
import { RecipeApiService } from "../apiServices/implementations/RecipeApiService";


export function createApiService<T>(serviceType: 'group' | 'recipe'): T {
    const token: string | null = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token found')
    }
    switch (serviceType) {
      case 'group':
        return new GroupApiService(token) as T
      case 'recipe':
        return new RecipeApiService(token) as T
      default:
        throw new Error('Invalid service type')
    }
  }


export function getEntities (userId: number, params:PathParams, url:string, createApiService: Function) {

}

