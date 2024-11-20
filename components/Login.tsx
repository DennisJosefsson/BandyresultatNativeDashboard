import useUserContext from '@/lib/hooks/useUserContext'
import { getLogin } from '@/lib/requests/login'
import { login } from '@/lib/types/login'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { z } from 'zod'

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
    <View className="bg-slate-900 flex flex-col gap-4 mt-4 h-screen p-4 w-full">
      <View className="flex flex-col gap-8">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-wrap text-slate-100 text-base">
              Användare är {user ? 'inloggad.' : 'ej inloggad.'}
            </Text>
          </View>
          {user && (
            <View>
              <Pressable onPress={() => dispatch({ type: 'LOGOUT' })}>
                <Text>Logga ut</Text>
              </Pressable>
            </View>
          )}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text className="text-wrap text-slate-100 text-base">
            Användarnamn
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              padding: 10,
              color: 'white',
            }}
            value={userName}
            onChangeText={setUserName}
            autoComplete="username"
          />
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <View style={{ marginTop: 10 }}>
          <Text className="text-wrap text-slate-100 text-base">Lösenord</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            secureTextEntry={true}
            style={{
              height: 40,
              borderWidth: 1,
              padding: 10,
              color: 'white',
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Pressable className="border-slate-100 rounded-md border-1">
          <Text className="text-slate-100" onPress={handleSubmit}>
            Skicka
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text className="text-slate-100">{error}</Text>
      </View>
    </View>
  )
}

export default Login
