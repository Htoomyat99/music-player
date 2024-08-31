import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import TrackPlayer, { Track } from "react-native-track-player";

type QueueControlProps = {
  tracks: Track[];
} & ViewProps;

export const QueueControl = ({
  tracks,
  style,
  ...viewProps
}: QueueControlProps) => {
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks);

    await TrackPlayer.play();
  };

  const handleShufflePlay = async () => {
    const shuffleTracks = [...tracks].sort(() => Math.random() - 0.5);

    await TrackPlayer.setQueue(shuffleTracks);
    await TrackPlayer.play();
  };

  return (
    <View style={[styles.container, style]} {...viewProps}>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.button} onPress={handlePlay}>
          <Ionicons name="play" size={22} color={colors.primary} />

          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1 }}>
        <Pressable style={styles.button} onPress={handleShufflePlay}>
          <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />

          <Text style={styles.buttonText}>Shuffle</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "rgba(47, 47, 47, 0.5)",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  buttonText: {
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: 600,
    fontSize: 18,
    textAlign: "center",
  },
});
