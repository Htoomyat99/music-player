import { View, Text, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { colors, fontSize } from "@/constants/tokens";
import { PlayList } from "@/helpers/type";
import { trackTitleFilter } from "@/helpers/filter";
import { TrackList } from "./TrackList";
import { generateTracksListId } from "@/helpers/miscellaneous";
import { defaultStyles } from "@/styles";
import FastImage from "react-native-fast-image";
import { QueueControl } from "./QueueControl";

const PlaylistTracksList = ({ playlist }: { playlist: PlayList }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: "Find in playlist",
      textColor: colors.text,
    },
  });

  const filterPlaylistTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(search));
  }, [playlist.tracks, search]);

  return (
    <TrackList
      id={generateTracksListId(playlist.name)}
      tracks={filterPlaylistTracks}
      scrollEnabled={false}
      hideQueueControl={true}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <FastImage
              source={{
                uri: playlist.artworkPreview,
                priority: FastImage.priority.normal,
              }}
              style={styles.artworkImage}
            />
          </View>

          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>

          {search.length === 0 && (
            <QueueControl tracks={playlist.tracks} style={{ paddingTop: 24 }} />
          )}
        </View>
      }
    />
  );
};

export default PlaylistTracksList;

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 300,
  },
  artworkImage: {
    width: "85%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  playlistNameText: {
    ...defaultStyles.text,
    marginTop: 22,
    textAlign: "center",
    fontSize: fontSize.lg,
    fontWeight: 800,
  },
});
