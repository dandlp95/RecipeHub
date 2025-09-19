import React, { useState, useRef, useEffect } from 'react'
import css from './styles/measurementUnitAutocomplete.module.css'

// Generic interface for objects that can be used in the autocomplete
interface AutocompleteItem {
  [key: string]: any // Allow any properties
  id: number
  name: string
  abbreviation: string
}

interface GenericAutocompleteProps<T extends AutocompleteItem> {
  items: T[]
  selectedItemId: number
  onItemSelect: (itemId: number) => void
  placeholder?: string
  className?: string
  idProperty?: string // Property name for the ID (e.g., 'measurementUnitId', 'timeUnitId')
  displayProperty?: string // Property name for display (e.g., 'abbreviation')
  nameProperty?: string // Property name for the full name (e.g., 'name')
  noResultsText?: string
}

const GenericAutocomplete = <T extends AutocompleteItem>({
  items,
  selectedItemId,
  onItemSelect,
  placeholder = "Select item",
  className,
  idProperty = 'id',
  displayProperty = 'abbreviation',
  nameProperty = 'name',
  noResultsText = "No items found"
}: GenericAutocompleteProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<T[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Get the selected item for display
  const selectedItem = items.find(item => item[idProperty] === selectedItemId)

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items)
    } else {
      const filtered = items.filter(item =>
        item[displayProperty]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item[nameProperty]?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredItems(filtered)
    }
    setHighlightedIndex(-1)
  }, [searchTerm, items, displayProperty, nameProperty])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
    setSearchTerm(selectedItem?.[displayProperty] || '')
  }

  // Handle input blur - only close if no selection is being made
  const handleInputBlur = () => {
    // Small delay to allow click events on dropdown items to fire
    setTimeout(() => {
      if (!isOpen) return
      setIsOpen(false)
      setSearchTerm(selectedItem?.[displayProperty] || '')
    }, 150)
  }

  // Handle item selection
  const handleItemSelect = (item: T | null) => {
    onItemSelect(item?.[idProperty] || 0)
    setSearchTerm(item === null ? '' : item?.[displayProperty] || '')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true)
        return
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredItems.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
          handleItemSelect(filteredItems[highlightedIndex])
        } else {
          handleItemSelect(null)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchTerm(selectedItem?.[displayProperty] || '')
        inputRef.current?.blur()
        break
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        if(searchTerm.trim() === '') {
          onItemSelect(0)
        }
        setIsOpen(false)
        setSearchTerm(selectedItem?.[displayProperty] || '')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchTerm, selectedItem, displayProperty, onItemSelect])

  return (
    <div className={`${css.autocompleteContainer} ${className || ''}`}>
      <input
        ref={inputRef}
        type="text"
        value={isOpen ? searchTerm : (selectedItem?.[displayProperty] || '')}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        id={css.editInput}
        className={`${css.editInput} ${css.unitSelect}`}
        autoComplete="off"
      />
      
      {isOpen && (
        <div ref={dropdownRef} className={css.dropdown}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item[idProperty]}
                className={`${css.dropdownItem} ${
                  index === highlightedIndex ? css.highlighted : ''
                }`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleItemSelect(item)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className={css.abbreviation}>{item[displayProperty]}</span>
                {item[nameProperty] && (
                  <span className={css.fullName}>{item[nameProperty]}</span>
                )}
              </div>
            ))
          ) : (
            <div className={css.noResults}>{noResultsText}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default GenericAutocomplete
