import { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { authData, authFormType } from '../customTypes/enumTypes'
import { LoginData, RegisterData } from '../customTypes/requestTypes'

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
