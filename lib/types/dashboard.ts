import {z} from 'zod'

export const season = z.object({year:z.string(),women:z.boolean(),seasonId:z.number()})

export const seasons = z.array(season)

export const serie = z.object({serieId:z.number(),serieName:z.string()})

export const series = z.array(serie)

export const game = z.object({
    gameId:z.number(),
    date:z.string(),
    result:z.string(),
    halftimeResult:z.string(),
    played:z.boolean(),
    homeTeamId:z.number(),
    homeTeam:z.object({casualName:z.string()}),
    awayTeamId:z.number(),
    awayTeam:z.object({casualName:z.string()}),
})

export const games = z.array(game)