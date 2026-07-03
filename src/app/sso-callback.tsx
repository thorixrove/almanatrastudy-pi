import { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function SSOCallback() {
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      router.replace('/(tabs)')
      return
    }

    // isLoaded sudah true tapi isSignedIn masih false sesaat setelah OAuth —
    // beri Clerk waktu sebentar untuk menyelesaikan setActive() sebelum menyerah
    const timeout = setTimeout(() => {
      if (!isSignedIn) {
        router.replace('/(auth)')
      }
    }, 1500)

    return () => clearTimeout(timeout)
  }, [isLoaded, isSignedIn])

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" />
    </View>
  )
}