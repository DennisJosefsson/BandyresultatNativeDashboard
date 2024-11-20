import axios from 'axios'
import { baseUrl, header } from './config'

const dashboardApi = axios.create({
  baseURL: `${baseUrl}/dashboard`,
  headers: header,
})

export const getDashboardCookieCheck = async (): Promise<{
  message: string
}> => {
  const response = await dashboardApi.get('/nativeCookie')
  return response.data
}
