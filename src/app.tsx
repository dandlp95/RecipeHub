import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appCSS from './app.module.css'
import {
  LoginData,
  PathParams,
  RegisterData
} from './customTypes/DTOs/requestTypes'
import FormContainer from './components/formContainer1'
import { authData } from './customTypes/enumTypes'
import LoginForm from './components/login'
import RegisterForm from './components/register'
import { authFormType } from './customTypes/enumTypes'
import { handleData as handleDataUtil, signIn as signInUtil, register as registerUtil } from './utils/formHandlers'
import { handleTokenEffect } from './utils/effectHandlers'

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
    handleTokenEffect(token, navigate)
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
    signInUtil(logindata, params, setToken)
  }

  const registerLoginSwitch = (formType: authFormType) => setFormType(formType)

  const rememberCheckbox = (isChecked: boolean) => {
    setIsRememberChecked(isChecked)
  }

  //REGISTER FUNCTIONS
  const register = () => {
    registerUtil(registerData, params, setToken)
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
