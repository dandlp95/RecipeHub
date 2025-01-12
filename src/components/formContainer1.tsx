import React, { useState, ReactNode } from 'react'
// import formContainerCSS from './styles/formContainer1.module.css'

type Props = {
  children: ReactNode
}

const FormContainer1: React.FunctionComponent<Props> = (props:Props) => {
  return (
    <div>
        {props.children}
    </div>
)
}

export default FormContainer1
