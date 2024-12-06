import { Button, SmallButton } from '@/components/ui/Button'
import { getSeriesGames } from '@/lib/requests/dashboard'
import { singleGame } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native'
import { z } from 'zod'

type GameProps = {
  homeTeam: string
  awayTeam: string
  date: string
  result: string
  halftimeResult: string
  gameId: number
}

const Game = (game: GameProps) => {
  return (
    <View style={styles.gameContainer}>
      <View style={styles.gameItems}>
        <Text style={{ ...styles.gameText, width: 55 }}>
          {game.date}
        </Text>
        <Text style={{ ...styles.gameText, width: 55 }}>
          {game.homeTeam}
        </Text>
        <Text style={{ ...styles.gameText, width: 55 }}>
          {game.awayTeam}
        </Text>
        <Text style={{ ...styles.gameText, width: 25 }}>
          {game.result}
        </Text>
        <Text style={{ ...styles.gameText, width: 25 }}>
          {game.halftimeResult}
        </Text>
      </View>
      <View style={styles.gameButton}>
        <Link
          asChild
          href={{
            pathname: '/season/serie/game/[gameId]',
            params: { gameId: game.gameId.toString() },
          }}
        >
          <SmallButton style={{ width: 80 }}>
            <Text>Ändra</Text>
          </SmallButton>
        </Link>
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
  const [value, setValue] = useState('played')

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{error.message}</Text>
      </View>
    )
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Laddar...</Text>
      </View>
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
      <View style={styles.container}>
        <View style={styles.tabButtons}>
          <Button onPress={() => setValue('played')}>
            <Text>Spelade</Text>
          </Button>
          <Button onPress={() => setValue('unplayed')}>
            <Text>Ospelade</Text>
          </Button>
        </View>
        <View style={styles.games}>
          {value === 'played' ? (
            <View style={{ flex: 1, flexGrow: 1, gap: 2 }}>
              {played.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Text style={styles.text}>
                    Inga spelade matcher
                  </Text>
                </View>
              ) : null}
              {played.length > 0 ? (
                <FlatList
                  data={played}
                  style={{ flexGrow: 1, gap: 2 }}
                  keyExtractor={(item) =>
                    item.gameId.toString()
                  }
                  renderItem={({ item }) => (
                    <Game
                      gameId={item.gameId}
                      homeTeam={item.homeTeam.casualName}
                      awayTeam={item.awayTeam.casualName}
                      date={item.date}
                      result={item.result ?? ''}
                      halftimeResult={
                        item.halftimeResult ?? ''
                      }
                    />
                  )}
                />
              ) : null}
            </View>
          ) : null}
          {value === 'unplayed' ? (
            <View style={{ flex: 1, flexGrow: 1 }}>
              {unplayed.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <Text style={styles.text}>
                    Inga ospelade matcher
                  </Text>
                </View>
              ) : null}
              {unplayed.length > 0 ? (
                <FlatList
                  data={unplayed}
                  keyExtractor={(item) =>
                    item.gameId.toString()
                  }
                  renderItem={({ item }) => (
                    <Game
                      gameId={item.gameId}
                      homeTeam={item.homeTeam.casualName}
                      awayTeam={item.awayTeam.casualName}
                      date={item.date}
                      result={item.result ?? ''}
                      halftimeResult={
                        item.halftimeResult ?? ''
                      }
                    />
                  )}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}

export default SingleSerie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: 'black',
    padding: 4,
    justifyContent: 'flex-start',
  },
  tabButtons: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    maxHeight: 40,
  },
  text: {
    color: 'white',
  },
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  gameItems: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  gameButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  gameText: {
    fontSize: 10,
    color: 'white',
  },
  games: {
    flex: 5,
    gap: 8,
  },
})
