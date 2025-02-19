import React, { useEffect, useState, useRef, useCallback } from 'react'
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
  handleGroupDeletion: (groupId: number) => void
  onUpdate: (groupName: Group) => void
  passGroupName: (groupName: string | null) => void
}

const IndividualGroup: React.FunctionComponent<Props1> = ({
  group,
  handleGroupDeletion,
  onUpdate,
  passGroupName
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<Group>(group)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const saveUpdate = useCallback((): void => {
    // When losing focus, the group name is updated (if changed)
    onUpdate(groupData)
  }, [groupData, onUpdate])

  const finishEditHandler = () => {
    // Ends editing and saves the updated group name (if changed)
    setIsEditing(false)
    saveUpdate()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ends editing and saves the updated group name (if changed) when 'Enter' is pressed
    if (e.key === 'Enter') {
      finishEditHandler()
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  return (
    <div key={group.groupId} className={groupContainerCSS.singleGroup}>
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
        {isEditing ? (
          <input
            onChange={e => setGroupData({ ...groupData, name: e.target.value })}
            value={groupData.name ? groupData.name : ''}
            onBlur={() => finishEditHandler()}
            ref={inputRef}
            onKeyDown={e => handleKeyDown(e)}
            type='text'
          />
        ) : (
          <span
            onClick={() => passGroupName(groupData.name)}
            onDoubleClick={() => setIsEditing(true)}
          >
            {group.name}
          </span>
        )}
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

  /****************************************************************
   *                HANDLE GROUP UPDATES
   * ************************************************************** */

  const updateGroup = async (groupId: number, updatedGroup: Group) => {
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
    const response = await apiService.updateGroup(
      url,
      {
        userId: userId,
        groupId: groupId
      },
      updatedGroup
    )

    return response.result
  }

  const onUpdate = async (groupName: Group) => {
    // Updates entity group and passes updated group name to parent component.
    try {
      const updatedGroup = await updateGroup(
        groupName.groupId ? groupName.groupId : 0,
        groupName
      )
      if (updatedGroup?.groupId) {
        setGroups(prevgroups =>
          prevgroups.map(group =>
            group.groupId === groupName.groupId ? updatedGroup : group
          )
        )
        props.passGroupId(updatedGroup.groupId)
        props.passGroupName(updatedGroup.name)
      }
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
            <IndividualGroup
              key={group.groupId}
              group={group}
              handleGroupDeletion={handleGroupDeletion}
              onUpdate={onUpdate}
              passGroupName={props.passGroupName}
            />
          ))}
      </div>
    </section>
  )
}

export default GroupContainer
