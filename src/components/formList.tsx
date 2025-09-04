import React, { useState } from 'react'
import css from './styles/formList.module.css'
import { AiOutlineMinus } from 'react-icons/ai'
import { MeasurementUnit, RecipeIngredientDTO } from '../customTypes/DTOs/recipeTypes'

type Props = {
  items: RecipeIngredientDTO[]
  onRemove: (index: number) => void
  onUpdateName?: (index: number, newValue: string) => void
  onUpdateQuantity?: (index: number, newValue: number) => void
  onUpdateMeasurementUnit?: (index: number, newValue: number) => void
  measurementUnits?: Array<MeasurementUnit>
}

const FormList: React.FunctionComponent<Props> = ({ 
  items, 
  onRemove, 
  onUpdateName, 
  onUpdateQuantity, 
  onUpdateMeasurementUnit,
  measurementUnits = []
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<{name: string, quantity: string, unit: string}>({name: '', quantity: '', unit: ''})
  const [isEditing, setIsEditing] = useState(false)

  const handleDoubleClick = (index: number, item: RecipeIngredientDTO) => {
    setEditingIndex(index)
    setIsEditing(true)
    setEditValues({
      name: item.ingredientName || '',
      quantity: (item.quantityNumber || 0).toString(),
      unit: (item.measurementUnitId || 0).toString()
    })
  }


  const handleEditSave = (index: number) => {
    // Save all three fields
    if (onUpdateName && editValues.name.trim() !== '') {
      onUpdateName(index, editValues.name.trim())
    }
    if (onUpdateQuantity) {
      const numValue = parseFloat(editValues.quantity)
      if (!isNaN(numValue)) {
        onUpdateQuantity(index, numValue)
      }
    }
    if (onUpdateMeasurementUnit) {
      const unitId = parseInt(editValues.unit)
      if (!isNaN(unitId)) {
        onUpdateMeasurementUnit(index, unitId)
      }
    }
    setEditingIndex(null)
    setIsEditing(false)
    setEditValues({name: '', quantity: '', unit: ''})
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setIsEditing(false)
    setEditValues({name: '', quantity: '', unit: ''})
  }

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleEditSave(index)
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  const getMeasurementUnitAbbreviation = (unitId: number | null) => {
    if (!unitId) return ''
    const unit = measurementUnits.find(u => u.measurementUnitId === unitId)
    return unit ? unit.abbreviation : ''
  }

  return (
    <div className={css.formList}>
      {items.map((item, index) => (
        <div key={index} className={css.formListItem}>
          {editingIndex === index ? (
            // Edit mode: Show all three input fields inline
            <div 
              className={css.ingredientFields}
              onBlur={(e) => {
                // Only save if the blur event is not moving to another input in the same group
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setTimeout(() => handleEditSave(index), 100)
                }
              }}
            >
              <input
                type="text"
                value={editValues.name}
                onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className={`${css.editInput} ${css.ingredientNameInput}`}
                placeholder="Ingredient name"
                autoFocus
              />
              <input
                type="number"
                step="0.01"
                value={editValues.quantity}
                onChange={(e) => setEditValues({...editValues, quantity: e.target.value})}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className={`${css.editInput} ${css.quantityInput}`}
                placeholder="Amount"
              />
              <select
                value={editValues.unit}
                onChange={(e) => setEditValues({...editValues, unit: e.target.value})}
                onKeyDown={(e) => handleKeyPress(e, index)}
                className={`${css.editInput} ${css.unitSelect}`}
              >
                <option value="">Select unit</option>
                {measurementUnits.map(unit => (
                  <option key={unit.measurementUnitId} value={unit.measurementUnitId}>
                    {unit.abbreviation}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Display mode: Show natural text format
            <span 
              className={css.itemText}
              onDoubleClick={() => handleDoubleClick(index, item)}
            >
              {`${item.ingredientName || 'No name'} ${item.quantityNumber || 0} ${getMeasurementUnitAbbreviation(item.measurementUnitId)}`}
            </span>
          )}

          <button 
            className={css.removeButton}
            onClick={() => onRemove(index)}
            type="button"
            title="Remove ingredient"
          >
            <AiOutlineMinus />
          </button>
        </div>
      ))}
    </div>
  )
}

export default FormList
