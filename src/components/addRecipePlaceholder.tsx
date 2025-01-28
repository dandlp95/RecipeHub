import React from 'react'
import css from './styles/addRecipePlaceholder.module.css'
import { IconContext } from 'react-icons'
import { FaPlus } from "react-icons/fa";

type Props = {}

const AddRecipePlaceholder: React.FunctionComponent<Props> = () => {
  return (
    <div className={css.placeholderMain}>
      <div className={css.placeholderContent}>
        <div className={css.plusIconContainer}>
          <IconContext.Provider value={{ className: `${css.plusIcon}` }}>
            <FaPlus />
          </IconContext.Provider>
        </div>
        <p>Add New Recipe</p>
      </div>
    </div>
  )
}

export default AddRecipePlaceholder
