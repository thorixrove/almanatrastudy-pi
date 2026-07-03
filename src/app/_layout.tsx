import { Stack } from "expo-router";
import "../../global.css"
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache"
import * as Sentry from '@sentry/react-native';
import * as WebBrowser from 'expo-web-browser';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/contexts/AppProvider";
import ChatWrapper from "@/components/ChatWrapper";

WebBrowser.maybeCompleteAuthSession();

Sentry.init({
  dsn: 'https://c19b10667b4e2d6f75c17a59fbd9dfed@o4511578221182976.ingest.us.sentry.io/4511667597148160',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <GestureHandlerRootView className="flex-1">
        <ChatWrapper>
        <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProvider>
      </ChatWrapper>
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}