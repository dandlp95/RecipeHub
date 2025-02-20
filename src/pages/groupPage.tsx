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
import { Group } from '../customTypes/requestTypes'
import { createRecipeApiService } from '../apiServices/implementations/RecipeApiService'

type Props = {
  recipePage: React.Dispatch<React.SetStateAction<pages>>
}

const GenerateShoppingListStyling: ButtonStyling = {
  backgroundColor: 'white',
  textColor: 'black'
}

const GroupPage: React.FunctionComponent<Props> = (props: Props) => {
  // need the active group Id to know which recipes to fetch
  const [activeGroup, setActiveGroup] = React.useState<Group>()
  const [activeGroupId, setActiveGroupId] = React.useState<number>()

  const AddRecipe = () => {
    props.recipePage(pages.addRecipe)
  }

  const GenerateShoppingList = () => {}

  return (
    <div className={GroupPageCSS.groupPageMainContainer}>
      <div className={GroupPageCSS.groupContainerWrapper}>
        <GroupContainer
          passGroupId={(groupId: number | null) =>
            groupId ? setActiveGroupId(groupId) : ''
          }
          passGroup={setActiveGroup}
        />
      </div>
      <div className={GroupPageCSS.recipesSection}>
        <div className={GroupPageCSS.recipeSectionTop}>
          {activeGroup?.name ? <h2>{activeGroup?.name}</h2> : <div></div>}
          {/* <h2>Weekly Dinner Recipes</h2> */}
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
