import PlaylistTracksList from "@/components/PlaylistTracksList";
import { screenPadding } from "@/constants/tokens";
import { usePlaylists } from "@/store/library";
import { defaultStyles } from "@/styles";
import { Redirect, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View } from "react-native";

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
      <StatusBar style="light" />

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
