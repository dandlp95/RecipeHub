import React, { useState, useEffect, useRef } from 'react'
import css from './styles/categoriesForm.module.css'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { Category } from '../customTypes/DTOs/categoryTypes'

type Props = {
  categories: Category[]
  onAddCategory: (category: Category) => void
  onRemoveCategory: (index: number) => void
  allAvailableCategories: Category[] // All available categories from the recipe
}

const CategoriesForm: React.FunctionComponent<Props> = ({ 
  categories, 
  onAddCategory, 
  onRemoveCategory, 
  allAvailableCategories 
}) => {
  /*
   * STATE VARIABLES
   * ================
   * 
   * UI State:
   * - isAdding: Controls whether to show input field or "Add Category" button
   * - showSuggestions: Controls visibility of autocomplete dropdown
   * 
   * Input Management:
   * - newCategoryInput: Current text in the new category input field
   * 
   * Data Management:
   * - suggestions: Filtered list of category suggestions for autocomplete
   * - allCategories: Complete list of available categories from API
   * 
   * DOM References:
   * - inputRef: Reference to the new category input field for auto-focus
   * - suggestionsRef: Reference to suggestions dropdown for click-outside detection
   */
  const [isAdding, setIsAdding] = useState(false)
  const [newCategoryInput, setNewCategoryInput] = useState('')
  const [suggestions, setSuggestions] = useState<Category[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle clicks outside suggestions to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup function to remove event listener to prevent memory leaks
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAddClick = () => {
    setIsAdding(true)
    setNewCategoryInput('')
    setShowSuggestions(false)
    // Focus the input after a short delay to ensure it's rendered
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleInputChange = (value: string) => {
    setNewCategoryInput(value)
    
    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Filter categories that match the input
    const filtered = allAvailableCategories
      .filter(cat => 
        cat.title?.toLowerCase().includes(value.toLowerCase()) && 
        !categories.some(existingCat => existingCat.categoryId === cat.categoryId) // Don't suggest already added categories
      )
      .slice(0, 5) // Limit to 5 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  const handleSuggestionClick = (suggestion: Category) => {
    onAddCategory(suggestion)
    setIsAdding(false)
    setNewCategoryInput('')
    setShowSuggestions(false)
  }

  const handleAddCategory = () => {
    const trimmed = newCategoryInput.trim()
    if (trimmed && !categories.some(cat => cat.title === trimmed)) {
      // Create a new Category object
      const newCategory: Category = {
        categoryId: null,
        title: trimmed,
        recipeId: null
      }
      onAddCategory(newCategory)
      setIsAdding(false)
      setNewCategoryInput('')
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCategory()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setNewCategoryInput('')
      setShowSuggestions(false)
    }
  }

  const handleBlur = () => {
    // Small delay to allow suggestion clicks to register
    setTimeout(() => {
      setIsAdding(false)
      setNewCategoryInput('')
      setShowSuggestions(false)
    }, 150)
  }


  return (
    <div className={css.categoriesForm}>
      <div className={css.categoriesList}>
        {categories.map((category, index) => (
          <div key={index} className={css.categoryItem}>
            <button 
              className={css.removeButton}
              onClick={() => onRemoveCategory(index)}
              type="button"
              title="Remove category"
            >
              <AiOutlineClose />
            </button>
            <span className={css.categoryText}>
              {category.title || 'No title'}
            </span>
          </div>
        ))}
      </div>
      
      
    <div className={css.addCategoryButton} onClick={!isAdding ? handleAddClick : undefined}>
      <AiOutlinePlus className={css.plusIcon} onClick={handleAddCategory}/>
      {isAdding ? (
        <div className={css.addCategoryInput}>
          <input
            ref={inputRef}
            type="text"
            value={newCategoryInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Enter category..."
            id={css.categoryInput}
            className={css.categoryInput}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef} className={css.suggestions}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={css.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.title || 'No title'}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
      <span>Add Category</span>
      )}
    </div>
      
    </div>
  )
}

export default CategoriesForm
