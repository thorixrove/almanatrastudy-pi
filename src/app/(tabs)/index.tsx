import { Button
  , Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Sentry from "@sentry/react-native"


const ChatsScreen = () => {
  return (
    <SafeAreaView>
      <Text>ChatsScreen</Text>
      <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </SafeAreaView>
  )
}

export default ChatsScreen