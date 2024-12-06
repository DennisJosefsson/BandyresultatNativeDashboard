import { getSeasons } from '@/lib/requests/dashboard'
import { season } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { View, Text, StyleSheet } from 'react-native'
import { z } from 'zod'
import { Button } from './ui/Button'
import { Link } from 'expo-router'

type SeasonProps = z.infer<typeof season>

const Season = ({ women, seasonId }: SeasonProps) => (
  <Link
    asChild
    href={{
      pathname: '/season/[seasonId]',
      params: { seasonId },
    }}
  >
    <Button>
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

  if (seasons) {
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
    backgroundColor: 'black',
    gap: 10,
    height: '100%',
  },
  text: {
    color: 'white',
  },
})
