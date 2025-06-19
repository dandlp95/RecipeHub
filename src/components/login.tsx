import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authData, authFormType } from '../customTypes/enumTypes'
import WideButton from './wideButton'
import loginCSS from './styles/login.module.css'

type Props = {
  // Function to handle login data input changes
  handleLoginData: (
    authDataType: authData,
    formType: authFormType
  ) => ChangeEventHandler<HTMLInputElement>
  signIn: () => void
  isRememberChecked: (checked: boolean) => void
  registerLoginSwitch: (formType: authFormType) => void
}

const LoginForm: React.FunctionComponent<Props> = (props: Props) => {
  const [isRememberChecked, setIsRememberChecked] = useState(false)

  useEffect(() => {
    props.isRememberChecked(isRememberChecked)
  }, [isRememberChecked])

  return (
    <div className={loginCSS.formHeaderMain}>
      <div className={loginCSS.formHeader}>
        <div className={loginCSS.headerIcon}>{'</>'}</div>
        <h3>Welcome Back</h3>
        <p>Sign in to your account to continue</p>
      </div>
      <div className={loginCSS.inputFields}>
        <div className={loginCSS.loginUserName}>
          <label htmlFor='loginuserName'>Username</label>
          <input
            required
            type='text'
            name='loginuserName'
            id='loginuserName'
            placeholder='Enter your username'
            onChange={props.handleLoginData(
              authData.username,
              authFormType.login
            )}
          />
        </div>
        <div className={loginCSS.loginPassword}>
          <label htmlFor='loginPassword'>Password</label>
          <input
            required
            type='text'
            name='loginPassword'
            id='loginPassword'
            placeholder='Enter your password'
            onChange={props.handleLoginData(
              authData.password,
              authFormType.login
            )}
          />
        </div>
        <div className={loginCSS.rememberCheckbox}>
          <input
            id='rememberMe'
            type='checkbox'
            checked={isRememberChecked}
            onChange={e => {
              setIsRememberChecked(!isRememberChecked)
            }}
          />
          <label htmlFor='rememberMe'>Remember me</label>
        </div>
      </div>
      <div className={loginCSS.buttonSection}>
        <WideButton clickAction={props.signIn}>Sign In</WideButton>
      </div>
      <div className={loginCSS.signinAlt}>
        <div className={loginCSS.signUpContainer}>
          <p>
            <span className={loginCSS.question}>Don't have an account?</span>{' '}
            <span
              className={loginCSS.signUp}
              onClick={() => props.registerLoginSwitch(authFormType.register)}
            >
              Sign Up
            </span>
          </p>
        </div>
        {/*
          THIS SECTION WILL BE IMPLEMENTED LATER TO LOG IN THROUGH GOOGLE ACCOUNT
          <div className={loginCSS.altLogin}>

          </div> 
          */}
      </div>
    </div>
  )
}

export default LoginForm
