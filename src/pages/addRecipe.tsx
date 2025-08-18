import React, { useState, useEffect } from 'react'
import css from './styles/addRecipe.module.css'
import Button from '../components/button'
import FormList from '../components/formList'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { getGroups } from '../utils/apiCalls'
import { Group } from '../customTypes/requestTypes'

type Props = {
}

const AddRecipe: React.FunctionComponent<Props> = (props) => {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [instructions, setInstructions] = useState<string[]>([])
  const [groupId, setGroupId] = useState<number>(0)
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')

  useEffect(() => {
    getGroups().then(apiData => {
      if (apiData.result) {
        setGroups(apiData.result)
      }
    })

    // Get groupId from URL query parameters
    const urlParams = new URLSearchParams(window.location.search)
    const groupIdFromQuery = urlParams.get('group')
    if (groupIdFromQuery) {
      setGroupId(parseInt(groupIdFromQuery))
      setSelectedGroup(groupIdFromQuery)
    }
  }, [])

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
        <div className={`${css.groupTitle}`}>
          <label htmlFor='groupTitle'>Group</label>
          <select
            required
            name='groupTitle'
            id='groupTitle'
            value={selectedGroup}
            onChange={e => setSelectedGroup(e.target.value)}
          >
            <option value=''>Select a group</option>
            {groups.map(group => (
              <option key={group.groupId} value={group.groupId} selected={group.groupId == groupId}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
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
