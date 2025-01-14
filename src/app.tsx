import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appCSS from './app.module.css'
import { LoginData, RegisterData } from './customTypes/requestTypes'
import FormContainer from './components/formContainer1'
import { authData } from './customTypes/enumTypes'
import LoginForm from './components/login'
import { authFormType } from './customTypes/enumTypes'


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
  const [formType, setFormType] = useState<authFormType>(authFormType.login )
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

  const rememberCheckbox = (isChecked: boolean) => {
    setIsRememberChecked(isChecked)
  }

  return (
    <div className={appCSS.appCSS}>
      <FormContainer>
        <LoginForm
          handleLogin={handleLogin}
          signIn={signIn}
          isRememberChecked={rememberCheckbox}
        />
      </FormContainer>
    </div>
  )
}

export default App
