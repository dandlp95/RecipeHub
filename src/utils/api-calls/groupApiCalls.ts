import { createGroupApiService } from '../createApiServiceUtilities'
import { Group } from '../../customTypes/DTOs/groupTypes'
import { ApiData } from '../../customTypes/DTOs/responseTypes'

export const getGroups = async (): Promise<ApiData<Group[]> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.getGroups(`groups`, {})
}

export const createGroup = async (group: Group): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.createGroup('groups', {}, group)
}

export const updateGroup = async (
  groupId: number,
  group: Group
): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.updateGroup('groups/{groupId}', { groupId }, group)
}

export const deleteGroup = async (groupId: number): Promise<ApiData<null>> => {
  const groupApiService = createGroupApiService()
  const response = await groupApiService.deleteGroup('groups/{groupId}', { groupId })

  // Handle the case where delete returns Response instead of ApiData
  if (response instanceof Response) {
    return {
      statusCode: response.status,
      isSuccess: response.ok,
      errors: response.ok ? null : ['Request failed'],
      result: null,
      token: null
    }
  }

  // If it's already ApiData, return it
  return response
}

export const getGroup = async (groupId: number): Promise<ApiData<Group> | ApiData<null>> => {
  const groupApiService = createGroupApiService()
  return await groupApiService.getGroup('groups/{groupId}', { groupId })
}
