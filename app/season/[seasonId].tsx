import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { getSeries } from '@/lib/requests/dashboard'
import { serie } from '@/lib/types/dashboard'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { z } from 'zod'

type SerieProps = z.infer<typeof serie>

const Serie = ({ serieId, serieName }: SerieProps) => (
  <Link
    asChild
    href={{ pathname: '/season/serie/[serieId]', params: { serieId } }}
  >
    <Button size="sm">
      <Text>{serieName}</Text>
    </Button>
  </Link>
)

const SingleSeason = () => {
  const { seasonId } = useLocalSearchParams<{ seasonId: string }>()
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

  if (series) {
    return (
      <View className="grid grid-cols-2 gap-2 p-4">
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
    )
  }
}

export default SingleSeason
