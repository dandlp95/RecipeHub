import React, { useState } from 'react'
import MainNavBar from '../components/mainNavBar'
import GroupPage from './groupPage'
import HomeCSS from './styles/home.module.css'
import { pages } from '../customTypes/enumTypes'
import AddRecipe from './addRecipe'

type Props = {}

const Home: React.FunctionComponent<Props> = () => {
  const [page, setPage] = useState<pages>(pages.groupPage)
  
  return (
    <div className={HomeCSS.homeContainer}>
      <div>
        <MainNavBar setPage={setPage} />
      </div>
      <div className={HomeCSS.mainSection}>
        {page === pages.addRecipe ? (
          <AddRecipe />
        ) : (
          <GroupPage recipePage={setPage} />
        )}
      </div>
      <div className={HomeCSS.footer}></div>
    </div>
  )
}

export default Home
