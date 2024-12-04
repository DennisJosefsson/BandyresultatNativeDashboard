import axios from 'axios'
import { baseUrl, header } from './config'
import { z } from 'zod'
import { games, seasons, series, singleGame } from '../types/dashboard'

const dashboardApi = axios.create({
  baseURL: `${baseUrl}/api/dashboard`,
  headers: header,
})

export const getDashboardCookieCheck = async (): Promise<{
  message: string
}> => {
  const response = await dashboardApi.get('/nativeCookie')
  return response.data
}

export const getSeasons = async ():Promise<z.infer<typeof seasons>>=> {
  const response = await dashboardApi.get('/native/seasons')
  return response.data
}

export const getSeries = async ({seasonId}:{seasonId:string}):Promise<z.infer<typeof series>>=> {
  const response = await dashboardApi.get(`/native/season/${seasonId}`)
  return response.data
}

export const getSeriesGames = async ({serieId}:{serieId:string}):Promise<z.infer<typeof games>> => {
  const response = await dashboardApi.get(`/native/serie/${serieId}`)
  return response.data
}

export const getSingleGame = async ({gameId}:{gameId:string}):Promise<z.infer<typeof singleGame>> => {
  const response = await dashboardApi.get(`/native/game/${gameId}`)
  return response.data
}