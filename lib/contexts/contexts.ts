import { createContext, Dispatch } from 'react'

export type GenderType = boolean
export type UserType = boolean

export type UserActionType = { type: 'LOGIN' } | { type: 'LOGOUT' }
export type GenderActionType =
  | { type: 'TOGGLE' }
  | { type: 'SET'; payload: boolean }

export const GenderContext = createContext<{
  womenContext: GenderType
  dispatch: Dispatch<GenderActionType>
} | null>(null)

export const UserContext = createContext<{
  user: UserType
  dispatch: Dispatch<UserActionType>
} | null>(null)
