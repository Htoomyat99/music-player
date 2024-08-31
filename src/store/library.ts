import { Artist, TrackWithPlayList } from "@/helpers/type";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";

interface LibraryState {
  tracks: TrackWithPlayList[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlayList: (track: Track, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  tracks: library,
  toggleTrackFavorite: () => {},
  addToPlayList: () => {},
}));

export const useTracks = () => useLibraryStore((state) => state.tracks);

export const useFavorite = () => {
  const favorites = useLibraryStore((state) =>
    state.tracks.filter((track) => track.rating === 1)
  );

  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  );

  return {
    favorites,
    toggleTrackFavorite,
  };
};

export const useArtists = () =>
  useLibraryStore((state) => {
    return state.tracks.reduce((acc, track) => {
      const existingArtist = acc.find((artist) => artist.name === track.artist);

      if (existingArtist) {
        existingArtist.track.push(track);
      } else {
        acc.push({
          name: track.artist ?? "Unknown",
          track: [track],
        });
      }

      return acc;
    }, [] as Artist[]);
  });
