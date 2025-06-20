import React, { useState } from 'react'
import css from './styles/addRecipe.module.css'
import Button from '../components/button'
import FormList from '../components/formList'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'

type Props = {}

const AddRecipe: React.FunctionComponent<Props> = () => {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [instructions, setInstructions] = useState<string[]>([])

  const saveRecipe = () => {}

  return (
    <div className={css.addRecipeMain}>
      <div className={css.addRecipeHeader}>
        <h2>Add New Recipe</h2>
        <div>
          <Button action={saveRecipe} styles={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Save Recipe
          </Button>
        </div>
      </div>
      <div className={css.addRecipeForm}>
        <div className={`${css.recipeTitle} ${css.fieldPart1}`}>
          <label htmlFor='recipeTitle'>Recipe Title</label>
          <input
            required
            type='text'
            name='recipeTitle'
            id='recipeTitle'
            placeholder='Enter recipe title'
          />
        </div>
        <div className={css.recipeImage}>{/* will implement last */}</div>
        <div className={`${css.time} ${css.fieldPart1}`}>
          <label htmlFor='time'>Preparation Time</label>
          <input type='text' name='time' id='time' placeholder='e.g., 30 minutes' />
        </div>
        <div className={css.IngredientsForm}>
          <label htmlFor='ingredients'>Ingredients</label>
          <div className={css.formElements}>
            <div>
              <input type='text' name='ingredients' id='ingredients' placeholder='Add ingredient' />
            </div>
            <IconContext.Provider value={{ className: `${css.plusIcon} ${css.icon}` }}>
              <AiOutlinePlus />
            </IconContext.Provider>
          </div>
        </div>
        {ingredients.length > 0 && (
          <div className={css.IngredientsList}>
            <FormList />
          </div>
        )}
        <div className={css.InstructionsForm}>
          <label htmlFor='instructions'>Instructions</label>
          <div className={css.formElements}>
            <div>
              <input
                type='text'
                name='instructions'
                id='instructions'
                placeholder='Add Step Instructions'
              />
            </div>
            <IconContext.Provider value={{ className: `${css.plusIcon} ${css.icon}` }}>
              <AiOutlinePlus />
            </IconContext.Provider>
          </div>
        </div>
        {instructions.length > 0 && (
          <div className={css.instructionsList}>
            <FormList />
          </div>
        )}
        <div className={css.categories}>
          <p>Categories</p>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
