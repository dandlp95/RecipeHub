import React from 'react';
import MainNavBar from '../components/mainNavBar';
import HomeCSS from './styles/home.module.css'

type Props = {

}

const Home: React.FunctionComponent<Props> = () => {
    return (
    <div className={HomeCSS.homeMain}>
        <div className={HomeCSS.headerContainer}>
            <MainNavBar />
        </div>
    </div>
    )
}

export default Home