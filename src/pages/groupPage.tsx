import React, { useEffect } from 'react'
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
import { Group, PathParams } from '../customTypes/requestTypes'
import { createApiService } from '../utils/utilities'
import { RecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { serviceTypes } from '../customTypes/enumTypes'
import { getRecipes } from '../utils/recipeUtils'
import { AddRecipeContent, CartButtonContent } from '../components/buttonContents'

// Extracted constants for styling
const GenerateShoppingListStyling: ButtonStyling = {
  backgroundColor: 'white',
  textColor: 'black'
}

type Props = {
  recipePage: React.Dispatch<React.SetStateAction<pages>>
}

const GroupPage: React.FunctionComponent<Props> = ({ recipePage }: Props) => {
  const [activeGroup, setActiveGroup] = React.useState<Group>()
  const recipeServiceType = serviceTypes.recipe

  const AddRecipe = () => recipePage(pages.addRecipe)

  const fetchRecipes = async (userId: number) => {
    return await getRecipes(userId, activeGroup?.groupId)
  }

  const GenerateShoppingList = () => {}

  return (
    <div className={GroupPageCSS.groupPageMainContainer}>
      <div className={GroupPageCSS.groupContainerWrapper}>
        <GroupContainer passGroup={setActiveGroup} />
      </div>
      <div className={GroupPageCSS.recipesSection}>
        <div className={GroupPageCSS.recipeSectionTop}>
          {activeGroup?.name ? <h2>{activeGroup.name}</h2> : <div></div>}
          <div className={GroupPageCSS.buttonsContainer}>
            <Button action={AddRecipe}>
              <AddRecipeContent />
            </Button>
            <Button styles={GenerateShoppingListStyling} action={GenerateShoppingList}>
              <CartButtonContent />
            </Button>
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
