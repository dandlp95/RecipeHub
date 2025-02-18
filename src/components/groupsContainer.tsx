import React, { useEffect, useState, useRef } from 'react'
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
  setState: (groups: Group[]) => void
) => {
  const apiService = createRecipeApiService()
  const fetchedGroups = await apiService.getGroups(`users/${userId}/groups`, {
    userId: userId
  })
  console.log(fetchedGroups)
  setState(fetchedGroups?.result ? fetchedGroups.result : [])
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<Group[]>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const newGroupRef = useRef<HTMLInputElement | null>(null)

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
        {groups &&
          groups.map(group => (
            <div key={group.groupId}>
              <p>{group.name}</p>
              <p>{`${group.totalRecipes} recipes`}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default GroupContainer
