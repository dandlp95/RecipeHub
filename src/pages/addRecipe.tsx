import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import css from './styles/addRecipe.module.css'
import Button from '../components/button'
import FormList from '../components/formList'
import { AiOutlinePlus } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { getMeasurementUnits } from '../utils/api-calls/recipeApiCalls'
import { getGroups } from '../utils/api-calls/groupApiCalls'
import { getRecipe } from '../utils/api-calls/recipeApiCalls'
import { Group } from '../customTypes/DTOs/groupTypes'
import FormListSortOrder from '../components/formListOrdered'
import CategoriesForm from '../components/categoriesForm'
import { MeasurementUnit, Recipe, RecipeIngredientDTO, Step } from '../customTypes/DTOs/recipeTypes'
import { Category } from '../customTypes/DTOs/categoryTypes'
import MeasurementUnitAutocomplete from '../components/measurementUnitAutocomplete'
import CustomDropdown, { DropdownOption } from '../components/customDropdown'

type Props = {}

const AddRecipe: React.FunctionComponent<Props> = props => {
  const { id: recipeId } = useParams<{ id?: string }>()
  const [searchParams] = useSearchParams()
  const [recipeTitle, setRecipeTitle] = useState<string>('')
  const [prepTime, setPrepTime] = useState<string>('')

  const [ingredients, setIngredients] = useState<RecipeIngredientDTO[]>([])
  const [ingredientName, setIngredientName] = useState<string>('')
  const [quantityNumber, setQuantityNumber] = useState<string>('')
  const [measurementUnitId, setMeasurementUnitId] = useState<number>(0)

  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>([])

  const [instructions, setInstructions] = useState<Step[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [allAvailableCategories, setAllAvailableCategories] = useState<Category[]>([])
  const [groupId, setGroupId] = useState<number>(0)
  const [groups, setGroups] = useState<Group[]>([])
  const [instructionInput, setInstructionInput] = useState<string>('')
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  // Convert groups to dropdown options
  const groupOptions: DropdownOption[] = [
    { value: '', label: 'Select a group' },
    ...groups.map(group => ({
      value: group.groupId || 0,
      label: group.name || 'Unnamed Group'
    }))
  ]

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
  
  const handleQuantityChange = (value: string) => {
    // Allow empty string or valid numbers >= 0
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setQuantityNumber(value)
    }
  }
  
  const addIngredient = () => {
    const ingredientsLength = ingredients.length
    const quantityValue = quantityNumber === '' ? null : parseFloat(quantityNumber)
    
    const newIngredient: RecipeIngredientDTO = {
      sortOrder: ingredientsLength + 1,
      measurementUnitId: measurementUnitId,
      quantityNumber: quantityValue,
      ingredientName: ingredientName,
      recipeIngredientId: null,
      recipeId: null
    }
    if(newIngredient.ingredientName === ''){
      return
    }
    setIngredients([...ingredients, newIngredient])
    setIngredientName('')
    setQuantityNumber('')
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
          <CustomDropdown
            id='groupTitle'
            name='groupTitle'
            options={groupOptions}
            value={groupId || ''}
            onChange={(value) => setGroupId(typeof value === 'string' ? parseInt(value) || 0 : value)}
            placeholder='Select a group'
            required
            className={css.groupDropdown}
          />
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
                min={0}
                step={0.01}
                name='quantityNumber'
                id={css.quantityNumberInput}
                placeholder='Quantity'
                value={quantityNumber}
                onChange={e => handleQuantityChange(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addIngredient()}
                className={`${css.editInput} ${css.quantityInput}`}
              />
              <div className={css.autocompleteContainer}>
              <MeasurementUnitAutocomplete
                measurementUnits={measurementUnits}
                  selectedUnitId={measurementUnitId}
                  onUnitSelect={setMeasurementUnitId}
                />
              </div>
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
          <div className={`${css.formElements} ${css.instructionsFormElements}`}>
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
            allAvailableCategories={allAvailableCategories}
          />
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
