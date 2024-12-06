import UserContextProvider from '@/lib/contexts/userContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, View } from 'react-native'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: 'Bandyresultat' }}
          />
          <Stack.Screen
            name="login"
            options={{ title: 'Inloggning' }}
          />
          <Stack.Screen
            name="seasons"
            options={{ title: 'Säsonger' }}
          />
          <Stack.Screen
            name="season/[seasonId]"
            options={{ title: 'Säsong' }}
          />
          <Stack.Screen
            name="season/serie/[serieId]"
            options={{ title: 'Serie' }}
          />
          <Stack.Screen
            name="season/serie/game/[gameId]"
            options={{ title: 'Match' }}
          />
        </Stack>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
