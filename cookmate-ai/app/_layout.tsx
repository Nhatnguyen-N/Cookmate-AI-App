import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogtoProvider, LogtoConfig, UserScope } from "@logto/rn";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });
  const config: LogtoConfig = {
    endpoint: "https://qtrm52.logto.app/",
    appId: "ukz3quyp81ok2ve9veb9s",
    scopes: [UserScope.Email],
  };
  return (
    <SafeAreaProvider>
      <LogtoProvider config={config}>
        <Stack>
          <Stack.Screen
            name="Landing"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </LogtoProvider>
    </SafeAreaProvider>
  );
}
