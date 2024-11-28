import axios from 'axios'
import { z } from 'zod'
import { login } from '../types/login'
import { baseUrl, header } from './config'

const loginApi = axios.create({
  baseURL: `${baseUrl}/api/login`,
  headers: header,
  withCredentials: true,
})

export const logout = async (): Promise<z.infer<typeof login>> => {
  const response = await loginApi.get('/logout')
  return response.data
}

export const getLogin = async (
  userName: string,
  password: string
): Promise<z.infer<typeof login>> => {
  const response = await loginApi.post('/', { userName, password })
  return response.data
}

export default loginApi
