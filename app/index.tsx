import { Link } from 'expo-router'
import { View, FlatList } from 'react-native'
import './index.css'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <View className="flex flex-row justify-between p-10">
      <Link
        href="/seasons"
        asChild
      >
        <Button size="sm">
          <Text>Säsonger</Text>
        </Button>
      </Link>
      <Link
        href="/login"
        asChild
      >
        <Button size="sm">
          <Text>Inloggning</Text>
        </Button>
      </Link>
    </View>
  )
}
