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

// This component is responsible for displaying the groups that the user has created.

/******************INDIVIDUAL GROUP ********************/
type Props1 = {
  group: Group
  passGroupName: (groupName: string | null) => void
  handleGroupDeletion: (groupId: number) => void
}

const IndividualGroup: React.FunctionComponent<Props1> = ({
  group,
  passGroupName,
  handleGroupDeletion
}) => {
  return (
    <div key={group.groupId}>
      <div className={groupContainerCSS.groupName}>
        <IconContext.Provider
          value={{ className: `${groupContainerCSS.deleteIcon}` }}
        >
          <ImBin2
            onClick={() =>
              group.groupId ? handleGroupDeletion(group.groupId) : ''
            }
          />
        </IconContext.Provider>
        <span onClick={() => passGroupName(group.name)}>{group.name}</span>
      </div>
      <p>{`${group.totalRecipes} recipes`}</p>
    </div>
  )
}

/**************MAING GROUP CONTAINER FUNCTION COMPONENT************/
type Props = {
  passGroupId: (groupId: number | null) => void
  passGroupName: (groupName: string | null) => void
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const newGroupRef = useRef<HTMLInputElement | null>(null)

  /*******************************************************
   *            HANDLE FETCHING GROUPS
   * *************************************************** */

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

  /*******************************************************
   *            HANDLE GROUP CREATION
   * *************************************************** */

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

  /*******************************************************
   *            HANDLE GROUP DELETIONS
   * *************************************************** */

  useEffect(() => {
    const defaultGroup = setDefaultGroup(groups)

    props.passGroupId(defaultGroup.id)
    props.passGroupName(defaultGroup.name)
  }, [groups])

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

    return response
  }

  const setDefaultGroup = (groups: Group[]) => {
    if (groups.length > 0) {
      return {
        name: groups[0].name ? groups[0].name : null,
        id: groups[0].groupId ? groups[0].groupId : 0
      }
    }
    return { name: null, id: null }
  }

  const handleGroupDeletion = (groupId: number) => {
    try {
      deleteGroup(groupId)
      setGroups(prevgroups =>
        prevgroups.filter(group => group.groupId !== groupId)
      )
    } catch (err) {
      console.error(err)
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
                      group.groupId ? handleGroupDeletion(group.groupId) : ''
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
