import React from 'react'
import MainNavBar from '../components/mainNavBar'
import GroupPage from './groupPage'
import HomeCSS from './styles/home.module.css'

type Props = {}

const Home: React.FunctionComponent<Props> = () => {
  return (
    <div className={HomeCSS.homeContainer}>
      <div>
        <MainNavBar />
      </div>
      <div className={HomeCSS.mainSection}>
        <GroupPage />
      </div>
      <div className={HomeCSS.footer}></div>
    </div>
  )
}

export default Home
