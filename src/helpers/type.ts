import { Track } from "react-native-track-player";

export type PlayList = {
  name: string;
  tracks: Track[];
  artworkPreview: string;
};

export type Artist = {
  name: string;
  track: Track[];
};

export type TrackWithPlayList = Track & { playList?: string[] };
