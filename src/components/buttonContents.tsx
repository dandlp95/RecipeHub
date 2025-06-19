import React from 'react'
import { IconContext } from 'react-icons'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'
import GroupPageCSS from '../pages/styles/groupPage.module.css'

export const AddRecipeContent = () => (
  <div className={GroupPageCSS.addRecipeContent}>
    <IconContext.Provider value={{ className: `${GroupPageCSS.addRecIcon}` }}>
      <AiOutlinePlus />
    </IconContext.Provider>
    <span>Add Recipe</span>
  </div>
)

export const CartButtonContent = () => (
  <div className={GroupPageCSS.cartButtonContent}>
    <IconContext.Provider value={{ className: `${GroupPageCSS.shoppingIcon}` }}>
      <FaShoppingCart />
    </IconContext.Provider>
    <span>Generate Shopping List</span>
  </div>
)
