import library from "@/assets/data/library.json";
import React from "react";
import { FlatList, FlatListProps, View } from "react-native";
import { TrackListItem } from "./TrackListItem";
import { utilsStyles } from "@/styles";

export interface TrackListProps extends Partial<FlatListProps<unknown>> {
  tracks: any[];
}

const ItemDivider = () => (
  <View
    style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}
  />
);

export const TrackList = ({ tracks, ...flatListProps }: TrackListProps) => {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      renderItem={({ item: track }) => (
        <TrackListItem track={{ ...track, image: track.artwork }} />
      )}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      {...flatListProps}
    />
  );
};
