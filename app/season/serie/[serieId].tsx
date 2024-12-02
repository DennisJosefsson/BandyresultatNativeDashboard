import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Text } from '@/components/ui/text'
import { getSeriesGames } from '@/lib/requests/dashboard'
import { game } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { z } from 'zod'

type GameProps = z.infer<typeof game>

const Game = ({ game }: { game: GameProps }) => {
  return (
    <View className="flex flex-row items-center justify-start gap-2">
      <View className="flex flex-row items-center justify-start gap-2">
        <Text className="w-16 text-[8px]">{game.date}</Text>
        <Text className="w-16 text-[8px] truncate">
          {game.homeTeam.casualName}
        </Text>
        <Text className="w-16 text-[8px] truncate">
          {game.awayTeam.casualName}
        </Text>
        <Text className="w-10 text-[8px]">
          {game.result}
        </Text>
        <Text className="w-10 text-[8px]">
          {game.halftimeResult}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-end">
        <Button size="xs">
          <Text>Ändra</Text>
        </Button>
      </View>
    </View>
  )
}

const SingleSerie = () => {
  const { serieId } = useLocalSearchParams<{
    serieId: string
  }>()
  const {
    data: games,
    isPending,
    error,
  } = useQuery({
    queryKey: ['games'],
    queryFn: () => getSeriesGames({ serieId }),
  })
  const [value, setValue] = useState('unplayed')

  if (error) {
    return (
      <Card>
        <Text className="text-lg font-semibold">
          {error.message}
        </Text>
      </Card>
    )
  }

  if (isPending) {
    return (
      <Card>
        <Text className="text-lg font-semibold">
          Laddar...
        </Text>
      </Card>
    )
  }

  if (games) {
    const unplayed = games.filter(
      (game) => game.played === false
    )
    const played = games.filter(
      (game) => game.played === true
    )

    return (
      <View className="p-2">
        <Tabs
          value={value}
          onValueChange={setValue}
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger
              value="unplayed"
              className="flex-1"
            >
              <Text>Ospelade matcher</Text>
            </TabsTrigger>
            <TabsTrigger
              value="played"
              className="flex-1"
            >
              <Text>Spelade matcher</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="unplayed">
            {unplayed.length === 0 ? (
              <View className="flex flex-row justify-center mt-10">
                <Text>Inga ospelade matcher</Text>
              </View>
            ) : null}
            {unplayed.length > 0 ? (
              <View className="flex flex-1">
                <ScrollView className="max-h-[480px]">
                  <View className="flex flex-col gap-2 p-2">
                    {unplayed.map((game) => {
                      return (
                        <Game
                          key={game.gameId}
                          game={game}
                        />
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            ) : null}
          </TabsContent>
          <TabsContent value="played">
            {played.length === 0 ? (
              <View className="flex flex-row justify-center mt-10">
                <Text>Inga spelade matcher</Text>
              </View>
            ) : null}
            {played.length > 0 ? (
              <View className="flex flex-1">
                <ScrollView className="max-h-[480px]">
                  <View className="flex flex-col gap-2 p-2">
                    {played.map((game) => {
                      return (
                        <Game
                          key={game.gameId}
                          game={game}
                        />
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            ) : null}
          </TabsContent>
        </Tabs>
      </View>
    )
  }
}

export default SingleSerie
