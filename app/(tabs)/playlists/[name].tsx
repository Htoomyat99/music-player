import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { usePlaylists } from "@/store/library";
import { screenPadding } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import PlaylistTracksList from "@/components/PlaylistTracksList";

const PlaylistScreen = () => {
  const { name: playlistName } = useLocalSearchParams<{ name: string }>();

  const { playlists } = usePlaylists();

  const playlist = playlists.find((playlist) => playlist.name === playlistName);

  if (!playlist) {
    console.warn("playlist name not found");

    return <Redirect href={"/(tabs)/playlists"} />;
  }

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <PlaylistTracksList playlist={playlist} />
      </ScrollView>
    </View>
  );
};

export default PlaylistScreen;
