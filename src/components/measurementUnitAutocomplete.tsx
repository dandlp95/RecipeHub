import React, { useState, useRef, useEffect } from 'react'
import { MeasurementUnit } from '../customTypes/DTOs/recipeTypes'
import css from './styles/measurementUnitAutocomplete.module.css'

interface MeasurementUnitAutocompleteProps {
  measurementUnits: MeasurementUnit[]
  selectedUnitId: number
  onUnitSelect: (unitId: number) => void
  placeholder?: string
  className?: string
}

const MeasurementUnitAutocomplete: React.FC<MeasurementUnitAutocompleteProps> = ({
  measurementUnits,
  selectedUnitId,
  onUnitSelect,
  placeholder = "Select unit",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUnits, setFilteredUnits] = useState<MeasurementUnit[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  console.log(selectedUnitId)

  // Get the selected unit for display
  const selectedUnit = measurementUnits.find(unit => unit.measurementUnitId === selectedUnitId)

  // Filter units based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUnits(measurementUnits)
    } else {
      const filtered = measurementUnits.filter(unit =>
        unit.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUnits(filtered)
    }
    setHighlightedIndex(-1)
  }, [searchTerm, measurementUnits])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
    setSearchTerm(selectedUnit?.abbreviation || '')
  }

  // Handle input blur - only close if no selection is being made
  const handleInputBlur = () => {
    // Small delay to allow click events on dropdown items to fire
    setTimeout(() => {
      if (!isOpen) return
      setIsOpen(false)
      setSearchTerm(selectedUnit?.abbreviation || '')
    }, 150)
  }

  // Handle unit selection
  const handleUnitSelect = (unit: MeasurementUnit | null) => {
    onUnitSelect(unit?.measurementUnitId || 0)
    setSearchTerm(unit === null ? '' : unit?.abbreviation || '')
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
          prev < filteredUnits.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredUnits.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredUnits.length) {
          handleUnitSelect(filteredUnits[highlightedIndex])
        } else {
            handleUnitSelect(null)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchTerm( selectedUnit?.abbreviation || '')
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
            onUnitSelect(0)
        }
        setIsOpen(false)
        setSearchTerm(selectedUnit?.abbreviation || '')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchTerm, selectedUnit])

  return (
    <div className={`${css.autocompleteContainer}`}>
      <input
        ref={inputRef}
        type="text"
        value={isOpen ? searchTerm : (selectedUnit?.abbreviation || '')}
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
          {filteredUnits.length > 0 ? (
            filteredUnits.map((unit, index) => (
              <div
                key={unit.measurementUnitId}
                className={`${css.dropdownItem} ${
                  index === highlightedIndex ? css.highlighted : ''
                }`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleUnitSelect(unit)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className={css.abbreviation}>{unit.abbreviation}</span>
                {unit.name && (
                  <span className={css.fullName}>{unit.name}</span>
                )}
              </div>
            ))
          ) : (
            <div className={css.noResults}>No units found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default MeasurementUnitAutocomplete
