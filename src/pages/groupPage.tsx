import React from 'react'
import GroupContainer from '../components/groupsContainer'
import GroupPageCSS from './styles/groupPage.module.css'
import Button from '../components/button'
import { ButtonStyling } from '../customTypes/interfaces'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
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
        <div className={GroupPageCSS.buttonsContainer}>
          <div>
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
          </div>
          <div>
            <Button
              styles={GenerateShoppingListStyling}
              action={GenerateShoppingList}
            >
              <div className={GroupPageCSS.cartButtonContent}>
                <IconContext.Provider
                  value={{ className: `${GroupPageCSS.shoppingIcon}` }}
                >
                  <FaShoppingCart />
                </IconContext.Provider>
                <span>Generate Shopping List</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupPage
