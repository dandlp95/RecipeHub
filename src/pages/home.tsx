import React from 'react'
import MainNavBar from '../components/mainNavBar'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import HomeCSS from './styles/home.module.css'

type Props = {}

const Home: React.FunctionComponent<Props> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Function to handle navigation from MainNavBar
  const handlePageChange = (page: string) => {
    if (page === 'addRecipe') {
      navigate('/home/recipe/')
    } else if (page === 'groupPage') {
      navigate('/home/groups')
    }
  }
  
  return (
    <div className={HomeCSS.homeContainer}>
      <div>
        <MainNavBar setPage={handlePageChange} />
      </div>
      <div className={HomeCSS.mainSection}>
        <Outlet />
      </div>
      <div className={HomeCSS.footer}></div>
    </div>
  )
}

export default Home
