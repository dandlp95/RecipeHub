import React, { useState, useRef, useEffect } from 'react'
import css from './styles/customDropdown.module.css'

export interface DropdownOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
  required?: boolean
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  id,
  name,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Get the selected option for display
  const selectedOption = options.find(option => option.value === value)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleOptionSelect(options[highlightedIndex])
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          )
        }
        break
      case 'Escape':
        setIsOpen(false)
        setHighlightedIndex(-1)
        triggerRef.current?.focus()
        break
    }
  }

  // Handle option selection
  const handleOptionSelect = (option: DropdownOption) => {
    if (option.disabled) return
    
    onChange(option.value)
    setIsOpen(false)
    setHighlightedIndex(-1)
    triggerRef.current?.focus()
  }

  // Handle trigger click
  const handleTriggerClick = () => {
    if (disabled) return
    setIsOpen(!isOpen)
    setHighlightedIndex(-1)
  }

  // Handle trigger blur
  const handleTriggerBlur = () => {
    // Small delay to allow option clicks to fire
    setTimeout(() => {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }, 150)
  }

  return (
    <div className={`${css.dropdownContainer} ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        name={name}
        className={`${css.dropdownTrigger} ${isOpen ? css.open : ''} ${disabled ? css.disabled : ''}`}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        onBlur={handleTriggerBlur}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
      >
        <span className={css.triggerText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${css.arrow} ${isOpen ? css.arrowOpen : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={css.dropdownList} role="listbox">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={option.value}
                className={`${css.dropdownOption} ${
                  index === highlightedIndex ? css.highlighted : ''
                } ${option.disabled ? css.disabled : ''}`}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className={css.noOptions}>No options available</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
