import { unknownTrackImageUri } from "@/constants/images";
import { utilsStyles } from "@/styles";
import React, { useRef } from "react";
import { FlatList, FlatListProps, Text, View } from "react-native";
import FastImage from "react-native-fast-image";
import TrackPlayer, { Track } from "react-native-track-player";
import { TrackListItem } from "./TrackListItem";
import { useQueue } from "@/store/queue";
import { QueueControl } from "./QueueControl";

export interface TrackListProps extends Partial<FlatListProps<Track>> {
  tracks: Track[];
  id: string;
  hideQueueControl?: boolean;
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

export const TrackList = ({
  tracks,
  id,
  hideQueueControl = false,
  ...flatListProps
}: TrackListProps) => {
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    );

    if (trackIndex === -1) return;

    const isChangingQueue = activeQueueId !== id;

    if (isChangingQueue) {
      const beforeTrack = tracks.slice(0, trackIndex);
      const afterTrack = tracks.slice(trackIndex + 1);

      // construct the queue
      await TrackPlayer.reset();
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTrack);
      await TrackPlayer.add(beforeTrack);

      await TrackPlayer.play();
      queueOffset.current = trackIndex;
      setActiveQueueId(id);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }
  };

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      ItemSeparatorComponent={ItemDivider}
      ListHeaderComponent={
        !hideQueueControl ? (
          <QueueControl tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={ListEmptyComponent}
      {...flatListProps}
    />
  );
};
