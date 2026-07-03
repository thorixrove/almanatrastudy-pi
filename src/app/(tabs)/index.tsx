import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getGreetingForHour } from '@/lib/utils'
import { Color, useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import { useAppContext } from '@/contexts/AppProvider'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/lib/theme'
import { TextInput } from 'react-native-gesture-handler'
import { ChannelList } from 'stream-chat-expo'
import type {Channel} from "stream-chat"


const ChatsScreen =() => {
  const router = useRouter()
  const {setChannel} = useAppContext()
  const { user } = useUser()
  const [search, setSearch]= useState("")

  const filters = { members: { $in: [user?.id!]},
type:"messaging"}

const firstName = user?.firstName || "there"

const channelRenderFilterFn = (channels:Channel[]) => {
  if (!search.trim()) return channels

  const q = search.toLocaleLowerCase()

  //TERDAPAT PERUBAHAN PADA BAGIAN INI
  return channels.filter((channel) => {
    const channelData = channel.data as { name?: string } | undefined
    const name = channelData?.name?.toLowerCase() ?? ""
    const cid = channel.cid.toLowerCase()
    return name.includes(q) || cid.includes(q)
  })
}



  return (
    <SafeAreaView className='flex-1 bg-background'>
      <View className="px-5 pt-3 pb-2">
        <Text className='text-sm text-foreground-muted mb-0.5'>
          {getGreetingForHour()}, {firstName}
        </Text>
      </View>

      <View className='flex-row items-center bg-surface mx-5 mb-3
      px-3.5 py-3 rounded-[14px] gap-2.5 border border-border'>
        <Ionicons name='search' size={18} color={COLORS.textMuted}/>
        <TextInput className='flex-1 text-[15px] text-foreground'
        placeholder='Search study rooms...'
        placeholderTextColor={COLORS.textMuted}
        value={search}
        onChangeText={setSearch}
        />
      </View>


      <View className='flex-row items-center px-5 my-1.5 gap-2'>
        <Ionicons name='chatbubbles' size={15} color={COLORS.primaryLight} />
        <Text className='text-[15px] font-semibold text-primary-light'>Your Study Sessions</Text>
      </View>

      <ChannelList filters={filters} options={{ state: true, watch: true }}
      sort={{ last_updated: -1}}
      channelRenderFilterFn={channelRenderFilterFn}
      onSelect={(channel) => {
        setChannel(channel)
        // router.push(`/channel/${channel.id}`);
      }}
      additionalFlatListProps={{
        contentContainerStyle: { flexGrow: 1}
      }}

       // EmptyStateIndicator={() => <Text className="flex-1 text-white">Hey start chatting</Text>}
      />
    </SafeAreaView>
  )
}

export default ChatsScreen