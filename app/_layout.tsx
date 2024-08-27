import { useSetUpTrackPlayer } from "@/hooks/useSetUpTrackPlayer";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />

        <StatusBar barStyle={"default"} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          presentation: "card",
          gestureEnabled: true,
          gestureDirection: "vertical",
          animationDuration: 400,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default App;
