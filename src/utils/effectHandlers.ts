import { NavigateFunction } from 'react-router-dom'

/**
 * Handles token-related logic and navigation.
 * @param token - The current token state.
 * @param navigate - The navigation function from react-router-dom.
 */
export const handleTokenEffect = (token: string, navigate: NavigateFunction) => {
  const browserToken = localStorage.getItem('token')

  if (browserToken || token) {
    if (!browserToken) {
      localStorage.setItem('token', token)
    }
    navigate('/home')
  }
}
