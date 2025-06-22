import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/rn";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const config: LogtoConfig = {
    endpoint: "https://qtrm52.logto.app/",
    appId: "ukz3quyp81ok2ve9veb9s",
    scopes: [UserScope.Email, UserScope.Profile],
  };
  const [user, setUser] = useState();
  return (
    <SafeAreaProvider>
      <LogtoProvider config={config}>
        <UserContext.Provider value={{ user, setUser }}>
          <Stack>
            <Stack.Screen
              name="Landing"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </UserContext.Provider>
      </LogtoProvider>
    </SafeAreaProvider>
  );
}
