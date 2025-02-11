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
  const {
    textColor = 'white',
    backgroundColor = 'black',
    fontSize = '1.3rem',
    fontWeight = 'normal'
  } = styles

  const triggerAction = () => {
    action()
  }

  return (
    <button
      className={ButtonCSS.mainButton}
      style={{
        color: textColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        fontWeight: fontWeight
      }}
      onClick={triggerAction}
    >
      {children}
    </button>
  )
}

export default Button
