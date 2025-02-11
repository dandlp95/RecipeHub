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
      <div className={css.addRecipe}>
        <h2>Add New Recipe</h2>
        <Button action={saveRecipe}>Save Recipe</Button>
      </div>
      <div className={css.addRecipeForm}>
        <div className={css.recipeTitle}>
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
        <div className={css.time}>
          <label htmlFor='time'>Preparation Time</label>
          <input
            type='text'
            name='time'
            id='time'
            placeholder='e.g., 30 minutes'
          />
        </div>
        <div className={css.IngredientsForm}>
          <label htmlFor='ingredients'>Ingredients</label>
          <div>
            <input
              type='text'
              name='ingredients'
              id='ingredients'
              placeholder='Add ingredient'
            />
            <IconContext.Provider value={{ className: `${css.plusIcon}` }}>
              <AiOutlinePlus />
            </IconContext.Provider>
          </div>
        </div>
        <div className={css.IngredientsList}>
          <FormList />
        </div>
        <div className={css.InstructionsForm}>
          <label htmlFor='instructions'>Instructions</label>
          <div>
            <input
              type='text'
              name='instructions'
              id='instructions'
              placeholder='Add Step Instructions'
            />
            <IconContext.Provider value={{ className: `${css.plusIcon}` }}>
              <AiOutlinePlus />
            </IconContext.Provider>
          </div>
        </div>
        <div className={css.IngredientsList}>
          <FormList />
        </div>
        <div className={css.categories}>
          <p>Categories</p>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
