import library from "@/assets/data/library.json";
import React, { useCallback } from "react";
import { FlatList, FlatListProps, View } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { utilsStyles } from "@/styles";
import { Track } from "react-native-track-player";

export interface TrackListProps extends Partial<FlatListProps<Track>> {
  tracks: Track[];
}

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

export const TrackList = ({ tracks, ...flatListProps }: TrackListProps) => {
  const handleTrackSelect = (track: Track) => {
    console.log(track);
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
      {...flatListProps}
    />
  );
};
