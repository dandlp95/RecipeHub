import React, { useState, useEffect } from 'react'
import css from './styles/addRecipe.module.css'
import Button from '../components/button'
import FormList from '../components/formList'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { getGroups } from '../utils/apiCalls'
import { Group } from '../customTypes/requestTypes'
import FormListSortOrder from '../components/formListOrdered'
import CategoriesForm from '../components/categoriesForm'

type Props = {
}

const AddRecipe: React.FunctionComponent<Props> = (props) => {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [instructions, setInstructions] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [groupId, setGroupId] = useState<number>(0)
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string>('')
  const [ingredientInput, setIngredientInput] = useState<string>('')
  const [instructionInput, setInstructionInput] = useState<string>('')

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

  /********* INGREDIENTS FORM *********/
  const addIngredient = () => {
    if (ingredientInput.trim() !== '') {
      setIngredients([...ingredients, ingredientInput.trim()])
      setIngredientInput('')
    }
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, newValue: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = newValue
    setIngredients(newIngredients)
  }

  /********* INSTRUCTIONS FORM *********/
  const addInstruction = () => {
    if (instructionInput.trim() !== '') {
      setInstructions([...instructions, instructionInput.trim()])
      setInstructionInput('')
    }
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const updateInstruction = (index: number, newValue: string) => {
    const newInstructions = [...instructions]
    newInstructions[index] = newValue
    setInstructions(newInstructions)
  }

  const reorderInstructions = (newOrder: string[]) => {
    setInstructions(newOrder)
  }

  /********* CATEGORIES FORM *********/
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
    }
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const updateCategory = (index: number, newValue: string) => {
    const newCategories = [...categories]
    newCategories[index] = newValue
    setCategories(newCategories)
  }

  // Placeholder function for getting all available categories from API
  const getAllCategories = async (): Promise<string[]> => {
    // TODO: Replace with actual API call
    // For now, return some sample categories
    return [
      'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack',
      'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
      'Quick & Easy', 'Slow Cooker', 'One Pot', 'Meal Prep',
      'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American'
    ]
  }
  
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
              <input 
                type='text' 
                name='ingredients' 
                id={css.ingredientsInput} 
                placeholder='Add ingredient'
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              />
            </div>
            <IconContext.Provider value={{ className: `${css.plusIcon} ${css.icon}` }}>
              <AiOutlinePlus onClick={addIngredient} />
            </IconContext.Provider>
          </div>
        </div>
        {ingredients.length > 0 && (
          <div className={css.IngredientsList}>
            <FormList items={ingredients} onRemove={removeIngredient} onUpdate={updateIngredient} />
          </div>
        )}
        <div className={css.InstructionsForm}>
          <label htmlFor='instructions'>Instructions</label>
          <div className={css.formElements}>
            <div>
              <input
                type='text'
                name='instructions'
                id={css.instructionsInput}
                placeholder='Add Step Instructions'
                value={instructionInput}
                onChange={(e) => setInstructionInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addInstruction()}
              />
            </div>
            <IconContext.Provider value={{ className: `${css.plusIcon} ${css.icon}` }}>
              <AiOutlinePlus onClick={addInstruction} />
            </IconContext.Provider>
          </div>
        </div>
        {instructions.length > 0 && (
          <div className={css.instructionsList}>
            <FormListSortOrder 
              items={instructions} 
              onRemove={removeInstruction} 
              onUpdate={updateInstruction}
              onReorder={reorderInstructions}
            />
          </div>
        )}
        <div className={css.categories}>
          <p>Categories</p>
          <CategoriesForm
            categories={categories}
            onAddCategory={addCategory}
            onRemoveCategory={removeCategory}
            onUpdateCategory={updateCategory}
            getAllCategories={getAllCategories}
          />
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
