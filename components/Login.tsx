import useUserContext from '@/lib/hooks/useUserContext'
import { getLogin } from '@/lib/requests/login'
import { login } from '@/lib/types/login'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { saveToken } from '@/lib/utils/tokens'

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

  const onSuccessMutation = async (
    data: z.infer<typeof login>
  ) => {
    if (data.success && user === false) {
      await saveToken(data.token)
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
    <View style={styles.container}>
      <View>
        <View style={styles.userInfo}>
          <View style={{ flex: 1, maxHeight: 30 }}>
            <Text style={styles.text}>
              Användare är{' '}
              {user ? 'inloggad.' : 'ej inloggad.'}{' '}
            </Text>
          </View>
          {user && (
            <View style={{ flex: 1, maxHeight: 40 }}>
              <Button
                onPress={() => dispatch({ type: 'LOGOUT' })}
              >
                <Text>Logga ut</Text>
              </Button>
            </View>
          )}
        </View>
      </View>
      <View
        style={{ flex: 1, maxHeight: 50, marginTop: 20 }}
      >
        <View>
          <Text style={styles.text}>Användarnamn</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={userName}
            onChangeText={setUserName}
            autoComplete="username"
            style={styles.input}
          />
        </View>
      </View>
      <View
        style={{ flex: 1, maxHeight: 50, marginTop: 20 }}
      >
        <View>
          <Text style={styles.text}>Lösenord</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            autoComplete="password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
      </View>
      <View
        style={{ flex: 1, maxHeight: 40, marginTop: 20 }}
      >
        <Button onPress={handleSubmit}>
          <Text>Inloggning</Text>
        </Button>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <Text style={styles.text}>{error}</Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
    backgroundColor: 'black',
    color: 'white',
    padding: 40,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 30,
    borderRadius: 2,
    paddingHorizontal: 2,
    paddingVertical: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 40,
    alignItems: 'center',
  },
})
