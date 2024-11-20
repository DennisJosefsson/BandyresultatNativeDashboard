import { ReactNode, useReducer } from 'react'
import { UserActionType, UserContext, UserType } from './contexts'

const userReducer = (state: UserType, action: UserActionType) => {
  switch (action.type) {
    case 'LOGIN':
      return (state = true)
    case 'LOGOUT':
      return (state = false)
    default:
      return state
  }
}

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, false)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
