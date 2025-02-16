import React from 'react'
import GroupContainer from '../components/groupsContainer'
import Button from '../components/button'
import RecipePreview from '../components/recipePreview'
import AddRecipePlaceholder from '../components/addRecipePlaceholder'
import GroupPageCSS from './styles/groupPage.module.css'
import { ButtonStyling } from '../customTypes/interfaces'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { pages } from '../customTypes/enumTypes'

type Props = {
  recipePage: React.Dispatch<React.SetStateAction<pages>>
}

const GenerateShoppingListStyling: ButtonStyling = {
  backgroundColor: 'white',
  textColor: 'black'
}

const GroupPage: React.FunctionComponent<Props> = (props: Props) => {
  const AddRecipe = () => {
    props.recipePage(pages.addRecipe)
  }

  const GenerateShoppingList = () => {}

  return (
    <div className={GroupPageCSS.groupPageMainContainer}>
      <div className={GroupPageCSS.groupContainerWrapper}>
        <GroupContainer />
      </div>
      <div className={GroupPageCSS.recipesSection}>
        <div className={GroupPageCSS.recipeSectionTop}>
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
        <div className={GroupPageCSS.recipePreviewsSection}>
          <RecipePreview />
          <AddRecipePlaceholder />
        </div>
      </div>
    </div>
  )
}

export default GroupPage
