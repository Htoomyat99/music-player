import { useSetUpTrackPlayer } from "@/hooks/useSetUpTrackPlayer";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/constants/tokens";
import TrackPlayer from "react-native-track-player";
import { playbackService } from "@/constants/playbackService";

SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

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

      <Stack.Screen
        name="(modals)/addToPlayList"
        options={{
          presentation: "modal",
          headerStyle: { backgroundColor: colors.background },
          headerTitle: "Add to playlist",
          headerTitleStyle: { color: colors.text },
        }}
      />
    </Stack>
  );
};

export default App;
