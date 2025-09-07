import React, { useState, useEffect, useRef } from 'react'
import useDidMountEffect from '../customHooks/useDidMountEffect'
import css from './styles/groupsContainer.module.css'
import { Group } from '../customTypes/DTOs/groupTypes'
import { createGroup, updateGroup, deleteGroup } from '../utils/api-calls/groupApiCalls'
import { ErrorHandling } from '../customTypes/errorHandling'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { ImBin2 } from 'react-icons/im'
import { getGroups } from '../utils/api-calls/groupApiCalls'


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
      className={`${css.singleGroup}${
        activeGroup?.groupId == groupData.groupId
          ? ` ${css.activeGroup}`
          : ''
      }`}
    >
      <div className={css.groupName}>
        <IconContext.Provider
          value={{ className: `${css.deleteIcon}` }}
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

  const getGroupsHandler = async (setState: (groups: Group[]) => void) => {
    const fetchedGroups = await getGroups();
    setState(fetchedGroups?.result ? fetchedGroups.result : [])
    setDefaultEvent(!defaultEvent)
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }
      getGroupsHandler(setGroups)
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

    return await createGroup(newGroup)
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

  const handleGroupDeletion = async (groupId: number) => {
    try {
      let response = await deleteGroup(groupId)
      if (response.isSuccess) {
        setGroups(prevgroups =>
          prevgroups.filter(group => group.groupId !== groupId)
        )
      }
      if (groupId === activeGroup?.groupId) {
        setDefaultEvent(!defaultEvent)
      }
    } catch (err) {
      console.error(err)
    }
  }

  /****************************************************************
   *                HANDLE GROUP UPDATES
   * ************************************************************** */

  const updateGroupLocal = async (groupId: number, updatedGroup: Group) => {
    const userId = Number(localStorage.getItem('userId'))
    const token = localStorage.getItem('token')

    if (isNaN(userId)) {
      throw new Error('User ID is not a number')
    }
    if (!token) {
      throw new Error('Token not found')
    }

    return await updateGroup(groupId, updatedGroup)
  }

  const onUpdate = async (passedGroup: Group) => {
    // Updates entity group and passes updated group name to parent component.
    try {
      const response = await updateGroupLocal(
        passedGroup.groupId ? passedGroup.groupId : 0,
        passedGroup
      )
      if (response?.result?.groupId) {
        const updatedGroup = response.result
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
    <section className={css.groupContainerMain}>
      <div className={css.top}>
        <h3>Recipe Groups</h3>
        <IconContext.Provider
          value={{
            className: `${css.plusSymbol} ${css.expanded}`
          }}
        >
          <AiOutlinePlus onClick={addGroupHandler} />
        </IconContext.Provider>
      </div>
      <div className={css.groups}>
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
