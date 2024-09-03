import { View, Text, StyleSheet, Platform } from "react-native";
import React, { PropsWithChildren } from "react";
import { MenuView } from "@react-native-menu/menu";
import TrackPlayer, { Track } from "react-native-track-player";
import { useFavorite } from "@/store/library";
import { match } from "ts-pattern";
import { useQueue } from "@/store/queue";
import { useRouter } from "expo-router";

type TrackShortcutMenuProps = PropsWithChildren<{ track: Track }>;

const TrackShortcutMenu = ({ track, children }: TrackShortcutMenuProps) => {
  const router = useRouter();
  const isFavorite = track.rating === 1;

  const { toggleTrackFavorite } = useFavorite();
  const { activeQueueId } = useQueue();

  const handlePressAction = (id: string) => {
    match(id)
      .with("add-to-favorites", async () => {
        toggleTrackFavorite(track);

        if (activeQueueId?.startsWith("favorites")) {
          await TrackPlayer.add(track);
        }
      })
      .with("remove-from-favorites", async () => {
        toggleTrackFavorite(track);

        if (activeQueueId?.startsWith("favorites")) {
          const queue = await TrackPlayer.getQueue();

          const trackToRemove = queue.findIndex(
            (queueTrack) => queueTrack.url === track.url
          );

          await TrackPlayer.remove(trackToRemove);
        }
      })
      .with("add-to-playlist", () => {
        router.push({
          pathname: "/(modals)/addToPlayList",
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => console.warn("Unknow menu action: ", id));
  };

  return (
    <MenuView
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isFavorite ? "Remove from favorites" : "Add to favorites",
          image: Platform.select({
            ios: isFavorite ? "start.fill" : "star",
            android: isFavorite ? "ic_star" : "ic_star_outline",
          }),
        },
        {
          id: "add-to-playlist",
          title: "Add to playlist",
          image: Platform.select({
            ios: "plus",
            android: "ic_menu_add",
          }),
        },
      ]}
    >
      {children}
    </MenuView>
  );
};

export default TrackShortcutMenu;

const styles = StyleSheet.create({});
