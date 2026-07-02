import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSSO } from '@clerk/clerk-expo'

const useSocialAuth = () => {
    const [loadingStrategy, setLoadingStartegy] = useState <string | null>(null)
    const { startSSOFlow } = useSSO()

    const handleSocialAuth = async ( strategy: "oauth_google" | "oauth_apple" | "oauth_github") => {
        if(loadingStrategy) return 

        setLoadingStartegy(strategy)


        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy })

            if(!createdSessionId || !setActive) {
                const provider = strategy === "oauth_google" ? "Google" : strategy === "oauth_apple" ? "Apple" : "Github"

                Alert.alert(
                    "Sign-in incomplete",
                    `${provider} sign-in did not complete. Please try again`,
                )
                return
            }
                await setActive({session:createdSessionId})
        } catch (error) {
            console.log(" Error in social auth:, error")
            const provider =
            strategy === "oauth_google" ? "Google" : strategy === "oauth_apple" ? "Apple" : "Github"
            Alert.alert("Error", `Failed to sign in with ${provider}. please try again.`)
        }
        finally {
            setLoadingStartegy(null)
        }
    }


  return { handleSocialAuth, loadingStrategy }
}
export default useSocialAuth