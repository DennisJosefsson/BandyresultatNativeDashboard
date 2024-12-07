import { z } from 'zod'

export const season = z.object({
  year: z.string(),
  women: z.boolean(),
  seasonId: z.number(),
})

export const seasons = z.array(season)

export const serie = z.object({
  serieId: z.number(),
  serieName: z.string(),
})

export const series = z.array(serie)

export const singleGame = z.object({
  gameId: z.number(),
  serieId: z.number(),
  seasonId: z.number(),
  date: z.string(),
  result: z.string().nullable(),
  halftimeResult: z.string().nullable(),
  category: z.string(),
  group: z.string(),
  homeGoal: z.number().nullable(),
  awayGoal: z.number().nullable(),
  halftimeHomeGoal: z.number().nullable(),
  halftimeAwayGoal: z.number().nullable(),
  played: z.boolean(),
  homeTeamId: z.number(),
  homeTeam: z.object({
    shortName: z.string(),
    casualName: z.string(),
  }),
  awayTeamId: z.number(),
  awayTeam: z.object({
    shortName: z.string(),
    casualName: z.string(),
  }),
  playoff: z.boolean(),
  extraTime: z.boolean(),
  penalties: z.boolean(),
  mix: z.boolean(),
})

export const games = z.array(singleGame)
