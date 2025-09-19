// import React, { useState } from 'react'
// import { MeasurementUnit, TimeUnit } from '../customTypes/DTOs/recipeTypes'
// import MeasurementUnitAutocomplete from './measurementUnitAutocomplete'
// import TimeUnitAutocomplete from './timeUnitAutocomplete'

// // Example component demonstrating how to use both autocomplete components
// const AutocompleteExample: React.FC = () => {
//   const [selectedMeasurementUnitId, setSelectedMeasurementUnitId] = useState<number>(0)
//   const [selectedTimeUnitId, setSelectedTimeUnitId] = useState<number>(0)

//   // Example data - in real usage, these would come from API calls
//   const measurementUnits: MeasurementUnit[] = [
//     { measurementUnitId: 1, name: 'Cup', abbreviation: 'cup' },
//     { measurementUnitId: 2, name: 'Tablespoon', abbreviation: 'tbsp' },
//     { measurementUnitId: 3, name: 'Teaspoon', abbreviation: 'tsp' },
//     { measurementUnitId: 4, name: 'Pound', abbreviation: 'lb' },
//     { measurementUnitId: 5, name: 'Ounce', abbreviation: 'oz' }
//   ]

//   const timeUnits: TimeUnit[] = [
//     { timeUnitId: 1, name: 'Minutes', abbreviation: 'min' },
//     { timeUnitId: 2, name: 'Hours', abbreviation: 'hr' },
//     { timeUnitId: 3, name: 'Days', abbreviation: 'days' },
//     { timeUnitId: 4, name: 'Seconds', abbreviation: 'sec' }
//   ]

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px' }}>
//       <h3>Autocomplete Components Example</h3>
      
//       <div style={{ marginBottom: '20px' }}>
//         <label>Measurement Unit:</label>
//         <MeasurementUnitAutocomplete
//           measurementUnits={measurementUnits}
//           selectedUnitId={selectedMeasurementUnitId}
//           onUnitSelect={setSelectedMeasurementUnitId}
//           placeholder="Select measurement unit"
//         />
//         <p>Selected ID: {selectedMeasurementUnitId}</p>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label>Time Unit:</label>
//         <TimeUnitAutocomplete
//           timeUnits={timeUnits}
//           selectedUnitId={selectedTimeUnitId}
//           onUnitSelect={setSelectedTimeUnitId}
//           placeholder="Select time unit"
//         />
//         <p>Selected ID: {selectedTimeUnitId}</p>
//       </div>
//     </div>
//   )
// }

// export default AutocompleteExample
