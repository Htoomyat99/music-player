import { PlayPauseButton, SkipToNextButton } from "@/components/PlayerControls";
import { unknownTrackImageUri } from "@/constants/images";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import { defaultStyles } from "@/styles";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { useActiveTrack } from "react-native-track-player";
import { MovingText } from "./MovingText";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter();
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  const handlePress = () => {
    router.navigate("/player");
  };

  return (
    <Pressable style={[styles.container, style]} onPress={handlePress}>
      <View>
        <FastImage
          source={{
            uri: displayTrack.artwork ?? unknownTrackImageUri,
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.trackTitleContainer}>
        <MovingText
          text={displayTrack.title ?? ""}
          style={styles.trackTitle}
          animationThreshold={25}
        />
      </View>

      <View style={styles.trackControlContainer}>
        <PlayPauseButton iconSize={24} />
        <SkipToNextButton iconSize={22} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: "hidden",
    marginLeft: 10,
  },
  trackTitle: {
    ...defaultStyles.text,
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  trackControlContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
