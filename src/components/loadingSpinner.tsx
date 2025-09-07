import React from 'react'
import css from './styles/loadingSpinner.module.css'


const LoadingSpinner: React.FC = () => {

  return (
    <div className={css.overlay}>
      <div className={css.spinnerContainer}>
        <div className={css.spinner}></div>
        <p className={css.message}>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
