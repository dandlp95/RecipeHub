import React, { useState } from 'react'
import css from './styles/formList.module.css'

type Props = {
  items: string[]
  onRemove: (index: number) => void
  onUpdate?: (index: number, newValue: string) => void
}

const FormList: React.FunctionComponent<Props> = ({ items, onRemove, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>('')

  const handleDoubleClick = (index: number, value: string) => {
    setEditingIndex(index)
    setEditValue(value)
  }

  const handleEditSave = (index: number) => {
    if (onUpdate && editValue.trim() !== '') {
      onUpdate(index, editValue.trim())
    }
    setEditingIndex(null)
    setEditValue('')
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setEditValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleEditSave(index)
    } else if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  return (
    <div className={css.formList}>
      {items.map((item, index) => (
        <div key={index} className={css.formListItem}>
          {editingIndex === index ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleEditSave(index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              className={css.editInput}
              autoFocus
            />
          ) : (
            <span 
              className={css.itemText}
              onDoubleClick={() => handleDoubleClick(index, item)}
            >
              {item}
            </span>
          )}
          <button 
            className={css.removeButton}
            onClick={() => onRemove(index)}
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default FormList
