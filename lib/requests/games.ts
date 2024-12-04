import axios, { AxiosError } from 'axios'
import { baseUrl, header } from './config'
import { z } from 'zod'
import {singleGame } from '../types/dashboard'
import { getToken } from '../utils/tokens'

const gamesApi = axios.create({
  baseURL: `${baseUrl}/api/games`,
  withCredentials: true,
})

export const editGame = async ({
    formState,
  }: {
    formState: z.infer<typeof singleGame>
  }) => {

    const token = `Bearer ${await getToken()}`

    const response = await gamesApi.post('/', formState, {headers:{...header,auth:token}})
    if (response instanceof AxiosError) {
      return response
    }
    return response.data
  }