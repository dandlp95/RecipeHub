import React, { useEffect, useState, useRef, useCallback } from 'react'
import useDidMountEffect from '../customHooks/useDidMountEffect'
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

/***************************************************************************************************************
 *                                              INDIVIDUAL GROUP
 *  ************************************************************************************************************/

type Props1 = {
  group: Group
  handleGroupDeletion: (groupId: number) => void
  onUpdate: (groupName: Group) => void
  passActiveGroup: (group: Group | null) => void
  // passGroup: (group: Group) => void
  activeGroup: Group | null
}

const IndividualGroup: React.FunctionComponent<Props1> = ({
  group,
  handleGroupDeletion,
  onUpdate,
  passActiveGroup,
  activeGroup
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [groupData, setGroupData] = useState<Group>(group)
  const [prevGroupName, setPrevGroupName] = useState<string | undefined>(
    group.name
  )
  const inputRef = useRef<HTMLInputElement | null>(null)
  const defaultName = '[Add Name]'

  /*******************************************************************
   *                HANDLE GROUP UPDATES
   ********************************************************************/

  useDidMountEffect(() => {
    if (!isEditing) {
      if (!groupData.name || groupData.name === '') {
        setGroupData({ ...groupData, name: defaultName })
      }
      // if groupData.name is an empty string, the changes in the if statement above
      // will not be reflected in the groupData.name state below, so it will be an empty string.
      setPrevGroupName(groupData.name)
    }
  }, [isEditing])

  useDidMountEffect(() => {
    if (!isEditing) {
      // prevGroupName will still be the previous group name because the prevGroupName state will
      // not be updated until the component re-renders. While groupData.name will be the updated
      // name because onChange => setGroupData will update the groupData state immediately.
      if (prevGroupName !== groupData.name) {
        onUpdate(groupData)
      }
    }
  }, [groupData, isEditing])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ends editing and saves the updated group name (if changed) when 'Enter' is pressed
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  /****************************************************************
   *               HANDLE GROUP CONTAINER ACTIVE STATE
   ****************************************************************/

  const handleGroupActiveState = (group: Group | null) => {
    if (group) {
      passActiveGroup(group)
      return
    }
  }

  return (
    <div
      key={groupData.groupId}
      className={`${groupContainerCSS.singleGroup}${
        activeGroup?.groupId == groupData.groupId
          ? ` ${groupContainerCSS.activeGroup}`
          : ''
      }`}
    >
      <div className={groupContainerCSS.groupName}>
        <IconContext.Provider
          value={{ className: `${groupContainerCSS.deleteIcon}` }}
        >
          <ImBin2
            onClick={() =>
              groupData.groupId ? handleGroupDeletion(groupData.groupId) : ''
            }
          />
        </IconContext.Provider>
        {isEditing ? (
          <input
            onChange={e => setGroupData({ ...groupData, name: e.target.value })}
            value={groupData.name ? groupData.name : ''}
            onBlur={() => setIsEditing(false)}
            ref={inputRef}
            onKeyDown={e => handleKeyDown(e)}
            type='text'
          />
        ) : (
          <span
            onClick={() => handleGroupActiveState(groupData ? groupData : null)}
            onDoubleClick={() => setIsEditing(true)}
          >
            {groupData.name}
          </span>
        )}
      </div>
      <p>{`${groupData.totalRecipes} recipes`}</p>
    </div>
  )
}

/************************************************************************************************************
 *                              MAING GROUP CONTAINER FUNCTION COMPONENT
 * **********************************************************************************************************/

type Props = {
  passGroupId: (groupId: number | null) => void
  passGroup: (group: Group) => void
}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  const [groups, setGroups] = useState<Group[]>([])
  // defaultEvent triggers a re-render when a group is deleted or the page loads.
  // It uses setDefaultGroup to get the first group and passes its id and name to the parent component.
  // The parent component uses this to select the default group on load or after deletion.
  const [defaultEvent, setDefaultEvent] = useState<boolean>(false)
  const [activeGroup, setActiveGroup] = useState<Group | null>(null)

  useEffect(() => {
    // props.passGroupId(activeGroup)
    if (activeGroup) {
      props.passGroup(activeGroup)
    }
  }, [activeGroup])

  const setDefaultGroup = (groups: Group[]) => {
    if (groups.length > 0) {
      return groups[0] ? groups[0] : null
    }
    return null
  }

  useEffect(() => {
    //Triggered when a group is deleted only, removed group dependency to avoid setting default group
    //when other changes are done to the group list (e.g. group name update)
    const defaultGroup: Group | null = setDefaultGroup(groups)
    if (defaultGroup) {
      setActiveGroup(defaultGroup)
    }
  }, [defaultEvent])

  /*******************************************************
   *            HANDLE FETCHING GROUPS
   * *************************************************** */

  const getGroups = async (userId: number) => {
    const apiService = createRecipeApiService()
    const fetchedGroups = await apiService.getGroups(`users/${userId}/groups`, {
      userId: userId
    })
    return fetchedGroups
  }

  const getGroupsHandler = async (
    userId: number,
    setState: (groups: Group[]) => void
  ) => {
    const fetchedGroups = await getGroups(userId)
    setState(fetchedGroups?.result ? fetchedGroups.result : [])
    setDefaultEvent(!defaultEvent)
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
      getGroupsHandler(userId, setGroups)
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

  const addGroup = async (userId: number, token: string) => {
    const newGroup: Group = {
      name: 'New Group',
      totalRecipes: 0,
      createdOn: new Date()
    }

    const url = `users/${userId}/groups`
    const apiService = createRecipeApiService()
    const data = await apiService.createGroup(url, { userId: userId }, newGroup)
    return data
  }

  const addGroupHandler = async () => {
    const userId = Number(localStorage.getItem('userId'))
    const token = localStorage.getItem('token')

    if (isNaN(userId)) {
      throw new Error('User ID is not a number')
    }
    if (!token) {
      throw new Error('Token not found')
    }

    const data = await addGroup(userId, token)

    if (data.result) {
      setGroups([...groups, data.result])
    }
  }

  /*******************************************************
   *            HANDLE GROUP DELETIONS
   * *************************************************** */

  const handleGroupDeletion = (groupId: number) => {
    try {
      deleteGroup(groupId)
      setGroups(prevgroups =>
        prevgroups.filter(group => group.groupId !== groupId)
      )
      if (groupId === activeGroup) {
        setDefaultEvent(!defaultEvent)
      }
    } catch (err) {
      console.error(err)
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

    return response
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

  const onUpdate = async (passedGroup: Group) => {
    // Updates entity group and passes updated group name to parent component.
    try {
      const updatedGroup = await updateGroup(
        passedGroup.groupId ? passedGroup.groupId : 0,
        passedGroup
      )
      if (updatedGroup?.groupId) {
        setGroups(prevgroups =>
          prevgroups.map(group =>
            group.groupId === passedGroup.groupId ? updatedGroup : group
          )
        )
        // props.passGroupId(updatedGroup.groupId)
        console.log('updated...')
        setActiveGroup(updatedGroup)
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
          <AiOutlinePlus onClick={addGroupHandler} />
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
              passActiveGroup={setActiveGroup}
              activeGroup={activeGroup}
            />
          ))}
      </div>
    </section>
  )
}

export default GroupContainer
