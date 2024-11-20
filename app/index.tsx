import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import './index.css'

export default function App() {
  return (
    <View className="bg-slate-900 h-screen flex flex-col p-4">
      <Text className="font-bold text-slate-100 text-4xl">Hello, world!</Text>
      <Link href="/login">
        <Text className="font-bold text-blue-500 underline text-2xl">
          Inloggning
        </Text>
      </Link>
    </View>
  )
}
