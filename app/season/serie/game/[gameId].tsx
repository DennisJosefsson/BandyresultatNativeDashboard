import { Card } from '@/components/ui/card'
import { getSingleGame } from '@/lib/requests/dashboard'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useLocalSearchParams, router } from 'expo-router'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Button } from '@/components/ui/button'
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
      <Card>
        <Text className="text-lg font-semibold">
          {error.message}
        </Text>
      </Card>
    )
  }

  if (!user) {
    return (
      <View className="flex flex-row justify-center mt-10">
        <Text className="font-bold">
          Måste logga in först!
        </Text>
      </View>
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
      <View className="flex flex-col gap-2 p-4 mt-2">
        <View className="flex flex-row justify-center">
          <Text className="font-bold">{game.date}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="font-bold">
            {game.homeTeam.casualName}
          </Text>
          <Text className="font-bold">
            {game.awayTeam.casualName}
          </Text>
        </View>
        <View className="flex flex-row justify-between mb-4">
          <GoalComponent
            goal={homeGoal}
            setGoal={setHomeGoal}
          />
          <View className="flex flex-col gap-2">
            <View className="flex flex-row justify-center">
              <Text className="font-semibold">
                Resultat
              </Text>
            </View>
            <View className="flex flex-row justify-center">
              <Text className="font-semibold">
                {homeGoal}-{awayGoal}
              </Text>
            </View>
          </View>
          <GoalComponent
            goal={awayGoal}
            setGoal={setAwayGoal}
          />
        </View>
        <View className="flex flex-row justify-between">
          <GoalComponent
            goal={halftimeHomeGoal}
            setGoal={setHalftimeHomeGoal}
          />
          <View className="flex flex-col gap-2">
            <View className="flex flex-row justify-center">
              <Text className="font-semibold">Halvtid</Text>
            </View>
            <View className="flex flex-row justify-center">
              <Text className="font-semibold">
                {halftimeHomeGoal}-{halftimeAwayGoal}
              </Text>
            </View>
          </View>
          <GoalComponent
            goal={halftimeAwayGoal}
            setGoal={setHalftimeAwayGoal}
          />
        </View>
        <Button
          className="mt-10"
          onPress={handleSubmit}
        >
          <Text>Skicka</Text>
        </Button>
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
    <View className="flex flex-col items-center gap-2">
      <Button onPress={plus}>
        <Text className="text-primary-foreground">+</Text>
      </Button>
      <View className="flex items-center justify-center rounded-sm h-9 w-9 bg-secondary">
        <Text>{goal}</Text>
      </View>
      <Button onPress={minus}>
        <Text className="text-primary-foreground">-</Text>
      </Button>
    </View>
  )
}

export default Game
