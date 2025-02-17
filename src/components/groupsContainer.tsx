import React, { useEffect, useState } from 'react'
import groupContainerCSS from './styles/groupsContainer.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { createRecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { ApiData } from '../customTypes/responseTypes'
import { Group } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ErrorHandling } from '../customTypes/errorHandling'

type Props = {
  passGroupId: (groupId: number | null) => void
}

const getGroups = async (
  userId: number,
  setState: (groups: ApiData<Group[] | null>) => void
) => {
  const apiService = createRecipeApiService()
  const fetchedGroups = await apiService.getGroups(`users/${userId}/groups`, {
    userId: userId
  })
  setState(fetchedGroups)
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<ApiData<Group[] | null>>()

  useEffect(() => {
    try {
      const userId = Number(localStorage.getItem('userId'))
      const token = localStorage.getItem('token')
      if (isNaN(userId)) {
        throw new Error('User ID is not a number')
      }
      if (!token) {
        throw new Error('Token not found')
      }
      getGroups(userId, setGroups)
    } catch (err) {
      const errorHandling: ErrorHandling = {
        message: 'Error while fetching groups for user.',
        timestamp: new Date(),
        error: err
      }
      console.error(errorHandling)
    }
  }, [])

  return (
    <section className={groupContainerCSS.groupContainerMain}>
      <div className={groupContainerCSS.top}>
        <h3>Recipe Groups</h3>
        <IconContext.Provider
          value={{
            className: `${groupContainerCSS.plusSymbol} ${groupContainerCSS.expanded}`
          }}
        >
          <AiOutlinePlus />
        </IconContext.Provider>
      </div>
      <div className={groupContainerCSS.groups}>
        {groups?.result &&
          groups.result.map((group, index) => (
            <div key={index}>
              <p>{group.Name}</p>
              <p>{group.TotalRecipes}</p>  
            </div>
          ))}
      </div>
    </section>
  )
}

export default GroupContainer
