import React, { useEffect, useState, useRef } from 'react'
import groupContainerCSS from './styles/groupsContainer.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { createRecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { ApiData } from '../customTypes/responseTypes'
import { Group } from '../customTypes/requestTypes'
import { PathParams } from '../customTypes/requestTypes'
import { ErrorHandling } from '../customTypes/errorHandling'
import { ImBin2 } from 'react-icons/im'

type Props = {
  passGroupId: (groupId: number | null) => void
  passGroupName: (groupName: string) => void
}

const getGroups = async (
  userId: number,
  setState: (groups: Group[]) => void
) => {
  const apiService = createRecipeApiService()
  const fetchedGroups = await apiService.getGroups(`users/${userId}/groups`, {
    userId: userId
  })
  setState(fetchedGroups?.result ? fetchedGroups.result : [])
}

const setDefaultGroup = (groups: Group[]) => {
  if (groups.length > 0) {
    return {
      name: groups[0].name,
      id: groups[0].groupId ? groups[0].groupId : 0
    }
  }
  return null
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<Group[]>([])
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

  const addGroup = async () => {
    const userId = Number(localStorage.getItem('userId'))
    const token = localStorage.getItem('token')

    if (isNaN(userId)) {
      throw new Error('User ID is not a number')
    }
    if (!token) {
      throw new Error('Token not found')
    }

    const newGroup: Group = {
      name: 'New Group',
      totalRecipes: 0,
      createdOn: new Date()
    }

    const url = `users/${userId}/groups`
    const apiService = createRecipeApiService()
    const data = await apiService.createGroup(url, { userId: userId }, newGroup)

    if (data.result) {
      setGroups([...groups, data.result])
    }
  }

  const deleteGroup = async (groupId: number) => {
    const userId = Number(localStorage.getItem('userId'))
    const token = localStorage.getItem('token')

    if (isNaN(userId)) {
      throw new Error('User ID is not a number')
    }
    if (!token) {
      throw new Error('Token not found')
    }

    const url = `users/${userId}/groups/${groupId}`

    const apiService = createRecipeApiService()
    const response = await apiService.deleteGroup(url, {
      userId: userId,
      groupId: groupId
    })

    if (response) {
      setGroups(groups.filter(group => group.groupId !== groupId))
    }

    const defaultGroup = setDefaultGroup(groups)
    console.log(defaultGroup)
    if (defaultGroup) {
      props.passGroupId(defaultGroup.id)
      props.passGroupName(defaultGroup.name)
    }
  }

  return (
    <section className={groupContainerCSS.groupContainerMain}>
      <div className={groupContainerCSS.top}>
        <h3>Recipe Groups</h3>
        <IconContext.Provider
          value={{
            className: `${groupContainerCSS.plusSymbol} ${groupContainerCSS.expanded}`
          }}
        >
          <AiOutlinePlus onClick={addGroup} />
        </IconContext.Provider>
      </div>
      <div className={groupContainerCSS.groups}>
        {groups &&
          groups.map(group => (
            <div key={group.groupId}>
              <div className={groupContainerCSS.groupName}>
                <IconContext.Provider
                  value={{ className: `${groupContainerCSS.deleteIcon}` }}
                >
                  <ImBin2
                    onClick={() =>
                      group.groupId ? deleteGroup(group.groupId) : ''
                    }
                  />
                </IconContext.Provider>
                <span onClick={() => props.passGroupName(group.name)}>
                  {group.name}
                </span>
              </div>
              <p>{`${group.totalRecipes} recipes`}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default GroupContainer
