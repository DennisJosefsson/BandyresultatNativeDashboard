import { Link } from 'expo-router'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native'
import { Button } from '@/components/ui/Button'

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href="/seasons"
        asChild
      >
        <Button>
          <Text>Säsonger</Text>
        </Button>
      </Link>
      <Link
        href="/login"
        asChild
      >
        <Button>
          <Text>Inloggning</Text>
        </Button>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
    gap: 10,
    backgroundColor: 'black',
    height: '100%',
  },
})
