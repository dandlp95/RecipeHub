import React, { ReactNode } from 'react'
import { ButtonStyling } from '../customTypes/interfaces'
import ButtonCSS from './styles/button.module.css'

type Props = {
  children: ReactNode
  styles?: ButtonStyling
  action: () => void
}

const Button: React.FunctionComponent<Props> = ({
  children,
  action
}) => {

  const triggerAction = () => {
    action()
  }

  return (
    <button
      className={ButtonCSS.mainButton}
      onClick={triggerAction}
    >
      {children}
    </button>
  )
}

export default Button
