import React, { useState } from 'react'
import css from './styles/formListOrdered.module.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

type Props = {
  items: string[]
  onRemove: (index: number) => void
  onUpdate?: (index: number, newValue: string) => void
  onReorder?: (newOrder: string[]) => void
}

const FormListOrdered: React.FunctionComponent<Props> = ({ items, onRemove, onUpdate, onReorder }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

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

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const newItems = [...items]
    const [draggedItem] = newItems.splice(draggedIndex, 1)
    newItems.splice(dropIndex, 0, draggedItem)

    if (onReorder) {
      onReorder(newItems)
    }
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className={css.formListOrdered}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`${css.formListItemOrdered} ${draggedIndex === index ? css.dragging : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          <div className={css.stepNumber}>{index + 1}</div>
          <div className={css.itemContent}>
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
          </div>
          <button 
            className={css.removeButton}
            onClick={() => onRemove(index)}
            type="button"
            title="Remove step"
          >
            <AiOutlineMinus />
          </button>
        </div>
      ))}
    </div>
  )
}

export default FormListOrdered
