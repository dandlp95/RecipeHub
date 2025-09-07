import React from 'react'
import css from './styles/loadingSpinner.module.css'

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className={css.overlay}>
      <div className={css.spinnerContainer}>
        <div className={css.spinner}></div>
        <p className={css.message}>{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
