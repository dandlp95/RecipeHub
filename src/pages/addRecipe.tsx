import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import css from './styles/addRecipe.module.css'
import Button from '../components/button'
import FormList from '../components/formList'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { getGroups, getMeasurementUnits, getRecipe } from '../utils/apiCalls'
import { Group } from '../customTypes/DTOs/requestTypes'
import FormListSortOrder from '../components/formListOrdered'
import CategoriesForm from '../components/categoriesForm'
import { MeasurementUnit, Recipe, RecipeIngredientDTO, Step } from '../customTypes/DTOs/recipeTypes'
import { Category } from '../customTypes/DTOs/categoryTypes'
import { ingredientFieldNames } from '../customTypes/enumTypes'

type Props = {}

const AddRecipe: React.FunctionComponent<Props> = props => {
  const { id: recipeId } = useParams<{ id?: string }>()
  const [searchParams] = useSearchParams()
  const [recipeTitle, setRecipeTitle] = useState<string>('')
  const [prepTime, setPrepTime] = useState<string>('')

  const [ingredients, setIngredients] = useState<RecipeIngredientDTO[]>([])
  const [ingredientName, setIngredientName] = useState<string>('')
  const [quantityNumber, setQuantityNumber] = useState<number>(0)
  const [measurementUnitId, setMeasurementUnitId] = useState<number>(0)

  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>([])

  const [instructions, setInstructions] = useState<Step[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [allAvailableCategories, setAllAvailableCategories] = useState<Category[]>([])
  const [groupId, setGroupId] = useState<number>(0)
  const [groups, setGroups] = useState<Group[]>([])
  const [instructionInput, setInstructionInput] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  /********* FETCH RECIPE DATA *********/
  useEffect(() => {
    const fetchRecipeData = async (recipeId: number): Promise<Recipe | null> => {
      setIsEditMode(true)
      const apiData = await getRecipe(recipeId)
      if (apiData.result) {
        return apiData.result
      }
      return null
    }

    const setRecipeData = async (recipeId: number) => {
      const recipe = await fetchRecipeData(recipeId)

      if (recipe) {
        setIngredients(recipe.recipeIngredients || [])
        setInstructions(recipe.steps || [])
        setGroupId(recipe.groupId || 0)
        setRecipeTitle(recipe.name || '')
        setPrepTime(recipe.cookingTime || '')
        setAllAvailableCategories(recipe.categories || [])
      }
    }

    if (recipeId) {
      setRecipeData(parseInt(recipeId))
    }
  }, [])

  /********* FETCH MEASUREMENT UNITS *********/
  useEffect(() => {
    getMeasurementUnits().then(apiData => {
      if (apiData.result) {
        setMeasurementUnits(apiData.result)
      }
    })
  }, [])

  /********* FETCH GROUPS *********/
  useEffect(() => {
    getGroups().then(apiData => {
      if (apiData.result) {
        setGroups(apiData.result)
      }
    })

    // Get groupId from URL query parameters
    const groupIdFromQuery = searchParams.get('group')
    if (groupIdFromQuery) {
      setGroupId(parseInt(groupIdFromQuery))
    }
  }, [recipeId, searchParams])

  const saveRecipe = () => {
    if (isEditMode) {
      // TODO: Update existing recipe
      console.log('Updating recipe:', recipeId)
    } else {
      // TODO: Create new recipe
      console.log('Creating new recipe')
    }
  }

  /********* INGREDIENTS FORM *********/
  const addIngredient = () => {
    const ingredientsLength = ingredients.length
    const newIngredient: RecipeIngredientDTO = {
      sortOrder: ingredientsLength + 1,
      measurementUnitId: measurementUnitId,
      quantityNumber: quantityNumber,
      ingredientName: ingredientName,
      recipeIngredientId: null,
      recipeId: null
    }
    setIngredients([...ingredients, newIngredient])
    setIngredientName('')
    setQuantityNumber(0)
    setMeasurementUnitId(0)
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const updateIngredientName = (index: number, newValue: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], ingredientName: newValue }
    setIngredients(newIngredients)
  }

  const updateIngredientQuantityNumber = (index: number, newValue: number) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], quantityNumber: newValue }
    setIngredients(newIngredients)
  }

  const updateIngredientMeasurementUnitId = (index: number, newValue: number) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = { ...newIngredients[index], measurementUnitId: newValue }
    setIngredients(newIngredients)
  }

  /********* INSTRUCTIONS FORM *********/
  const addInstruction = () => {
    if (instructionInput.trim() !== '') {
      const newStep: Step = {
        stepId: null,
        recipeId: null,
        text: instructionInput.trim(),
        sortOrder: instructions.length
      }
      setInstructions([...instructions, newStep])
      setInstructionInput('')
    }
  }

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index))
  }

  const updateInstruction = (index: number, newValue: string) => {
    const newInstructions = [...instructions]
    newInstructions[index] = { ...newInstructions[index], text: newValue }
    setInstructions(newInstructions)
  }

  const reorderInstructions = (newOrder: Step[]) => {
    setInstructions(newOrder)
  }

  /********* CATEGORIES FORM *********/
  const addCategory = (category: Category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category])
    }
  }

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const updateCategory = (index: number, newValue: string) => {
    const newCategories = [...categories]
    newCategories[index] = { ...newCategories[index], title: newValue }
    setCategories(newCategories)
  }


  return (
    <div className={css.addRecipeMain}>
      <div className={css.addRecipeHeader}>
        <h2>{isEditMode ? 'Edit Recipe' : 'Add New Recipe'}</h2>
        <div>
          <Button action={saveRecipe}>{isEditMode ? 'Update Recipe' : 'Save Recipe'}</Button>
        </div>
      </div>
      <div className={css.addRecipeForm}>
        <div className={`${css.groupTitle}`}>
          <label htmlFor='groupTitle'>Group</label>
          <select
            required
            name='groupTitle'
            id='groupTitle'
            value={groupId}
            onChange={e => setGroupId(parseInt(e.target.value))}
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
            <div className={css.ingredientFields}>
              <input
                type='text'
                name='ingredients'
                id={css.ingredientsInput}
                placeholder='Add ingredient'
                value={ingredientName}
                onChange={e => setIngredientName(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addIngredient()}
                className={`${css.editInput} ${css.ingredientNameInput}`}
              />
              <input
                type='number'
                name='quantityNumber'
                id={css.quantityNumberInput}
                placeholder='Quantity'
                value={quantityNumber}
                onChange={e => setQuantityNumber(parseInt(e.target.value))}
                onKeyPress={e => e.key === 'Enter' && addIngredient()}
                className={`${css.editInput} ${css.quantityInput}`}
              />
              <select
                name='measurementUnitId'
                id={css.measurementUnitIdInput}
                value={measurementUnitId}
                onChange={e => setMeasurementUnitId(parseInt(e.target.value))}
                className={`${css.editInput} ${css.unitSelect}`}
              >
              <option value=''>Select unit</option>
              {measurementUnits.map(unit => (
                <option key={unit.measurementUnitId} value={unit.measurementUnitId}>
                  {unit.abbreviation}
                </option>
              ))}
              </select>
            </div>
            <IconContext.Provider value={{ className: `${css.plusIcon} ${css.icon}` }}>
              <AiOutlinePlus onClick={addIngredient} />
            </IconContext.Provider>
          </div>
        </div>
        {ingredients.length > 0 && (
          <div className={css.IngredientsList}>
            <FormList
              items={ingredients}
              onRemove={removeIngredient}
              onUpdateName={updateIngredientName}
              onUpdateQuantity={updateIngredientQuantityNumber}
              onUpdateMeasurementUnit={updateIngredientMeasurementUnitId}
              measurementUnits={measurementUnits}
            />
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
                onChange={e => setInstructionInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addInstruction()}
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
            allAvailableCategories={allAvailableCategories}
          />
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
