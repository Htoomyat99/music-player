import { unknownTrackImageUri } from "@/constants/images";
import { utilsStyles } from "@/styles";
import React from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer, { Track } from "react-native-track-player";
import { TrackListItem } from "./TrackListItem";

export interface TrackListProps extends Partial<FlatListProps<Track>> {
  tracks: Track[];
}

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

const ListEmptyComponent = () => {
  return (
    <View>
      <Text style={utilsStyles.emptyContentText}>No Sound Found</Text>

      <FastImage
        source={{
          uri: unknownTrackImageUri,
          priority: FastImage.priority.normal,
        }}
        style={utilsStyles.emptyContentImage}
      />
    </View>
  );
};

export const TrackList = ({ tracks, ...flatListProps }: TrackListProps) => {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={ListEmptyComponent}
      {...flatListProps}
    />
  );
};
