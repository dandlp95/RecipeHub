import React, { ChangeEventHandler, useEffect, useState } from 'react'
import MainNavBarCSS from './styles/mainNavBar.module.css'
import { TbToolsKitchen3 } from 'react-icons/tb'
import { IconContext } from 'react-icons'
import { RiAccountCircleFill } from 'react-icons/ri'
import { MdExpandMore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

type Props = {
  setPage: (page: string) => void
}

const MainNavBar: React.FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/home/groups')
    props.setPage('groupPage')
  }

  return (
    <div className={MainNavBarCSS.mainNavBarContainer}>
      <div
        className={MainNavBarCSS.iconContainer}
        onClick={handleLogoClick}
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
