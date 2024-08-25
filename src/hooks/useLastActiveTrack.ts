import { useEffect, useState } from "react";
import { Track, useActiveTrack } from "react-native-track-player";

export const useLastActiveTrack = () => {
  const acitveTrack = useActiveTrack();

  const [lastActiveTrack, setlastActiveTrack] = useState<Track>();

  useEffect(() => {
    if (!acitveTrack) return;

    setlastActiveTrack(acitveTrack);
  }, [acitveTrack]);

  return lastActiveTrack;
};
