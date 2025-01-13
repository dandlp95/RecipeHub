import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appCSS from './app.module.css'
import { LoginData, RegisterData } from './customTypes/requestTypes'
import FormContainer from './components/formContainer1'
import WideButton from './components/wideButton'

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
                onChange={e => {
                  setLoginData({ ...logindata, username: e.target.value })
                }}
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
          <div>
            
          </div>
        </div>
      </FormContainer>
    </div>
  )
}

export default App
