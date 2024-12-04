import axios from 'axios'
import { baseUrl, header } from './config'

const healthcheckApi = axios.create({
  baseURL: `https://bandyresultat.se/healthcheck`,
  headers: header,
})

export const getHealthcheck = async (): Promise<{ message: string }> => {
  const response = await healthcheckApi.get('/')
  return response.data
}
