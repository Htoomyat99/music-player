import {
  PlayPauseButton,
  SkipToNextButton,
  SkipToPrevButton,
} from "@/components/PlayerControls";
import { unknownTrackImageUri } from "@/constants/images";
import { useLastActiveTrack } from "@/hooks/useLastActiveTrack";
import { defaultStyles } from "@/styles";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { useActiveTrack } from "react-native-track-player";

export const FloatingPlayer = ({ style }: ViewProps) => {
  const activeTrack = useActiveTrack();
  const lastActiveTrack = useLastActiveTrack();

  const displayTrack = activeTrack ?? lastActiveTrack;

  if (!displayTrack) return null;

  return (
    <Pressable style={[styles.container, style]}>
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
        <Text style={styles.trackTitle}>{displayTrack.title}</Text>
      </View>

      <View style={styles.trackControlContainer}>
        <SkipToPrevButton iconSize={22} />
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
    fontWeight: 600,
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
