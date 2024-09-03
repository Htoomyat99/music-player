import { useFavorite } from "@/store/library";
import { useCallback } from "react";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";

export function useTrackPlayerPlaylist() {
  const activeTrack = useActiveTrack();

  const { favorites, toggleTrackFavorite } = useFavorite();

  const isFavorite =
    favorites.find((track) => track.url === activeTrack?.url)?.rating === 1;

  const toggleFavorites = useCallback(async () => {
    const id = await TrackPlayer.getActiveTrackIndex();

    if (id === null || id === undefined) return;

    await TrackPlayer.updateMetadataForTrack(id, {
      rating: isFavorite ? 0 : 1,
    });

    if (activeTrack) {
      toggleTrackFavorite(activeTrack);
    }
  }, [isFavorite, toggleTrackFavorite, activeTrack]);

  return {
    isFavorite,
    toggleFavorites,
  };
}
