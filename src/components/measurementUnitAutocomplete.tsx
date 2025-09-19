import React from 'react'
import { MeasurementUnit } from '../customTypes/DTOs/recipeTypes'
import GenericAutocomplete from './genericAutocomplete'

interface MeasurementUnitAutocompleteProps {
  measurementUnits: MeasurementUnit[]
  selectedUnitId: number
  onUnitSelect: (unitId: number) => void
  placeholder?: string
  className?: string
}

// Transform MeasurementUnit to match the generic interface
type MeasurementUnitForAutocomplete = MeasurementUnit & {
  id: number
}

const MeasurementUnitAutocomplete: React.FC<MeasurementUnitAutocompleteProps> = ({
  measurementUnits,
  selectedUnitId,
  onUnitSelect,
  placeholder = "Select unit",
  className
}) => {
  // Transform the measurement units to include the generic 'id' property
  const transformedUnits: MeasurementUnitForAutocomplete[] = measurementUnits.map(unit => ({
    ...unit,
    id: unit.measurementUnitId
  }))

  return (
    <GenericAutocomplete
      items={transformedUnits}
      selectedItemId={selectedUnitId}
      onItemSelect={onUnitSelect}
      placeholder={placeholder}
      className={className}
      idProperty="measurementUnitId"
      displayProperty="abbreviation"
      nameProperty="name"
      noResultsText="No units found"
    />
  )
}

export default MeasurementUnitAutocomplete