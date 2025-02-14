import React, { useEffect, useState } from 'react'
import groupContainerCSS from './styles/groupsContainer.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { createRecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { ApiData } from '../customTypes/responseTypes'
import { Group } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ErrorHandling } from '../customTypes/errorHandling'

type Props = {}

const getGroups = async (userId: number) => {
  try {
    const apiService = createRecipeApiService()
    const groups = await apiService.getGroups('group', { userId: userId })
    return groups
  } catch (error) {
    console.error('Error fetching groups:', error)
  }
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<ApiData<Group[]> | null>()

  useEffect(() => {
    try {
      const userId = Number(localStorage.getItem('userId'))
      if (isNaN(userId)) {
        throw new Error('User ID is not a number')
      }
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
        {/* Test data, this will be dynamically rendered based on API call data */}
        <div>
          <p>Weekly Dinner</p>
          <p>8 Recipes</p>
        </div>
        <div>
          <p>Weekly Dinner</p>
          <p>8 Recipes</p>
        </div>
        <div>
          <p>Weekly Dinner</p>
          <p>8 Recipes</p>
        </div>
      </div>
    </section>
  )
}

export default GroupContainer
