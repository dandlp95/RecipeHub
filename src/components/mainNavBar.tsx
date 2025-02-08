import React, { ChangeEventHandler, useEffect, useState } from 'react'
import MainNavBarCSS from './styles/mainNavBar.module.css'
import { TbToolsKitchen3 } from 'react-icons/tb'
import { IconContext } from 'react-icons'
import { RiAccountCircleFill } from 'react-icons/ri'
import { MdExpandMore } from 'react-icons/md'
import { pages } from '../customTypes/enumTypes'

type Props = {
  setPage: React.Dispatch<React.SetStateAction<pages>>
}

const MainNavBar: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={MainNavBarCSS.mainNavBarContainer}>
      <div
        className={MainNavBarCSS.iconContainer}
        onClick={e => props.setPage(pages.groupPage)}
      >
        <IconContext.Provider value={{ className: MainNavBarCSS.icon }}>
          <TbToolsKitchen3 />
        </IconContext.Provider>
        <div className={MainNavBarCSS.iconText}>RecipeHub</div>
      </div>
      <div className={MainNavBarCSS.navBar}>
        <p>Recipes</p>
        <p>Groups</p>
        <p>Shopping Lists</p>
        <div className={MainNavBarCSS.accountIcons}>
          <div>
            <IconContext.Provider
              value={{
                className: `${MainNavBarCSS.icon}`
              }}
            >
              <RiAccountCircleFill />
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider
              value={{
                className: `${MainNavBarCSS.expandableIcon} ${MainNavBarCSS.expanded}`
              }}
            >
              <MdExpandMore />
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNavBar
