import { getSeasons } from '@/lib/requests/dashboard'
import { season } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { View, FlatList } from 'react-native'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Button } from './ui/button'
import { Link } from 'expo-router'

type SeasonProps = z.infer<typeof season>

const Season = ({ women, seasonId }: SeasonProps) => (
  <Link
    asChild
    href={{ pathname: '/season/[seasonId]', params: { seasonId } }}
  >
    <Button size="sm">
      <Text>{women ? 'Damer' : 'Herrar'}</Text>
    </Button>
  </Link>
)

const Seasons = () => {
  const {
    data: seasons,
    isPending,
    error,
  } = useQuery({
    queryKey: ['seasons'],
    queryFn: getSeasons,
  })

  if (error) {
    return (
      <Card>
        <Text className="text-lg font-semibold">{error.message}</Text>
      </Card>
    )
  }

  if (isPending) {
    return (
      <Card>
        <Text className="text-lg font-semibold">Laddar...</Text>
      </Card>
    )
  }

  if (seasons) {
    return (
      <View className="flex flex-row justify-between p-10">
        {seasons.map((season) => {
          return (
            <Season
              women={season.women}
              seasonId={season.seasonId}
              year={season.year}
              key={season.seasonId}
            />
          )
        })}
      </View>
    )
  }
}

export default Seasons
