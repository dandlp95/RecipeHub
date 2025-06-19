import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { authData, authFormType } from '../customTypes/enumTypes'
import { LoginData, PathParams, RegisterData, UserCreateDTO } from '../customTypes/requestTypes'
import AuthApiService from '../apiServices/implementations/AuthApiService'
import { PathParam } from 'react-router-dom'

/**
 * Handles input changes for login and register forms dynamically.
 * @param authDataType - The type of data being updated (e.g., userName, password, etc.).
 * @param setState - The state update function to call (e.g., setLoginData or setRegisterData).
 * @returns A change event handler function for input fields.
 */
export const handleData = (
  authDataType: authData,
  setState: React.Dispatch<SetStateAction<LoginData>> | React.Dispatch<SetStateAction<RegisterData>>
): ChangeEventHandler<HTMLInputElement> => {
  return e => {
    const value = e.target.value
    setState((prevData: any) => ({
      ...prevData,
      [authDataType]: value
    }))
  }
}

/**
 * Handles the sign-in process.
 * @param logindata - The login data containing username and password.
 * @param params - The path parameters for the API call.
 * @param setToken - Function to update the token state.
 */
export const signIn = (
  logindata: LoginData,
  params: any,
  setToken: React.Dispatch<React.SetStateAction<string>>
) => {
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

export const register = async (
  registerData: UserCreateDTO,
  params: PathParams,
  setToken: (token: string) => void
): Promise<void> => {
  try {
    const body: UserCreateDTO = registerData
    const response = await AuthApiService.postUser('users', params, body)
    if (response.result && response.token) {
      localStorage.setItem('username', response.result.userName)
      localStorage.setItem('userId', response.result.userId.toString())
      setToken(response.token)
    }
  } catch (err) {
    console.error(err)
    alert('Error registering')
  }
}
