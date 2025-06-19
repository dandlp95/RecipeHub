import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { PathParam, useNavigate } from 'react-router-dom'
import appCSS from './app.module.css'
import {
  LoginData,
  PathParams,
  RegisterData,
  UserCreateDTO
} from './customTypes/requestTypes'
import FormContainer from './components/formContainer1'
import { authData } from './customTypes/enumTypes'
import LoginForm from './components/login'
import RegisterForm from './components/register'
import { authFormType } from './customTypes/enumTypes'
import AuthApiService from './apiServices/implementations/AuthApiService'
import { handleData as handleDataUtil } from './utils/formHandlers'

const params: PathParams = {}

const App: React.FunctionComponent = () => {
  const [logindata, setLoginData] = useState<LoginData>({
    userName: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState<RegisterData>({
    userName: '',
    password: '',
    emailAddress: '',
    confirmPassword: ''
  })
  const [token, setToken] = useState<string>('')
  const [isRememberChecked, setIsRememberChecked] = useState(false)
  const [formType, setFormType] = useState<authFormType>(authFormType.login)
  const navigate = useNavigate()

  useEffect(() => {
    const browserToken = localStorage.getItem('token')

    if (browserToken || token) {
      if (!browserToken) {
        localStorage.setItem('token', token)
      }
      navigate('/home')
    }
  }, [token])


  /**
   * Handles input changes for login and register forms dynamically.
   * @param authDataType - The type of data being updated (e.g., userName, password, etc.).
   * @param formType - The type of form (login or register) to determine which state to update.
   * @returns A change event handler function for input fields.
   */
  const handleData = (
    authDataType: authData,
    formType: authFormType
  ): ChangeEventHandler<HTMLInputElement> => {
    const setStateFunctions = {
      [authFormType.login]: setLoginData,
      [authFormType.register]: setRegisterData
    }

    // Pass the appropriate state update function to the utility
    return handleDataUtil(authDataType, setStateFunctions[formType])
  }

  const signIn = () => {
    try {
      const body: LoginData = logindata

      AuthApiService.auth('/users', params, body).then(response => {
        if (response.result && response.token) {
          localStorage.setItem('username', response.result.userName)
          localStorage.setItem('userId', response.result.userId.toString())
          setToken(response.token)
        }
      })
    } catch (err) {
      console.error(err)
      alert('Error logging in')
    }
  }

  const registerLoginSwitch = (formType: authFormType) => setFormType(formType)

  const rememberCheckbox = (isChecked: boolean) => {
    setIsRememberChecked(isChecked)
  }

  //REGISTER FUNCTIONS
  const register = () => {
    try {
      const body: UserCreateDTO = registerData
      // console.log('Body:',body)
      AuthApiService.postUser('users', params, body).then(response => {
        if (response.result && response.token) {
          localStorage.setItem('username', response.result.userName)
          localStorage.setItem('userId', response.result.userId.toString())
          setToken(response.token)
        }
      })
    } catch (err) {
      console.error(err)
      alert('Error registering')
    }
  }

  return (
    <div className={appCSS.appCSS}>
      <FormContainer>
        {formType === authFormType.login ? (
          <LoginForm
            handleLoginData={handleData}
            signIn={signIn}
            isRememberChecked={rememberCheckbox}
            registerLoginSwitch={registerLoginSwitch}
          />
        ) : (
          <RegisterForm
            handleRegisterData={handleData}
            register={register}
            loginSwitch={registerLoginSwitch}
          />
        )}
      </FormContainer>
    </div>
  )
}

export default App
