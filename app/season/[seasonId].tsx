import { Button } from '@/components/ui/Button'
import { getSeries } from '@/lib/requests/dashboard'
import { serie } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { z } from 'zod'

type SerieProps = z.infer<typeof serie>

const Serie = ({ serieId, serieName }: SerieProps) => (
  <Link
    asChild
    href={{
      pathname: '/season/serie/[serieId]',
      params: { serieId },
    }}
  >
    <Button>
      <Text>{serieName}</Text>
    </Button>
  </Link>
)

const SingleSeason = () => {
  const { seasonId } = useLocalSearchParams<{
    seasonId: string
  }>()
  const {
    data: series,
    isPending,
    error,
  } = useQuery({
    queryKey: ['series'],
    queryFn: () => getSeries({ seasonId: seasonId }),
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

  if (series) {
    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        <View style={styles.container}>
          {series.map((serie) => {
            return (
              <Serie
                key={serie.serieId}
                serieId={serie.serieId}
                serieName={serie.serieName}
              />
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

export default SingleSeason

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 40,
    backgroundColor: 'black',
    gap: 8,
  },
  text: {
    color: 'white',
  },
})
