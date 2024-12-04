import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getToken = async () => {
  if (Platform.OS === 'web') {
    const token = await AsyncStorage.getItem('token')
    return token
  } else {
    try {
      return await SecureStore.getItemAsync('token')
    } catch (error) {
      throw error
    }
  }
}

export const saveToken = async (token: string) => {
  if (Platform.OS === 'web') {
    AsyncStorage.setItem('token', token)
  } else {
    try {
      await SecureStore.setItemAsync('token', token)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export const removeToken = async () => {
  if (Platform.OS === 'web') {
    AsyncStorage.removeItem('token')
  } else {
    try {
      await SecureStore.deleteItemAsync('token')
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
