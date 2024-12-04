import UserContextProvider from '@/lib/contexts/userContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './index.css'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Theme,
  ThemeProvider,
} from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { FlatList, Platform, View } from 'react-native'
import { NAV_THEME } from '@/lib/utils/constants'
import { useColorScheme } from '@/lib/utils/useColorScheme'

import { Sun } from '@/lib/icons/Sun'
import { MoonStar } from '@/lib/icons/MoonStar'
import { Button } from '@/components/ui/button'
import { remapProps } from 'nativewind'

remapProps(FlatList, {
  style: 'className',
  ListFooterComponentStyle: 'ListFooterComponentClassName',
  ListHeaderComponentStyle: 'ListHeaderComponentClassName',
  columnWrapperStyle: 'columnWrapperClassName',
  contentContainerStyle: 'contentContainerClassName',
})

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: 'Arial',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Arial',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Arial',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Arial',
      fontWeight: '900',
    },
  },
}
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: 'Arial',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Arial',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Arial',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'Arial',
      fontWeight: '900',
    },
  },
}

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
  const { colorScheme, setColorScheme, isDarkColorScheme } =
    useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] =
    React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const theme = await AsyncStorage.getItem('theme')
      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add(
          'bg-background'
        )
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme)
        setIsColorSchemeLoaded(true)
        return
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light'
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme)

        setIsColorSchemeLoaded(true)
        return
      }
      setIsColorSchemeLoaded(true)
    })().finally(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  const themeToggle = () => {
    const nextTheme =
      colorScheme === 'dark' ? 'light' : 'dark'
    setColorScheme(nextTheme)
    AsyncStorage.setItem('theme', nextTheme)
  }

  if (!isColorSchemeLoaded) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider
          value={
            isDarkColorScheme ? DARK_THEME : LIGHT_THEME
          }
        >
          <StatusBar
            style={isDarkColorScheme ? 'light' : 'dark'}
          />
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
          <View className="flex flex-row justify-end p-1 bg-background">
            <Button
              onPress={themeToggle}
              size="sm"
            >
              {isDarkColorScheme ? (
                <Sun className="text-primary-foreground" />
              ) : (
                <MoonStar className="text-primary-foreground" />
              )}
            </Button>
          </View>
        </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
