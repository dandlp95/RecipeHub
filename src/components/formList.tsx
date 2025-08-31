import React, { useState } from 'react'
import css from './styles/formList.module.css'
import { AiOutlineMinus } from 'react-icons/ai'
import { RecipeIngredientDTO } from '../customTypes/DTOs/recipeTypes'

type Props = {
  items: RecipeIngredientDTO[]
  onRemove: (index: number) => void
  onUpdateName?: (index: number, newValue: string) => void
  onUpdateQuantity?: (index: number, newValue: number) => void
  onUpdateMeasurementUnit?: (index: number, newValue: number) => void
  measurementUnits?: Array<{ MeasurementUnitId: number, Abbreviation: string }>
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
  const [editingField, setEditingField] = useState<'name' | 'quantity' | 'unit' | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  const handleDoubleClick = (index: number, field: 'name' | 'quantity' | 'unit', value: string) => {
    setEditingIndex(index)
    setEditingField(field)
    setEditValue(value)
  }

  const handleEditSave = (index: number) => {
    if (editValue.trim() !== '') {
      if (editingField === 'name' && onUpdateName) {
        onUpdateName(index, editValue.trim())
      } else if (editingField === 'quantity' && onUpdateQuantity) {
        const numValue = parseFloat(editValue)
        if (!isNaN(numValue)) {
          onUpdateQuantity(index, numValue)
        }
      } else if (editingField === 'unit' && onUpdateMeasurementUnit) {
        const unitId = parseInt(editValue)
        if (!isNaN(unitId)) {
          onUpdateMeasurementUnit(index, unitId)
        }
      }
    }
    setEditingIndex(null)
    setEditingField(null)
    setEditValue('')
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setEditingField(null)
    setEditValue('')
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
    const unit = measurementUnits.find(u => u.MeasurementUnitId === unitId)
    return unit ? unit.Abbreviation : ''
  }

  return (
    <div className={css.formList}>
      {items.map((item, index) => (
        <div key={index} className={css.formListItem}>
          <div className={css.ingredientFields}>
            {/* Ingredient Name */}
            <div className={css.fieldContainer}>
              {editingIndex === index && editingField === 'name' ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSave(index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className={css.editInput}
                  placeholder="Ingredient name"
                  autoFocus
                />
              ) : (
                <span 
                  className={css.itemText}
                  onDoubleClick={() => handleDoubleClick(index, 'name', item.ingredientName || '')}
                >
                  {item.ingredientName || 'No name'}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className={css.fieldContainer}>
              {editingIndex === index && editingField === 'quantity' ? (
                <input
                  type="number"
                  step="0.01"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSave(index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className={css.editInput}
                  placeholder="Amount"
                  autoFocus
                />
              ) : (
                <span 
                  className={css.itemText}
                  onDoubleClick={() => handleDoubleClick(index, 'quantity', (item.quantityNumber || 0).toString())}
                >
                  {item.quantityNumber || 0}
                </span>
              )}
            </div>

            {/* Measurement Unit */}
            <div className={css.fieldContainer}>
              {editingIndex === index && editingField === 'unit' ? (
                <select
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditSave(index)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className={css.editInput}
                  autoFocus
                >
                  <option value="">Select unit</option>
                  {measurementUnits.map(unit => (
                    <option key={unit.MeasurementUnitId} value={unit.MeasurementUnitId}>
                      {unit.Abbreviation}
                    </option>
                  ))}
                </select>
              ) : (
                <span 
                  className={css.itemText}
                  onDoubleClick={() => handleDoubleClick(index, 'unit', (item.measurementUnitId || 0).toString())}
                >
                  {getMeasurementUnitAbbreviation(item.measurementUnitId)}
                </span>
              )}
            </div>
          </div>

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
