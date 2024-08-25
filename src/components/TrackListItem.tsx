import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Track, useActiveTrack } from "react-native-track-player";
import Entypo from "@expo/vector-icons/Entypo";

export interface TrackListItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

export const TrackListItem = ({
  track,
  onTrackSelect: handleTrackSelect,
}: TrackListItemProps) => {
  const isActiveTrack = useActiveTrack()?.url === track.url;

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          <FastImage
            source={{
              uri: track.artwork ?? unknownTrackImageUri,
              priority: FastImage.priority.normal,
            }}
            style={{
              ...styles.trackArtWorkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
        </View>

        <View style={styles.bodyContainer}>
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? colors.primary : colors.textMuted,
              }}
            >
              {track.title}
            </Text>

            {track.artist && (
              <Text
                numberOfLines={1}
                style={{
                  ...styles.trackArtistText,
                }}
              >
                {track.artist}
              </Text>
            )}
          </View>

          <Entypo name="dots-three-horizontal" size={18} color={colors.text} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 20,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trackArtWorkImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: fontSize.sm,
    fontWeight: "500",
    maxWidth: "90%",
  },
  trackArtistText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
