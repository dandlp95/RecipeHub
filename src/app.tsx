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

const params: PathParams = {}

const App: React.FunctionComponent = () => {
  const [logindata, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  })
  const [token, setToken] = useState<string>('')
  const [isRememberChecked, setIsRememberChecked] = useState(false)
  const [formType, setFormType] = useState<authFormType>(authFormType.login)
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

  // SIGN IN FUNCTION
  const handleData = (
    authDataType: authData,
    formType: authFormType
  ): ChangeEventHandler<HTMLInputElement> => {
    const setStateFunctions = {
      [authFormType.login]: setLoginData,
      [authFormType.register]: setRegisterData
    }

    return e => {
      let setState = setStateFunctions[formType]
      let value = e.target.value

      setState((prevData: any) => ({
        ...prevData,
        [authDataType]: value
      }))
    }
  }

  const signIn = () => {}

  const registerLoginSwitch = (formType: authFormType) => setFormType(formType)

  const rememberCheckbox = (isChecked: boolean) => {
    setIsRememberChecked(isChecked)
  }

  //REGISTER FUNCTIONS
  const register = () => {
    try {
      const bodyRequest: UserCreateDTO = registerData
      AuthApiService.postUser('users', params, bodyRequest).then(response => {
        if (response.result && response.token) {
          localStorage.setItem('username', response.result.username)
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
