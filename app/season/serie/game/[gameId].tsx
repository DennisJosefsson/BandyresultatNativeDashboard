import { getSingleGame } from '@/lib/requests/dashboard'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useLocalSearchParams, router } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Button } from '@/components/ui/Button'
import { editGame } from '@/lib/requests/games'
import { singleGame } from '@/lib/types/dashboard'
import { z } from 'zod'
import useUserContext from '@/lib/hooks/useUserContext'

type ErrorState =
  | { error: false }
  | { error: true; message: string }

const Game = () => {
  const { gameId } = useLocalSearchParams<{
    gameId: string
  }>()
  const {
    data: game,
    isPending,
    error,
  } = useQuery({
    queryKey: ['singleGame'],
    queryFn: () => getSingleGame({ gameId }),
  })
  const mutation = useMutation({
    mutationFn: editGame,
    onError: (error) => onMutationError(error),
    onSuccess: () => onMutationSuccess(),
  })
  const [homeGoal, setHomeGoal] = useState<number | null>(
    null
  )
  const [awayGoal, setAwayGoal] = useState<number | null>(
    null
  )
  const [halftimeHomeGoal, setHalftimeHomeGoal] = useState<
    number | null
  >(null)
  const [halftimeAwayGoal, setHalftimeAwayGoal] = useState<
    number | null
  >(null)
  const [showError, setShowError] = useState<ErrorState>({
    error: false,
  })
  const { user } = useUserContext()
  const client = useQueryClient()

  useEffect(() => {
    if (game) {
      if (game.homeGoal) {
        setHomeGoal(game.homeGoal)
      } else {
        setHomeGoal(0)
      }
      if (game.awayGoal) {
        setAwayGoal(game.awayGoal)
      } else {
        setAwayGoal(0)
      }
      if (game.halftimeHomeGoal) {
        setHalftimeHomeGoal(game.halftimeHomeGoal)
      } else {
        setHalftimeHomeGoal(0)
      }
      if (game.halftimeAwayGoal) {
        setHalftimeAwayGoal(game.halftimeAwayGoal)
      } else {
        setHalftimeAwayGoal(0)
      }
    }
  }, [game])

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontWeight: '800' }}>
          {error.message}
        </Text>
      </View>
    )
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text
          style={{ color: 'white', fontWeight: 'bold' }}
        >
          Måste logga in först!
        </Text>
      </View>
    )
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', fontWeight: '800' }}>
          Laddar...
        </Text>
      </View>
    )
  }

  const handleSubmit = () => {
    const formState: z.infer<typeof singleGame> = {
      ...game,
      result: `${homeGoal}-${awayGoal}`,
      halftimeResult: `${halftimeHomeGoal}-${halftimeAwayGoal}`,
    }
    mutation.mutate({ formState })
  }

  const onMutationError = (error: Error) => {
    console.error(error)
    setShowError({ error: true, message: error.message })
    setTimeout(() => {
      setShowError({ error: false })
    }, 1500)
  }

  const onMutationSuccess = () => {
    client.invalidateQueries({ queryKey: ['games'] })
    router.replace('..')
  }

  if (game) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            maxHeight: 20,
          }}
        >
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            {game.date}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxHeight: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            {game.homeTeam.casualName}
          </Text>
          <Text
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            {game.awayTeam.casualName}
          </Text>
        </View>
        <View style={styles.mainContent}>
          <GoalComponent
            goal={homeGoal}
            setGoal={setHomeGoal}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <View
              style={{
                flex: 1,
                gap: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.mainText}>Resultat</Text>
            </View>
            <View
              style={{
                flex: 1,
                gap: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.mainText}>
                {homeGoal}-{awayGoal}
              </Text>
            </View>
          </View>
          <GoalComponent
            goal={awayGoal}
            setGoal={setAwayGoal}
          />
        </View>
        <View style={styles.mainContent}>
          <GoalComponent
            goal={halftimeHomeGoal}
            setGoal={setHalftimeHomeGoal}
          />
          <View style={{ flex: 1, gap: 8 }}>
            <View
              style={{
                flex: 1,
                gap: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.mainText}>Halvtid</Text>
            </View>
            <View
              style={{
                flex: 1,
                gap: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.mainText}>
                {halftimeHomeGoal}-{halftimeAwayGoal}
              </Text>
            </View>
          </View>
          <GoalComponent
            goal={halftimeAwayGoal}
            setGoal={setHalftimeAwayGoal}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Button
            className="mt-10"
            onPress={handleSubmit}
          >
            <Text>Skicka</Text>
          </Button>
        </View>
        <View className="flex flex-row justify-center mt-6">
          <Text>
            {showError.error ? showError.message : null}
          </Text>
        </View>
      </View>
    )
  }
}

type GoalComponentProps = {
  goal: number | null
  setGoal: Dispatch<SetStateAction<number | null>>
}

function GoalComponent({
  goal,
  setGoal,
}: GoalComponentProps) {
  const minus = () => {
    setGoal((prev) => prev && prev - 1)
  }

  const plus = () => {
    setGoal((prev) => prev && prev + 1)
  }

  return (
    <View style={styles.goalComponent}>
      <Button
        onPress={plus}
        style={{ maxHeight: 10, maxWidth: 10 }}
      >
        <Text>+</Text>
      </Button>
      <View>
        <Text style={{ color: 'white' }}>{goal}</Text>
      </View>
      <Button
        onPress={minus}
        style={{ maxHeight: 10, maxWidth: 10 }}
      >
        <Text>-</Text>
      </Button>
    </View>
  )
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    backgroundColor: 'black',
    padding: 10,
    height: '100%',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    maxHeight: 80,
  },
  mainText: { color: 'white', fontWeight: '800' },

  goalComponent: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
})
