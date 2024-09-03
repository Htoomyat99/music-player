import { Artist, PlayList, TrackWithPlayList } from "@/helpers/type";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from "@/assets/data/library.json";
import { unknownTrackImageUri } from "@/constants/images";

interface LibraryState {
  tracks: TrackWithPlayList[];
  toggleTrackFavorite: (track: Track) => void;
  addToPlayList: (track: Track, playlistName: string) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  tracks: library,
  toggleTrackFavorite: (track) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) => {
        if (currentTrack.url == track.url) {
          return {
            ...currentTrack,
            rating: currentTrack.rating === 1 ? 0 : 1,
          };
        }

        return currentTrack;
      }),
    })),

  addToPlayList: (track, playlistName) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) => {
        if (currentTrack.url === track.url) {
          return {
            ...currentTrack,
            playList: [...(currentTrack.playList ?? []), playlistName],
          };
        }

        return currentTrack;
      }),
    })),
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

export const usePlaylists = () => {
  const playlists = useLibraryStore((state) => {
    return state.tracks.reduce((acc, track) => {
      track.playlist?.forEach((playlistName: string) => {
        const existingPlaylist = acc.find(
          (playlist) => playlist.name === playlistName
        );

        if (existingPlaylist) {
          existingPlaylist.tracks.push(track);
        } else {
          acc.push({
            name: playlistName,
            tracks: [track],
            artworkPreview: track.artwork ?? unknownTrackImageUri,
          });
        }
      });

      return acc;
    }, [] as PlayList[]);
  });

  const addToPlaylist = useLibraryStore((state) => state.addToPlayList);

  return { playlists, addToPlaylist };
};
