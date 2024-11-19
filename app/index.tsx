import { FlatList, Text, View } from 'react-native'
import './index.css'

export default function Index() {
  return (
    <View className="bg-slate-900 h-screen flex flex-col">
      <Text className="font-bold text-slate-100 text-4xl p-4">
        Hello, world!
      </Text>
      <FlatList
        className="p-4"
        data={['Hello, ', 'World!']}
        renderItem={({ item }) => (
          <Text className="text-lg text-slate-100">{item}</Text>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  )
}
