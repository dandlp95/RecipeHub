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
import { useNavigate } from 'react-router-dom'
import { Group, PathParams } from '../customTypes/requestTypes'
import { RecipeApiService } from '../apiServices/implementations/RecipeApiService'
import { serviceTypes } from '../customTypes/enumTypes'
import { getRecipes } from '../utils/apiCalls'
import { AddRecipeContent, CartButtonContent } from '../components/buttonContents'

// Extracted constants for styling
const GenerateShoppingListStyling: ButtonStyling = {
  backgroundColor: 'white',
  textColor: 'black'
}

type Props = {}

const GroupPage: React.FunctionComponent<Props> = () => {
  const [activeGroup, setActiveGroup] = React.useState<Group>()
  const recipeServiceType = serviceTypes.recipe
  const navigate = useNavigate()

  const AddRecipe = () => navigate(`/home/recipe?group=${activeGroup?.groupId}`)

  const fetchRecipes = async () => {
    return await getRecipes(activeGroup?.groupId)
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
