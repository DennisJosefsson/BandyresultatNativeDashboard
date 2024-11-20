import UserContextProvider from '@/lib/contexts/userContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Bandyresultat' }} />
          <Stack.Screen name="login" options={{ title: 'Inloggning' }} />
        </Stack>
      </UserContextProvider>
    </QueryClientProvider>
  )
}
