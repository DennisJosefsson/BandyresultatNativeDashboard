import { useContext } from 'react'
import { UserContext } from '../contexts/contexts'

const useUserContext = () => {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error('No user context')
  }

  return userContext
}

export default useUserContext
