import React from 'react'
import groupContainerCSS from './styles/groupsContainer.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'

type Props = {}

const GroupContainer: React.FunctionComponent<Props> = (props: Props) => {
  
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
