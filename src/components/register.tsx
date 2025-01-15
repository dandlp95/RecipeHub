import React, { useEffect, ChangeEventHandler } from 'react'
import { authData, authFormType } from '../customTypes/enumTypes'
import WideButton from './wideButton'
import registerCSS from './styles/register.module.css'

type Props = {
  handleRegisterData: (
    authDataType: authData
  ) => ChangeEventHandler<HTMLInputElement>
  register: () => void
  loginSwitch: (formType: authFormType) => void
}

const RegisterForm: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className={registerCSS.registerMain}>
      <div className={registerCSS.formHeader}>
        <div className={registerCSS.headerIcon}>{'</>'}</div>
        <h3>Create your account</h3>
      </div>
      <div className={registerCSS.formMain}>
        <div className={registerCSS.registerUserName}>
          <label htmlFor='registerUserName'>Full Name</label>
          <input
            required
            type='text'
            name='registerUserName'
            id='registerUserName'
            placeholder='Enter your user name'
            onChange={props.handleRegisterData(authData.username)}
          />
        </div>
        <div className={registerCSS.registerEmail}>
          <label htmlFor='registerEmail'>Email address</label>
          <input
            required
            type='text'
            name='registerEmail'
            id='registerEmail'
            placeholder='Enter your email'
            onChange={props.handleRegisterData(authData.email)}
          />
        </div>
        <div className={registerCSS.registerPassword}>
          <label htmlFor='registerPassword'>Password</label>
          <input
            required
            type='text'
            name='registerPassword'
            id='registerPassword'
            placeholder='Enter password'
            onChange={props.handleRegisterData(authData.password)}
          />
        </div>
        <div className={registerCSS.registerConfirmPassword}>
          <label htmlFor='registerConfirmPassword'>Confirm password</label>
          <input
            required
            type='text'
            name='registerConfirmPassword'
            id='registerConfirmPassword'
            placeholder='Enter password'
            onChange={props.handleRegisterData(authData.confirmPassword)}
          />
        </div>
      </div>
      <div className={registerCSS.buttonSection}>
        <WideButton clickAction={props.register}>Sign Up</WideButton>
      </div>
      <div className={registerCSS.SignInSwitch}>
        <p>
          <span className={registerCSS.signIn1}>Already have an account? </span>
          <span
            className={registerCSS.signIn2}
            onClick={() => props.loginSwitch(authFormType.login)}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
