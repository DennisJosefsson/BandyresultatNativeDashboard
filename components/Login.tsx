import useUserContext from '@/lib/hooks/useUserContext'
import { getLogin } from '@/lib/requests/login'
import { login } from '@/lib/types/login'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { View } from 'react-native'
import { z } from 'zod'
import { Input } from './ui/input'
import { Text } from './ui/text'
import { Button } from './ui/button'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { user, dispatch } = useUserContext()

  const mutation = useMutation({
    mutationFn: () => getLogin(userName, password),
    onError: (error) => onErrorMutation(error),
    onSuccess: (data) => onSuccessMutation(data),
  })

  const onSuccessMutation = (data: z.infer<typeof login>) => {
    if (data.success && user === false) {
      dispatch({ type: 'LOGIN' })
      setError(data.message)
      setUserName('')
      setPassword('')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const onErrorMutation = (error: Error) => {
    if (error instanceof AxiosError) {
      const message = `${error.response?.data.errors}`
      setError(message)
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    }
  }

  const handleSubmit = () => {
    mutation.mutate()
  }

  return (
    <View className="flex flex-col w-full h-screen gap-4 p-4 mt-4">
      <View className="flex flex-col gap-8">
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="text-base text-wrap text-slate-100">
              Användare är {user ? 'inloggad.' : 'ej inloggad.'}
            </Text>
          </View>
          {user && (
            <View>
              <Button
                onPress={() => dispatch({ type: 'LOGOUT' })}
                size="sm"
              >
                <Text>Logga ut</Text>
              </Button>
            </View>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text className="text-base text-wrap text-slate-100">
            Användarnamn
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Input
            value={userName}
            onChangeText={setUserName}
            autoComplete="username"
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <View style={{ marginTop: 10 }}>
          <Text className="text-base text-wrap text-slate-100">Lösenord</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Input
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          onPress={handleSubmit}
          size="sm"
        >
          <Text>Skicka</Text>
        </Button>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text className="text-slate-100">{error}</Text>
      </View>
    </View>
  )
}

export default Login
