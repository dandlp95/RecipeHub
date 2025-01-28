import React from 'react'
import RecipePreviewCSS from './styles/recipePreview.module.css'
import { FaImage } from "react-icons/fa6";
import { CiClock2 } from 'react-icons/ci'
import { FaUtensils } from 'react-icons/fa'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import { IconContext } from 'react-icons'

type Props = {}

const RecipePreview: React.FunctionComponent<Props> = () => {
  return (
    <div className={RecipePreviewCSS.recipePreviewMain}>
      <div className={RecipePreviewCSS.recipeImage}>
        {/* Add a condition here to display the following icon if the recipe has no image. */}
        <IconContext.Provider
          value={{ className: `${RecipePreviewCSS.imageIcon}` }}
        >
          <FaImage />
        </IconContext.Provider>
      </div>
      <div className={RecipePreviewCSS.recipeInfo}>
        <h3>Spagetti Carbonara</h3>
        <div className={RecipePreviewCSS.recipeBottom}>
          <div className={RecipePreviewCSS.recipeTime}>
            <IconContext.Provider
              value={{ className: `${RecipePreviewCSS.clockIcon}` }}
            >
              <CiClock2 />
            </IconContext.Provider>

            <span>30 min</span>
          </div>
          <div className={RecipePreviewCSS.recipeServings}>
            <IconContext.Provider
              value={{ className: `${RecipePreviewCSS.utensilsIcon}` }}
            >
              <FaUtensils />
            </IconContext.Provider>

            <span>4 servings</span>
          </div>
        </div>
        <div className={RecipePreviewCSS.recipeIcons}>
          <IconContext.Provider
            value={{ className: `${RecipePreviewCSS.editIcon}` }}
          >
            <MdModeEdit />
          </IconContext.Provider>

          <IconContext.Provider
            value={{ className: `${RecipePreviewCSS.deleteIcon}` }}
          >
            <MdDelete />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default RecipePreview
