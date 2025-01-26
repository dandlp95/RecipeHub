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
  styles = {},
  action
}) => {
  const { textColor = 'white', backgroundColor = 'black' } = styles

  const triggerAction = () => {
    action()
  }

  return (
    <button
      className={ButtonCSS.mainButton}
      style={{
        color: textColor,
        backgroundColor: backgroundColor
      }}
      onClick={triggerAction}
    >
      {children}
    </button>
  )
}

export default Button
