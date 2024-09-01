import {
  View,
  Text,
  TouchableHighlightProps,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import React from "react";
import { PlayList } from "@/helpers/type";
import { defaultStyles } from "@/styles";
import FastImage from "react-native-fast-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants/tokens";

type PlaylistListItemProps = {
  playlist: PlayList;
} & TouchableHighlightProps;

const PlaylistListItem = ({ playlist, ...props }: PlaylistListItemProps) => {
  return (
    <TouchableHighlight activeOpacity={0.8} {...props}>
      <View style={styles.playlistItemContainer}>
        <View>
          <FastImage
            source={{
              uri: playlist.artworkPreview,
              priority: FastImage.priority.normal,
            }}
            style={styles.playlistArtworkImage}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>

          <AntDesign
            name="right"
            size={16}
            color={colors.icon}
            style={{ opacity: 0.5 }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PlaylistListItem;

const styles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: "row",
    columnGap: 14,
    alignItems: "center",
    paddingRight: 90,
  },
  playlistArtworkImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  playlistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    fontWeight: 600,
    maxWidth: "80%",
  },
});
