import React from 'react'
import GroupContainer from '../components/groupsContainer'
import GroupPageCSS from './styles/groupPage.module.css'

type Props = {}

const GroupPage: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={GroupPageCSS.groupPageMainContainer}>
      <div className={GroupPageCSS.groupContainerWrapper}>
        <GroupContainer />
      </div>
      <div className={GroupPageCSS.images}>test</div>
    </div>
  )
}

export default GroupPage
