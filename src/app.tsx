import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appCSS from './app.module.css'
import { LoginData, RegisterData } from './customTypes/requestTypes'
import FormContainer from './components/formContainer1'
import WideButton from './components/wideButton'
import { authData } from './customTypes/enumTypes'
import LoginForm from './components/login'

const App: React.FunctionComponent = () => {
  const [logindata, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    password: '',
    email: '',
    passwordConfirm: ''
  })
  const [token, setToken] = useState<string>('')
  const [isRememberChecked, setIsRememberChecked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const browserToken = localStorage.getItem('token')
    if (browserToken) {
      navigate('/jobs')
    } else if (token) {
      localStorage.setItem('token', token)
      navigate('/jobs')
    }
  }, [token])

  /*FORM INPUT FIELDS FUNCTIONS*/
  const handleLogin = (
    authDataType: authData
  ): ChangeEventHandler<HTMLInputElement> => {
    return e => {
      switch (authDataType) {
        case authData.username:
          setLoginData({ ...logindata, username: e.target.value })
        case authData.password:
          setLoginData({ ...logindata, password: e.target.value })
      }
    }
  }

  const signIn = () => {}

  return (
    <div className={appCSS.appCSS}>
      <FormContainer>
        <div>
          <div className={appCSS.formHeader}>
            <div className={appCSS.headerIcon}>{'</>'}</div>
            <h3>Welcome Back</h3>
            <p>Sign in to your account to continue</p>
          </div>
          <div className={appCSS.inputFields}>
            <div className={appCSS.loginUserName}>
              <label htmlFor='loginuserName'>Username: </label>
              <input
                required
                type='text'
                name='loginuserName'
                id='loginuserName'
                placeholder='Enter your username'
                onChange={handleLogin(authData.username)}
              />
            </div>
            <div className={appCSS.loginPassword}>
              <label htmlFor='loginPassword'>Password: </label>
              <input
                required
                type='text'
                name='loginPassword'
                id='loginPassword'
                placeholder='Enter your password'
                onChange={handleLogin(authData.password)}
              />
            </div>
            <div className={appCSS.rememberCheckbox}>
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
          <div className={appCSS.buttonSection}>
            <WideButton clickAction={signIn}>Sign In</WideButton>
          </div>
          <div className={appCSS.signinAlt}>
            <div className={appCSS.signUpContainer}>
              <p>
                Don't have an account?{' '}
                <span className={appCSS.signUp}>Sign Up</span>
              </p>
            </div>
            {/*
            THIS SECTION WILL BE IMPLEMENTED LATER TO LOG IN THROUGH GOOGLE ACCOUNT
            <div className={appCSS.altLogin}>

            </div> 
            */}
          </div>
        </div>
      </FormContainer>
    </div>
  )
}

export default App
