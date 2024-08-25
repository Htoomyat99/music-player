import { useSetUpTrackPlayer } from "@/hooks/useSetUpTrackPlayer";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const handleTrackPlayer = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  useLogTrackPlayerState();

  useSetUpTrackPlayer({
    onLoad: handleTrackPlayer,
  });

  return (
    <SafeAreaProvider>
      <RootNavigation />

      <StatusBar barStyle={"default"} />
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;
