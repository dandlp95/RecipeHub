import React from 'react'
import GroupContainer from '../components/groupsContainer'
import GroupPageCSS from './styles/groupPage.module.css'
import Button from '../components/button'
import { ButtonStyling } from '../customTypes/interfaces'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'

type Props = {}

const GenerateShoppingListStyling: ButtonStyling = {
  backgroundColor: 'white',
  textColor: 'black'
}

const GroupPage: React.FunctionComponent<Props> = (props: Props) => {
  const AddRecipe = () => {}

  const GenerateShoppingList = () => {}

  return (
    <div className={GroupPageCSS.groupPageMainContainer}>
      <div className={GroupPageCSS.groupContainerWrapper}>
        <GroupContainer />
      </div>
      <div className={GroupPageCSS.recipesSection}>
        {/* the header below will be dynamically generated based on whatever group is selected 
        Hardcoded for testing purposes*/}
        <h2>Weekly Dinner Recipes</h2>
        <div className={GroupPageCSS.groupPageButtons}>
          <Button action={AddRecipe}>
            <div className={GroupPageCSS.addRecipeContent}>
              <IconContext.Provider
                value={{ className: `${GroupPageCSS.addRecIcon}` }}
              >
                <AiOutlinePlus />
              </IconContext.Provider>
              <span>Add Recipe</span>
            </div>
          </Button>
          <Button
            styles={GenerateShoppingListStyling}
            action={GenerateShoppingList}
          >
            Generate Shopping List
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GroupPage
