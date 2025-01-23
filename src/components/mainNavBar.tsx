import React, { ChangeEventHandler, useEffect, useState } from 'react'
import MainNavBarCSS from './styles/mainNavBar.module.css'
import { TbToolsKitchen3 } from 'react-icons/tb'
import { IconContext } from 'react-icons'

type Props = {}

const MainNavBar: React.FunctionComponent<Props> = Props => {
  return (
    <div className={MainNavBarCSS.mainNavBarContainer}>
      <div className={MainNavBarCSS.iconContainer}>
        <IconContext.Provider value={{ className: MainNavBarCSS.icon }}>
          <div>
            <TbToolsKitchen3 />
          </div>
        </IconContext.Provider>
        <div className={MainNavBarCSS.iconText}>RecipeHub</div>
      </div>
      <div className={MainNavBarCSS.navBar}>
        <p>Recipes</p>
        <p>Groups</p>
        <p>Shopping Lists</p>
      </div>
    </div>
  )
}

export default MainNavBar
