import React from 'react'
import { TimeUnit } from '../customTypes/DTOs/recipeTypes'
import GenericAutocomplete from './genericAutocomplete'

interface TimeUnitAutocompleteProps {
  timeUnits: TimeUnit[]
  selectedUnitId: number
  onUnitSelect: (unitId: number) => void
  placeholder?: string
  className?: string
}

// Transform TimeUnit to match the generic interface
type TimeUnitForAutocomplete = TimeUnit & {
  id: number
}

const TimeUnitAutocomplete: React.FC<TimeUnitAutocompleteProps> = ({
  timeUnits,
  selectedUnitId,
  onUnitSelect,
  placeholder = "Select time unit",
  className
}) => {
  // Transform the time units to include the generic 'id' property
  const transformedUnits: TimeUnitForAutocomplete[] = timeUnits.map(unit => ({
    ...unit,
    id: unit.timeUnitId
  }))

  return (
    <GenericAutocomplete
      items={transformedUnits}
      selectedItemId={selectedUnitId}
      onItemSelect={onUnitSelect}
      placeholder={placeholder}
      className={className}
      idProperty="timeUnitId"
      displayProperty="abbreviation"
      nameProperty="name"
      noResultsText="No time units found"
    />
  )
}

export default TimeUnitAutocomplete
